// Hybrid savings calculations

export type HybridType = 'mhev' | 'phev';
export type DrivingProfile = 'city' | 'mixed' | 'highway';
export type ChargingHabit = 'daily' | 'most' | 'few' | 'rare';

export interface SavingsCalculation {
  petrolAnnualCost: number;
  hybridAnnualCost: number;
  annualSavings: number;
  fiveYearSavings: number;
  breakEvenMonths: number;
}

export interface HybridCostBreakdown {
  totalCost: number;
  fuelCost: number;
  electricCost: number;
  litersPerYear: number;
  electricKm: number;
  petrolKm: number;
  electricPercent: number;
  effectiveLPer100km: number;
}

export interface MhevParams {
  kmPerYear: number;
  fuelPrice: number;
  fuelEconomy: number;
  drivingProfile: DrivingProfile;
}

export interface PhevParams {
  kmPerYear: number;
  fuelPrice: number;
  petrolModeEconomy: number;
  evRange: number;
  evConsumption: number;
  electricityPrice: number;
  avgTripKm: number;
  chargingHabit: ChargingHabit;
}

const DRIVING_PROFILE_MULTIPLIER: Record<DrivingProfile, number> = {
  city: 0.93,
  mixed: 1,
  highway: 1.06,
};

const CHARGES_PER_WEEK: Record<ChargingHabit, number> = {
  daily: 7,
  most: 5,
  few: 3,
  rare: 1,
};

function round2(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}

function safeNonNegative(n: number) {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export function calculateMhevCost(params: MhevParams): HybridCostBreakdown {
  const { kmPerYear, fuelPrice, fuelEconomy, drivingProfile } = params;
  const adjustedEconomy = fuelEconomy * DRIVING_PROFILE_MULTIPLIER[drivingProfile];
  const litersPerYear = (kmPerYear / 100) * adjustedEconomy;
  const fuelCost = litersPerYear * fuelPrice;

  return {
    totalCost: round2(fuelCost),
    fuelCost: round2(fuelCost),
    electricCost: 0,
    litersPerYear: round2(litersPerYear),
    electricKm: 0,
    petrolKm: safeNonNegative(kmPerYear),
    electricPercent: 0,
    effectiveLPer100km: round2(adjustedEconomy),
  };
}

export function calculatePhevCost(params: PhevParams): HybridCostBreakdown {
  const {
    kmPerYear,
    fuelPrice,
    petrolModeEconomy,
    evRange,
    evConsumption,
    electricityPrice,
    avgTripKm,
    chargingHabit,
  } = params;

  const safeKm = safeNonNegative(kmPerYear);
  const safeEvRange = safeNonNegative(evRange);
  const dailyKm = safeKm / 365;
  const tripKm = Math.max(avgTripKm, 1);
  const chargesPerDay = CHARGES_PER_WEEK[chargingHabit] / 7;
  const maxElectricPerDay = safeEvRange * chargesPerDay;

  const electricPerTrip = Math.min(tripKm, safeEvRange);
  const tripsPerDay = dailyKm / tripKm;
  const electricFromTrips = tripsPerDay * electricPerTrip;

  const electricKmPerDay = Math.min(dailyKm, electricFromTrips, maxElectricPerDay);
  const petrolKmPerDay = Math.max(0, dailyKm - electricKmPerDay);

  const electricKm = electricKmPerDay * 365;
  const petrolKm = petrolKmPerDay * 365;

  const electricCost = (electricKm / 100) * evConsumption * electricityPrice;
  const litersPerYear = (petrolKm / 100) * petrolModeEconomy;
  const fuelCost = litersPerYear * fuelPrice;
  const totalCost = electricCost + fuelCost;

  const electricPercent = safeKm > 0 ? (electricKm / safeKm) * 100 : 0;
  const effectiveLPer100km = safeKm > 0 ? (litersPerYear / safeKm) * 100 : 0;

  return {
    totalCost: round2(totalCost),
    fuelCost: round2(fuelCost),
    electricCost: round2(electricCost),
    litersPerYear: round2(litersPerYear),
    electricKm: round2(electricKm),
    petrolKm: round2(petrolKm),
    electricPercent: round2(electricPercent),
    effectiveLPer100km: round2(effectiveLPer100km),
  };
}

export function calculatePetrolCost(
  kmPerYear: number,
  fuelPrice: number,
  fuelEconomy: number
): number {
  return round2((kmPerYear / 100) * fuelEconomy * fuelPrice);
}

export function calculateSavings(
  petrolAnnualCost: number,
  hybridAnnualCost: number,
  priceDifference: number
): SavingsCalculation {
  const annualSavings = petrolAnnualCost - hybridAnnualCost;
  const fiveYearSavings = annualSavings * 5 - priceDifference;
  const breakEvenMonths =
    annualSavings > 0 && priceDifference > 0
      ? Math.ceil((priceDifference / annualSavings) * 12)
      : 0;

  return {
    petrolAnnualCost: round2(petrolAnnualCost),
    hybridAnnualCost: round2(hybridAnnualCost),
    annualSavings: round2(annualSavings),
    fiveYearSavings: round2(fiveYearSavings),
    breakEvenMonths: Math.max(0, breakEvenMonths),
  };
}
