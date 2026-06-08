'use client';

import { useState, type ReactNode } from 'react';
import { calculateSavings } from '@/lib/calculations';

const formatCurrency = (num: number) => {
  const rounded = Math.round(num);
  const formatted = Math.abs(rounded).toLocaleString('en-NZ');
  return rounded < 0 ? `-$${formatted}` : `$${formatted}`;
};

const formatFuel = (num: number) => num.toFixed(1);

export default function HybridCalculator() {
  const [annualKm, setAnnualKm] = useState<number | string>(15000);
  const [fuelPrice, setFuelPrice] = useState<number | string>(2.8);
  const [hybridFuel, setHybridFuel] = useState<number | string>(6.5);
  const [hybridPrice, setHybridPrice] = useState<number | string>(44990);
  const [petrolFuel, setPetrolFuel] = useState<number | string>(8.5);
  const [petrolPrice, setPetrolPrice] = useState<number | string>(38990);

  // Helper function to convert value to number, treating empty as 0
  const toNumber = (value: number | string): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Convert all values to numbers for calculations
  const kmNum = toNumber(annualKm);
  const priceNum = toNumber(fuelPrice);
  const hybridFuelNum = toNumber(hybridFuel);
  const hybridPriceNum = toNumber(hybridPrice);
  const petrolFuelNum = toNumber(petrolFuel);
  const petrolPriceNum = toNumber(petrolPrice);

  const priceDifference = hybridPriceNum - petrolPriceNum;
  const {
    petrolAnnualCost: petrolCostPerYear,
    hybridAnnualCost: hybridCostPerYear,
    annualSavings,
    fiveYearSavings: netFiveYearSavings,
    breakEvenMonths,
  } = calculateSavings(
    kmNum,
    priceNum,
    petrolFuelNum,
    hybridFuelNum,
    priceDifference
  );

  // For display purposes
  const petrolLitersPerYear = (kmNum / 100) * petrolFuelNum;
  const hybridLitersPerYear = (kmNum / 100) * hybridFuelNum;
  const litersSavedPerYear = petrolLitersPerYear - hybridLitersPerYear;
  const fuelSavingsFiveYear = annualSavings * 5;
  const breakEvenYears = breakEvenMonths / 12;
  const fiveYearMarkerPercent =
    breakEvenMonths > 0 ? Math.min(100, (60 / breakEvenMonths) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-2">
            Hybrid <span className="font-bold text-red-600">Calculator</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
            Compare running costs and see when a hybrid pays off
          </p>
        </div>

        {/* Global Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="bg-slate-900/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-800 hover:border-slate-700 transition">
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Annual km</label>
            <input
              type="number"
              value={annualKm}
              onChange={(e) => setAnnualKm(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
            />
            <p className="text-gray-500 text-xs sm:text-sm mt-2">{annualKm === '' ? '0 km/year' : `${toNumber(annualKm).toLocaleString()} km/year`}</p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-800 hover:border-slate-700 transition">
            <label className="text-white text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Fuel price</label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value === '' ? '' : Number(e.target.value))}
              step="0.01"
              min="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
            />
            <p className="text-gray-500 text-xs sm:text-sm mt-2">${fuelPrice === '' ? '0.00' : toNumber(fuelPrice).toFixed(2)}/L</p>
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
                  onChange={(e) => setHybridFuel(e.target.value === '' ? '' : Number(e.target.value))}
                  step="0.1"
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{hybridFuel === '' ? '0.0' : formatFuel(toNumber(hybridFuel))} L/100km</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Price (NZD)</label>
                <input
                  type="number"
                  value={hybridPrice}
                  onChange={(e) => setHybridPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{hybridPrice === '' ? '$0' : formatCurrency(toNumber(hybridPrice))}</p>
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
                  onChange={(e) => setPetrolFuel(e.target.value === '' ? '' : Number(e.target.value))}
                  step="0.1"
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-slate-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{petrolFuel === '' ? '0.0' : formatFuel(toNumber(petrolFuel))} L/100km</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">Price (NZD)</label>
                <input
                  type="number"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-slate-600 focus:outline-none transition"
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{petrolPrice === '' ? '$0' : formatCurrency(toNumber(petrolPrice))}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
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
            <p className={`text-3xl sm:text-4xl md:text-5xl font-light mb-1 ${netFiveYearSavings >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
              {formatCurrency(netFiveYearSavings)}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">after price difference</p>
          </div>

          {/* Break-Even */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Break-Even</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-blue-500 mb-1">
              {annualSavings <= 0
                ? '—'
                : priceDifference <= 0
                  ? '0'
                  : `${breakEvenMonths}`}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {annualSavings <= 0
                ? 'No fuel savings'
                : priceDifference <= 0
                  ? 'Immediate savings'
                  : `${(breakEvenMonths / 12).toFixed(1)} years`}
            </p>
          </div>
        </div>

        {/* How it adds up */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-red-600/8 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative p-6 sm:p-8 md:p-10">
            <p className="text-red-500/90 text-[11px] font-medium tracking-[0.25em] uppercase mb-3">
              Behind the numbers
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight mb-2">
              How it adds up
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-10">
              Three simple ideas: how much fuel each car uses, what that costs you per year,
              and whether the hybrid&apos;s higher price pays for itself over time.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {/* 1 — Fuel use */}
              <BreakdownCard
                title="Fuel use"
                subtitle={`Driving ${kmNum.toLocaleString()} km per year`}
              >
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <FuelStat
                    label="Petrol"
                    value={`${Math.round(petrolLitersPerYear).toLocaleString()} L`}
                    detail={`at ${formatFuel(petrolFuelNum)} L/100km`}
                    accent="slate"
                  />
                  <FuelStat
                    label="Hybrid"
                    value={`${Math.round(hybridLitersPerYear).toLocaleString()} L`}
                    detail={`at ${formatFuel(hybridFuelNum)} L/100km`}
                    accent="red"
                  />
                </div>
                {litersSavedPerYear > 0 ? (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The hybrid uses{' '}
                    <span className="text-white font-medium">
                      {Math.round(litersSavedPerYear).toLocaleString()} litres less
                    </span>{' '}
                    each year — that&apos;s{' '}
                    <span className="text-white font-medium">
                      {formatFuel(petrolFuelNum - hybridFuelNum)} L/100km
                    </span>{' '}
                    better efficiency on your driving.
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 leading-relaxed">
                    With these figures, the hybrid doesn&apos;t use less fuel than the petrol car.
                  </p>
                )}
              </BreakdownCard>

              {/* 2 — Pump cost */}
              <BreakdownCard
                title="At the pump"
                subtitle={`Fuel at $${priceNum.toFixed(2)} per litre`}
              >
                <div className="space-y-4 mb-4">
                  <CostBar
                    label="Petrol"
                    amount={petrolCostPerYear}
                    maxAmount={Math.max(petrolCostPerYear, hybridCostPerYear, 1)}
                    accent="slate"
                  />
                  <CostBar
                    label="Hybrid"
                    amount={hybridCostPerYear}
                    maxAmount={Math.max(petrolCostPerYear, hybridCostPerYear, 1)}
                    accent="red"
                  />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {annualSavings > 0 ? (
                    <>
                      Every year, the hybrid saves you{' '}
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(annualSavings)}
                      </span>{' '}
                      at the pump compared to petrol.
                    </>
                  ) : (
                    <>
                      The petrol car is{' '}
                      <span className="text-red-400 font-medium">
                        {formatCurrency(Math.abs(annualSavings))}
                      </span>{' '}
                      cheaper to fuel each year with these numbers.
                    </>
                  )}
                </p>
              </BreakdownCard>

              {/* 3 — Purchase price gap */}
              <BreakdownCard
                title="The price gap"
                subtitle="What you pay upfront"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-4">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Petrol car</p>
                    <p className="text-2xl sm:text-3xl font-light text-slate-200">
                      {formatCurrency(petrolPriceNum)}
                    </p>
                  </div>
                  <div className="hidden sm:block text-slate-600 text-2xl font-light">vs</div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Hybrid</p>
                    <p className="text-2xl sm:text-3xl font-light text-white">
                      {formatCurrency(hybridPriceNum)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {priceDifference > 0 ? (
                    <>
                      The hybrid costs{' '}
                      <span className="text-white font-medium">
                        {formatCurrency(priceDifference)} more
                      </span>{' '}
                      to buy. Your yearly fuel savings need to cover that before you&apos;re truly ahead.
                    </>
                  ) : priceDifference < 0 ? (
                    <>
                      The hybrid is actually{' '}
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(Math.abs(priceDifference))} cheaper
                      </span>{' '}
                      to buy — and it saves on fuel too.
                    </>
                  ) : (
                    <>Both cars are the same price. Any fuel savings go straight to your pocket.</>
                  )}
                </p>
              </BreakdownCard>

              {/* 4 — Timeline */}
              <BreakdownCard
                title="When it pays off"
                subtitle="Fuel savings vs purchase price"
              >
                {annualSavings > 0 && priceDifference > 0 ? (
                  <>
                    <div className="mb-5">
                      <div className="relative h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
                          style={{ width: `${fiveYearMarkerPercent}%` }}
                        />
                        {fiveYearMarkerPercent < 100 && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/40"
                            style={{ left: `${fiveYearMarkerPercent}%` }}
                          />
                        )}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Today</span>
                        <span className={fiveYearMarkerPercent >= 100 ? 'text-emerald-400' : 'text-slate-400'}>
                          5 years
                        </span>
                        <span className="text-blue-400">
                          Break-even · {breakEvenYears.toFixed(1)} yrs
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {netFiveYearSavings >= 0 ? (
                        <>
                          After 5 years you&apos;re{' '}
                          <span className="text-emerald-400 font-medium">
                            {formatCurrency(netFiveYearSavings)} ahead
                          </span>
                          — fuel savings have covered the extra purchase price.
                        </>
                      ) : (
                        <>
                          After 5 years you&apos;ve saved{' '}
                          <span className="text-white font-medium">
                            {formatCurrency(fuelSavingsFiveYear)}
                          </span>{' '}
                          on fuel, but you&apos;re still{' '}
                          <span className="text-red-400 font-medium">
                            {formatCurrency(Math.abs(netFiveYearSavings))} behind
                          </span>{' '}
                          once you count the higher sticker price. You&apos;d break even around{' '}
                          <span className="text-blue-400 font-medium">
                            year {breakEvenYears.toFixed(1)}
                          </span>
                          .
                        </>
                      )}
                    </p>
                  </>
                ) : annualSavings > 0 && priceDifference <= 0 ? (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The hybrid costs the same or less upfront{' '}
                    <span className="text-emerald-400 font-medium">and</span> saves you{' '}
                    <span className="text-emerald-400 font-medium">
                      {formatCurrency(annualSavings)}
                    </span>{' '}
                    on fuel every year. You&apos;re ahead from day one.
                  </p>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    With these numbers, the petrol car costs less to run. The hybrid won&apos;t
                    make up the difference through fuel savings alone.
                  </p>
                )}
              </BreakdownCard>

              {/* Verdict */}
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/20 px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-slate-500 mb-2">
                  Bottom line
                </p>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
                  {annualSavings <= 0 ? (
                    <>The petrol car wins on running costs with these inputs.</>
                  ) : netFiveYearSavings >= 0 ? (
                    <>
                      You save{' '}
                      <span className="text-emerald-400 font-normal">
                        {formatCurrency(annualSavings)}/yr
                      </span>{' '}
                      on fuel, and after 5 years you&apos;re{' '}
                      <span className="text-emerald-400 font-normal">
                        {formatCurrency(netFiveYearSavings)} ahead
                      </span>{' '}
                      overall.
                    </>
                  ) : (
                    <>
                      You save{' '}
                      <span className="text-emerald-400 font-normal">
                        {formatCurrency(annualSavings)}/yr
                      </span>{' '}
                      on fuel, but the hybrid&apos;s{' '}
                      <span className="text-white font-normal">
                        {formatCurrency(priceDifference)}
                      </span>{' '}
                      price premium means you need about{' '}
                      <span className="text-blue-400 font-normal">
                        {breakEvenYears.toFixed(1)} years
                      </span>{' '}
                      to come out ahead.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BreakdownCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-white text-lg font-medium tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function FuelStat({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: 'slate' | 'red';
}) {
  const borderColor = accent === 'red' ? 'border-red-900/40' : 'border-slate-700/60';
  const labelColor = accent === 'red' ? 'text-red-400/80' : 'text-slate-500';

  return (
    <div className={`rounded-lg border ${borderColor} bg-slate-950/50 px-4 py-3.5`}>
      <p className={`text-[11px] uppercase tracking-wider font-medium mb-1.5 ${labelColor}`}>
        {label}
      </p>
      <p className="text-2xl font-light text-white tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{detail}</p>
    </div>
  );
}

function CostBar({
  label,
  amount,
  maxAmount,
  accent,
}: {
  label: string;
  amount: number;
  maxAmount: number;
  accent: 'slate' | 'red';
}) {
  const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
  const barColor = accent === 'red' ? 'bg-red-500' : 'bg-slate-500';
  const textColor = accent === 'red' ? 'text-red-400/90' : 'text-slate-400';

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className={`text-xs uppercase tracking-wider font-medium ${textColor}`}>
          {label}
        </span>
        <span className="text-white font-light text-lg">{formatCurrency(amount)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
