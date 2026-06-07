'use client';

import { useState } from 'react';

interface Vehicle {
  name: string;
  image: string;
  fuelEconomyL100km: number;
  price: number;
  isHybrid: boolean;
}

const BAIC_PRESETS: Record<string, Vehicle> = {
  'BJ30-HYBRID': {
    name: 'BJ30 Hybrid',
    image: '/vehicles/bj30-hybrid.png',
    fuelEconomyL100km: 6.5,
    price: 32000,
    isHybrid: true,
  },
  'X55-PHEV': {
    name: 'X55 PHEV',
    image: '/vehicles/x55-phev.png',
    fuelEconomyL100km: 5.2,
    price: 38000,
    isHybrid: true,
  },
  'X55-PETROL': {
    name: 'X55 Petrol',
    image: '/vehicles/x55-petrol.png',
    fuelEconomyL100km: 8.5,
    price: 28000,
    isHybrid: false,
  },
  'B30-PETROL': {
    name: 'B30 Petrol',
    image: '/vehicles/b30-petrol.png',
    fuelEconomyL100km: 7.8,
    price: 22000,
    isHybrid: false,
  },
  'X7-PETROL': {
    name: 'X7 Petrol',
    image: '/vehicles/x7-petrol.png',
    fuelEconomyL100km: 9.2,
    price: 30000,
    isHybrid: false,
  },
};

export default function HybridCalculator() {
  const [annualKm, setAnnualKm] = useState(15000);
  const [fuelPrice, setFuelPrice] = useState(2.8);
  const [hybridFuel, setHybridFuel] = useState(6.5);
  const [hybridPrice, setHybridPrice] = useState(32000);
  const [petrolFuel, setPetrolFuel] = useState(8.5);
  const [petrolPrice, setPetrolPrice] = useState(28000);

  const petrolCostPerYear = (annualKm / 100) * petrolFuel * fuelPrice;
  const hybridCostPerYear = (annualKm / 100) * hybridFuel * fuelPrice;
  const annualSavings = petrolCostPerYear - hybridCostPerYear;
  const fiveYearSavings = annualSavings * 5;
  const priceDifference = hybridPrice - petrolPrice;
  const breakEvenMonths = annualSavings > 0 && priceDifference > 0 ? Math.ceil((priceDifference / annualSavings) * 12) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-3">
            Hybrid <span className="font-bold text-red-600">Savings</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base tracking-wide">
            Calculate your annual fuel savings
          </p>
        </div>

        {/* Global Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-3 block">Annual Kilometers</label>
            <input
              type="number"
              value={annualKm}
              onChange={(e) => setAnnualKm(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-red-600 focus:outline-none transition placeholder-slate-600"
            />
          </div>

          <div>
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-3 block">Fuel Price (NZD/L)</label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              step="0.01"
              className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-red-600 focus:outline-none transition placeholder-slate-600"
            />
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Hybrid Vehicle */}
          <div>
            <div className="mb-6">
              <h2 className="text-white text-3xl font-light mb-1">Hybrid</h2>
              <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 block">Fuel Economy (L/100km)</label>
                <input
                  type="number"
                  value={hybridFuel}
                  onChange={(e) => setHybridFuel(Number(e.target.value))}
                  step="0.1"
                  className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-red-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 block">Vehicle Price (NZD)</label>
                <input
                  type="number"
                  value={hybridPrice}
                  onChange={(e) => setHybridPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-red-600 focus:outline-none transition"
                />
              </div>

              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mt-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Annual Fuel Cost</p>
                <p className="text-4xl font-light text-red-500">
                  ${hybridCostPerYear.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Petrol Vehicle */}
          <div>
            <div className="mb-6">
              <h2 className="text-white text-3xl font-light mb-1">Petrol</h2>
              <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 block">Fuel Economy (L/100km)</label>
                <input
                  type="number"
                  value={petrolFuel}
                  onChange={(e) => setPetrolFuel(Number(e.target.value))}
                  step="0.1"
                  className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-slate-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 block">Vehicle Price (NZD)</label>
                <input
                  type="number"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-900 text-white text-lg rounded-lg border border-slate-800 focus:border-slate-600 focus:outline-none transition"
                />
              </div>

              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mt-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Annual Fuel Cost</p>
                <p className="text-4xl font-light text-slate-300">
                  ${petrolCostPerYear.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Annual Savings */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Annual Savings</p>
            <p className="text-5xl font-light text-emerald-500 mb-1">
              ${Math.max(0, annualSavings).toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-gray-500 text-sm">per year</p>
          </div>

          {/* 5-Year Savings */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">5-Year Savings</p>
            <p className="text-5xl font-light text-emerald-500 mb-1">
              ${Math.max(0, fiveYearSavings).toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-gray-500 text-sm">cumulative</p>
          </div>

          {/* Break-Even */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Break-Even</p>
            <p className="text-5xl font-light text-blue-500 mb-1">
              {breakEvenMonths > 0 ? `${breakEvenMonths}` : '—'} <span className="text-lg text-gray-500">{breakEvenMonths > 0 ? 'months' : ''}</span>
            </p>
            <p className="text-gray-500 text-sm">
              {breakEvenMonths > 0
                ? `${(breakEvenMonths / 12).toFixed(1)} years`
                : 'Petrol cheaper upfront'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600 text-xs uppercase tracking-widest">
          <p>BAIC Wellington</p>
        </div>
      </div>
    </div>
  );
}
