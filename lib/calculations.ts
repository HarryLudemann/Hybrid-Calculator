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

  // Calculate break-even in months
  const monthlyPriceDifference = priceDifference / 12;
  const monthlyFuelSavings = annualSavings / 12;
  const breakEvenMonths =
    monthlyFuelSavings > 0
      ? Math.ceil(monthlyPriceDifference / monthlyFuelSavings)
      : 0;

  return {
    petrolAnnualCost: Math.round(petrolAnnualCost * 100) / 100,
    hybridAnnualCost: Math.round(hybridAnnualCost * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    fiveYearSavings: Math.round(fiveYearSavings * 100) / 100,
    breakEvenMonths: Math.max(0, breakEvenMonths),
  };
}

export const VEHICLES = [
  {
    id: 'bj30-hybrid',
    name: 'BAIC BJ30 Hybrid',
    type: 'hybrid',
    fuelEconomy: 6.8,
    price: 28900,
    image: '/vehicles/bj30-hybrid.jpg',
  },
  {
    id: 'x55',
    name: 'BAIC X55',
    type: 'petrol',
    fuelEconomy: 8.5,
    price: 26900,
    image: '/vehicles/x55.jpg',
  },
  {
    id: 'b30',
    name: 'BAIC B30',
    type: 'petrol',
    fuelEconomy: 7.2,
    price: 21900,
    image: '/vehicles/b30.jpg',
  },
  {
    id: 'x7',
    name: 'BAIC X7',
    type: 'petrol',
    fuelEconomy: 9.1,
    price: 32900,
    image: '/vehicles/x7.jpg',
  },
];
