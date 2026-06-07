'use client';

import { useState } from 'react';

export default function HybridCalculator() {
  const [annualKm, setAnnualKm] = useState(15000);
  const [fuelPrice, setFuelPrice] = useState(2.8);
  const [hybridFuel, setHybridFuel] = useState(6.5);
  const [hybridPrice, setHybridPrice] = useState(32000);
  const [petrolFuel, setPetrolFuel] = useState(8.5);
  const [petrolPrice, setPetrolPrice] = useState(28000);

  // Format number for display
  const formatNumber = (num: number, decimals = 0) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  const formatCurrency = (num: number) => {
    return '$' + Math.round(num).toLocaleString('en-NZ');
  };

  const formatFuel = (num: number) => {
    return num.toFixed(1);
  };

  const petrolCostPerYear = (annualKm / 100) * petrolFuel * fuelPrice;
  const hybridCostPerYear = (annualKm / 100) * hybridFuel * fuelPrice;
  const annualSavings = petrolCostPerYear - hybridCostPerYear;
  const fiveYearSavings = annualSavings * 5;
  const priceDifference = hybridPrice - petrolPrice;
  const breakEvenMonths = annualSavings > 0 && priceDifference > 0 ? Math.ceil((priceDifference / annualSavings) * 12) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-2">
            Hybrid <span className="font-bold text-red-600">Savings</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
            Calculate your fuel savings instantly
          </p>
        </div>

        {/* Global Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="bg-slate-900/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-800 hover:border-slate-700 transition">
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Annual km</label>
            <input
              type="number"
              value={annualKm}
              onChange={(e) => setAnnualKm(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
            />
            <p className="text-gray-500 text-xs sm:text-sm mt-2">{annualKm.toLocaleString()} km/year</p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-800 hover:border-slate-700 transition">
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Fuel price</label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Math.max(0, Number(e.target.value)))}
              step="0.01"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
            />
            <p className="text-gray-500 text-xs sm:text-sm mt-2">${fuelPrice.toFixed(2)}/L</p>
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* Hybrid Vehicle */}
          <div className="bg-slate-900/30 rounded-xl p-5 sm:p-6 md:p-8 border border-slate-800 hover:border-red-900/50 transition">
            <div className="mb-6 sm:mb-7 md:mb-8">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3">Hybrid</h2>
              <div className="w-12 sm:w-16 h-1 bg-red-600 rounded-full"></div>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Fuel Economy (L/100km)</label>
                <input
                  type="number"
                  value={hybridFuel}
                  onChange={(e) => setHybridFuel(Math.max(0, Number(e.target.value)))}
                  step="0.1"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{formatFuel(hybridFuel)} L/100km</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Price (NZD)</label>
                <input
                  type="number"
                  value={hybridPrice}
                  onChange={(e) => setHybridPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{formatCurrency(hybridPrice)}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-700 mt-6 sm:mt-7 md:mt-8">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Annual Fuel Cost</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-light text-red-500">
                  {formatCurrency(hybridCostPerYear)}
                </p>
              </div>
            </div>
          </div>

          {/* Petrol Vehicle */}
          <div className="bg-slate-900/30 rounded-xl p-5 sm:p-6 md:p-8 border border-slate-800 hover:border-slate-700 transition">
            <div className="mb-6 sm:mb-7 md:mb-8">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3">Petrol</h2>
              <div className="w-12 sm:w-16 h-1 bg-slate-600 rounded-full"></div>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Fuel Economy (L/100km)</label>
                <input
                  type="number"
                  value={petrolFuel}
                  onChange={(e) => setPetrolFuel(Math.max(0, Number(e.target.value)))}
                  step="0.1"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-slate-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{formatFuel(petrolFuel)} L/100km</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Price (NZD)</label>
                <input
                  type="number"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-slate-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{formatCurrency(petrolPrice)}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-700 mt-6 sm:mt-7 md:mt-8">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Annual Fuel Cost</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-300">
                  {formatCurrency(petrolCostPerYear)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Annual Savings */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Annual Savings</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-emerald-500 mb-1">
              {formatCurrency(Math.max(0, annualSavings))}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">per year</p>
          </div>

          {/* 5-Year Savings */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">5-Year Savings</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-emerald-500 mb-1">
              {formatCurrency(Math.max(0, fiveYearSavings))}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">cumulative</p>
          </div>

          {/* Break-Even */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Break-Even</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-blue-500 mb-1">
              {breakEvenMonths > 0 ? `${breakEvenMonths}` : '—'}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {breakEvenMonths > 0
                ? `${(breakEvenMonths / 12).toFixed(1)} years`
                : 'Petrol cheaper'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16 text-gray-600 text-xs uppercase tracking-widest">
          <p>BAIC Wellington</p>
        </div>
      </div>
    </div>
  );
}
