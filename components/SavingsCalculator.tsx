'use client';

import { useState, useMemo } from 'react';
import { calculateSavings, VEHICLES } from '@/lib/calculations';

export default function SavingsCalculator() {
  const [kmPerYear, setKmPerYear] = useState(15000);
  const [fuelPrice, setFuelPrice] = useState(2.8);
  const [hybridVehicleId, setHybridVehicleId] = useState('bj30-hybrid');
  const [petrolVehicleId, setPetrolVehicleId] = useState('x55');

  const hybridVehicle = VEHICLES.find((v) => v.id === hybridVehicleId);
  const petrolVehicle = VEHICLES.find((v) => v.id === petrolVehicleId);

  const savings = useMemo(() => {
    if (!hybridVehicle || !petrolVehicle) return null;

    return calculateSavings(
      kmPerYear,
      fuelPrice,
      petrolVehicle.fuelEconomy,
      hybridVehicle.fuelEconomy,
      hybridVehicle.price - petrolVehicle.price
    );
  }, [kmPerYear, fuelPrice, hybridVehicle, petrolVehicle]);

  return (
    <section id="calculator" className="py-16 md:py-24" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hybrid Savings Calculator</h2>
          <p className="text-gray-600 text-lg">
            See exactly how much you can save by switching to BAIC hybrid
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Controls */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-8">Your Details</h3>

            {/* Annual KM */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Kilometers Driven
              </label>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={kmPerYear}
                onChange={(e) => setKmPerYear(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">5,000 km</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: '#D50000' }}
                >
                  {kmPerYear.toLocaleString()} km
                </span>
                <span className="text-sm text-gray-600">50,000 km</span>
              </div>
            </div>

            {/* Fuel Price */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Price per Litre (NZD)
              </label>
              <input
                type="number"
                min="1.5"
                max="3.5"
                step="0.1"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                style={{ borderColor: '#D50000' }}
              />
              <p className="text-xs text-gray-500 mt-1">Current NZ average: ~$2.80</p>
            </div>

            {/* Vehicle Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hybrid Model
              </label>
              <select
                value={hybridVehicleId}
                onChange={(e) => setHybridVehicleId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                {VEHICLES.filter((v) => v.type === 'hybrid').map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (${v.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Petrol Comparison */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Compare to Petrol Model
              </label>
              <select
                value={petrolVehicleId}
                onChange={(e) => setPetrolVehicleId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                {VEHICLES.filter((v) => v.type === 'petrol').map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (${v.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {savings && (
              <>
                {/* Annual Savings */}
                <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: '4px solid #D50000' }}>
                  <p className="text-gray-600 text-sm font-semibold mb-2">ANNUAL FUEL COST SAVINGS</p>
                  <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#D50000' }}>
                    ${savings.annualSavings.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-gray-600">
                    Petrol: ${savings.petrolAnnualCost.toLocaleString('en-NZ', { maximumFractionDigits: 0 })} vs
                    Hybrid: ${savings.hybridAnnualCost.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                {/* 5-Year Savings */}
                <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: '4px solid #D50000' }}>
                  <p className="text-gray-600 text-sm font-semibold mb-2">5-YEAR TOTAL SAVINGS</p>
                  <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#D50000' }}>
                    ${savings.fiveYearSavings.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-gray-600 text-sm">
                    After accounting for the ${(hybridVehicle && petrolVehicle ? (hybridVehicle.price - petrolVehicle.price) : 0).toLocaleString()} price difference
                  </p>
                </div>

                {/* Break-Even Time */}
                <div className="bg-white rounded-xl shadow-lg p-8" style={{ borderLeft: '4px solid #D50000' }}>
                  <p className="text-gray-600 text-sm font-semibold mb-2">BREAK-EVEN TIME</p>
                  <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#D50000' }}>
                    {savings.breakEvenMonths} <span className="text-2xl">months</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Time until hybrid pays for itself through fuel savings
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="block w-full py-4 rounded-lg font-bold text-white text-center text-lg transition transform hover:scale-105"
                  style={{ backgroundColor: '#D50000' }}
                >
                  Get My Savings Report
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
