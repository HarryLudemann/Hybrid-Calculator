// Hybrid Savings Calculations

export interface SavingsCalculation {
  petrolAnnualCost: number;
  hybridAnnualCost: number;
  annualSavings: number;
  fiveYearSavings: number;
  breakEvenMonths: number;
}

export function calculateSavings(
  kmPerYear: number,
  fuelPrice: number,
  petrolEfficiency: number,
  hybridEfficiency: number,
  priceDifference: number
): SavingsCalculation {
  // Calculate fuel consumption
  const petrolLitersPerYear = (kmPerYear / 100) * petrolEfficiency;
  const hybridLitersPerYear = (kmPerYear / 100) * hybridEfficiency;

  // Calculate annual costs
  const petrolAnnualCost = petrolLitersPerYear * fuelPrice;
  const hybridAnnualCost = hybridLitersPerYear * fuelPrice;

  // Calculate savings
  const annualSavings = petrolAnnualCost - hybridAnnualCost;
  const fiveYearSavings = annualSavings * 5 - priceDifference;

  // Months until cumulative fuel savings cover the upfront price premium
  const breakEvenMonths =
    annualSavings > 0 && priceDifference > 0
      ? Math.ceil((priceDifference / annualSavings) * 12)
      : 0;

  return {
    petrolAnnualCost: Math.round(petrolAnnualCost * 100) / 100,
    hybridAnnualCost: Math.round(hybridAnnualCost * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    fiveYearSavings: Math.round(fiveYearSavings * 100) / 100,
    breakEvenMonths: Math.max(0, breakEvenMonths),
  };
}
