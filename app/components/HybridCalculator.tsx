'use client';

import { useState, type ReactNode } from 'react';
import {
  calculateMhevCost,
  calculatePetrolCost,
  calculatePhevCost,
  calculateSavings,
  type ChargingHabit,
  type DrivingProfile,
  type HybridType,
  type VehicleType,
} from '@/lib/calculations';

const formatCurrency = (num: number) => {
  if (!Number.isFinite(num)) return '$0';
  const rounded = Math.round(num);
  const formatted = Math.abs(rounded).toLocaleString('en-NZ');
  return rounded < 0 ? `-$${formatted}` : `$${formatted}`;
};

const formatFuel = (num: number) => num.toFixed(1);

export default function HybridCalculator() {
  const [annualKm, setAnnualKm] = useState<number | string>(15000);
  const [fuelPrice, setFuelPrice] = useState<number | string>(2.8);
  
  // Vehicle A state
  const [vehicleAName, setVehicleAName] = useState('Vehicle One');
  const [vehicleAType, setVehicleAType] = useState<VehicleType>('mhev');
  const [vehicleAFuel, setVehicleAFuel] = useState<number | string>(6.5);
  const [vehicleAPrice, setVehicleAPrice] = useState<number | string>(44990);
  const [vehicleADrivingProfile, setVehicleADrivingProfile] = useState<DrivingProfile>('mixed');
  const [vehicleAEvRange, setVehicleAEvRange] = useState<number | string>(50);
  const [vehicleAEvConsumption, setVehicleAEvConsumption] = useState<number | string>(18);
  const [vehicleAElectricityPrice, setVehicleAElectricityPrice] = useState<number | string>(0.28);
  const [vehicleAAvgTripKm, setVehicleAAvgTripKm] = useState<number | string>(15);
  const [vehicleAChargingHabit, setVehicleAChargingHabit] = useState<ChargingHabit>('daily');
  
  // Vehicle B state
  const [vehicleBName, setVehicleBName] = useState('Vehicle Two');
  const [vehicleBType, setVehicleBType] = useState<VehicleType>('petrol');
  const [vehicleBFuel, setVehicleBFuel] = useState<number | string>(8.5);
  const [vehicleBPrice, setVehicleBPrice] = useState<number | string>(38990);
  const [vehicleBDrivingProfile, setVehicleBDrivingProfile] = useState<DrivingProfile>('mixed');
  const [vehicleBEvRange, setVehicleBEvRange] = useState<number | string>(50);
  const [vehicleBEvConsumption, setVehicleBEvConsumption] = useState<number | string>(18);
  const [vehicleBElectricityPrice, setVehicleBElectricityPrice] = useState<number | string>(0.28);
  const [vehicleBAvgTripKm, setVehicleBAvgTripKm] = useState<number | string>(15);
  const [vehicleBChargingHabit, setVehicleBChargingHabit] = useState<ChargingHabit>('daily');

  // Helper function to convert value to number, treating empty as 0
  const toNumber = (value: number | string): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Convert all values to numbers for calculations
  const kmNum = toNumber(annualKm);
  const priceNum = toNumber(fuelPrice);
  
  // Vehicle A values
  const vehicleAFuelNum = toNumber(vehicleAFuel);
  const vehicleAPriceNum = toNumber(vehicleAPrice);
  
  // Vehicle B values
  const vehicleBFuelNum = toNumber(vehicleBFuel);
  const vehicleBPriceNum = toNumber(vehicleBPrice);

  // Helper function to calculate cost for any vehicle type
  const calculateVehicleCost = (vehicleType: VehicleType, fuelNum: number, drivingProfile: DrivingProfile, evRange: number, evConsumption: number, electricityPrice: number, avgTripKm: number, chargingHabit: ChargingHabit) => {
    if (vehicleType === 'petrol') {
      return {
        totalCost: calculatePetrolCost(kmNum, priceNum, fuelNum),
        fuelCost: calculatePetrolCost(kmNum, priceNum, fuelNum),
        electricCost: 0,
        litersPerYear: (kmNum / 100) * fuelNum,
        electricKm: 0,
        petrolKm: kmNum,
        electricPercent: 0,
        effectiveLPer100km: fuelNum,
      };
    } else if (vehicleType === 'phev') {
      return calculatePhevCost({
        kmPerYear: kmNum,
        fuelPrice: priceNum,
        petrolModeEconomy: fuelNum,
        evRange,
        evConsumption,
        electricityPrice,
        avgTripKm,
        chargingHabit,
      });
    } else {
      return calculateMhevCost({
        kmPerYear: kmNum,
        fuelPrice: priceNum,
        fuelEconomy: fuelNum,
        drivingProfile,
      });
    }
  };

  const vehicleABreakdown = calculateVehicleCost(
    vehicleAType,
    vehicleAFuelNum,
    vehicleADrivingProfile,
    toNumber(vehicleAEvRange),
    toNumber(vehicleAEvConsumption),
    toNumber(vehicleAElectricityPrice),
    toNumber(vehicleAAvgTripKm),
    vehicleAChargingHabit
  );

  const vehicleBBreakdown = calculateVehicleCost(
    vehicleBType,
    vehicleBFuelNum,
    vehicleBDrivingProfile,
    toNumber(vehicleBEvRange),
    toNumber(vehicleBEvConsumption),
    toNumber(vehicleBElectricityPrice),
    toNumber(vehicleBAvgTripKm),
    vehicleBChargingHabit
  );

  const vehicleACostPerYear = vehicleABreakdown.totalCost;
  const vehicleBCostPerYear = vehicleBBreakdown.totalCost;
  const vehicleALitersPerYear = vehicleABreakdown.litersPerYear;
  const vehicleBLitersPerYear = vehicleBBreakdown.litersPerYear;
  const litersSavedPerYear = vehicleBLitersPerYear - vehicleALitersPerYear;
  const priceDifference = vehicleAPriceNum - vehicleBPriceNum;

  const {
    annualSavings,
    fiveYearSavings: netFiveYearSavings,
    breakEvenMonths,
  } = calculateSavings(vehicleBCostPerYear, vehicleACostPerYear, priceDifference);
  const fuelSavingsFiveYear = annualSavings * 5;
  const breakEvenYears = breakEvenMonths / 12;
  const fiveYearMarkerPercent =
    breakEvenMonths > 0 ? Math.min(100, (60 / breakEvenMonths) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6 md:p-12 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto w-full">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12 items-stretch">
          {/* Vehicle A */}
          <VehicleInput
            name={vehicleAName}
            onNameChange={setVehicleAName}
            accent="red"
            vehicleType={vehicleAType}
            onVehicleTypeChange={setVehicleAType}
            fuel={vehicleAFuel}
            onFuelChange={setVehicleAFuel}
            price={vehicleAPrice}
            onPriceChange={setVehicleAPrice}
            drivingProfile={vehicleADrivingProfile}
            onDrivingProfileChange={setVehicleADrivingProfile}
            evRange={vehicleAEvRange}
            onEvRangeChange={setVehicleAEvRange}
            evConsumption={vehicleAEvConsumption}
            onEvConsumptionChange={setVehicleAEvConsumption}
            electricityPrice={vehicleAElectricityPrice}
            onElectricityPriceChange={setVehicleAElectricityPrice}
            avgTripKm={vehicleAAvgTripKm}
            onAvgTripKmChange={setVehicleAAvgTripKm}
            chargingHabit={vehicleAChargingHabit}
            onChargingHabitChange={setVehicleAChargingHabit}
            breakdown={vehicleABreakdown}
            costPerYear={vehicleACostPerYear}
          />

          {/* Vehicle B */}
          <VehicleInput
            name={vehicleBName}
            onNameChange={setVehicleBName}
            accent="slate"
            vehicleType={vehicleBType}
            onVehicleTypeChange={setVehicleBType}
            fuel={vehicleBFuel}
            onFuelChange={setVehicleBFuel}
            price={vehicleBPrice}
            onPriceChange={setVehicleBPrice}
            drivingProfile={vehicleBDrivingProfile}
            onDrivingProfileChange={setVehicleBDrivingProfile}
            evRange={vehicleBEvRange}
            onEvRangeChange={setVehicleBEvRange}
            evConsumption={vehicleBEvConsumption}
            onEvConsumptionChange={setVehicleBEvConsumption}
            electricityPrice={vehicleBElectricityPrice}
            onElectricityPriceChange={setVehicleBElectricityPrice}
            avgTripKm={vehicleBAvgTripKm}
            onAvgTripKmChange={setVehicleBAvgTripKm}
            chargingHabit={vehicleBChargingHabit}
            onChargingHabitChange={setVehicleBChargingHabit}
            breakdown={vehicleBBreakdown}
            costPerYear={vehicleBCostPerYear}
          />
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {/* Annual Savings */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800 min-h-[8.5rem]">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">Annual Savings</p>
            <p className={`text-3xl sm:text-4xl md:text-5xl font-light mb-1 ${annualSavings >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
              {formatCurrency(annualSavings)}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">running costs / yr</p>
          </div>

          {/* 5-Year Savings */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800 min-h-[8.5rem]">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">5-Year Savings</p>
            <p className={`text-3xl sm:text-4xl md:text-5xl font-light mb-1 ${netFiveYearSavings >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
              {formatCurrency(netFiveYearSavings)}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">after price difference</p>
          </div>

          {/* Break-Even */}
          <div className="bg-slate-900/30 rounded-lg p-4 sm:p-6 border border-slate-800 min-h-[8.5rem]">
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
        <section className="relative isolate rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
            <div className="absolute -top-20 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10 pb-8 sm:pb-10">
            <p className="text-red-500/90 text-[11px] font-medium tracking-[0.25em] uppercase mb-3">
              Behind the numbers
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight mb-2">
              How it adds up
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-10">
              Compare running costs between any two vehicle types — mild hybrids, plug-in hybrids, or standard petrol vehicles.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {/* 1 — Fuel use */}
              <BreakdownCard
                title="Fuel use"
                subtitle={`${kmNum.toLocaleString()} km per year`}
              >
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <FuelStat
                    label={vehicleAName}
                    value={`${Math.round(vehicleALitersPerYear).toLocaleString()} L`}
                    detail={`${formatFuel(vehicleABreakdown.effectiveLPer100km)} L/100km effective`}
                    accent="red"
                  />
                  <FuelStat
                    label={vehicleBName}
                    value={`${Math.round(vehicleBLitersPerYear).toLocaleString()} L`}
                    detail={`${formatFuel(vehicleBBreakdown.effectiveLPer100km)} L/100km effective`}
                    accent="slate"
                  />
                </div>
                {litersSavedPerYear > 0 ? (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {vehicleAName} uses{' '}
                    <span className="text-white font-medium">
                      {Math.round(litersSavedPerYear).toLocaleString()} litres less
                    </span>{' '}
                    per year than {vehicleBName}.
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 leading-relaxed">
                    With these figures, {vehicleAName} doesn&apos;t use less fuel than {vehicleBName}.
                  </p>
                )}
              </BreakdownCard>

              {/* 2 — Running costs */}
              <BreakdownCard
                title="Running costs"
                subtitle={`Fuel at $${priceNum.toFixed(2)} per litre`}
              >
                <div className="space-y-4 mb-4">
                  <CostBar
                    label={vehicleAName}
                    amount={vehicleACostPerYear}
                    maxAmount={Math.max(vehicleACostPerYear, vehicleBCostPerYear, 1)}
                    accent="red"
                  />
                  <CostBar
                    label={vehicleBName}
                    amount={vehicleBCostPerYear}
                    maxAmount={Math.max(vehicleACostPerYear, vehicleBCostPerYear, 1)}
                    accent="slate"
                  />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {annualSavings > 0 ? (
                    <>
                      Every year, {vehicleAName} saves you{' '}
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(annualSavings)}
                      </span>{' '}
                      in running costs compared to {vehicleBName}.
                    </>
                  ) : (
                    <>
                      {vehicleBName} is{' '}
                      <span className="text-red-400 font-medium">
                        {formatCurrency(Math.abs(annualSavings))}
                      </span>{' '}
                      cheaper to run each year with these numbers.
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
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{vehicleAName}</p>
                    <p className="text-2xl sm:text-3xl font-light text-white">
                      {formatCurrency(vehicleAPriceNum)}
                    </p>
                  </div>
                  <div className="hidden sm:block text-slate-600 text-2xl font-light">vs</div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{vehicleBName}</p>
                    <p className="text-2xl sm:text-3xl font-light text-slate-200">
                      {formatCurrency(vehicleBPriceNum)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {priceDifference > 0 ? (
                    <>
                      {vehicleAName} costs{' '}
                      <span className="text-white font-medium">
                        {formatCurrency(priceDifference)} more
                      </span>{' '}
                      to buy. Your yearly fuel savings need to cover that before you&apos;re truly ahead.
                    </>
                  ) : priceDifference < 0 ? (
                    <>
                      {vehicleAName} is actually{' '}
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(Math.abs(priceDifference))} cheaper
                      </span>{' '}
                      to buy — and it saves on fuel too.
                    </>
                  ) : (
                    <>Both vehicles are the same price. Any fuel savings go straight to your pocket.</>
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
                    {vehicleAName} costs the same or less upfront{' '}
                    <span className="text-emerald-400 font-medium">and</span> saves you{' '}
                    <span className="text-emerald-400 font-medium">
                      {formatCurrency(annualSavings)}
                    </span>{' '}
                    on fuel every year. You&apos;re ahead from day one.
                  </p>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    With these numbers, {vehicleBName} costs less to run. {vehicleAName} won&apos;t
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
                    <>{vehicleBName} wins on running costs with these inputs.</>
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
                      on fuel, but {vehicleAName}&apos;s{' '}
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

        <footer className="mt-10 sm:mt-12 text-center text-xs text-slate-600 leading-relaxed max-w-2xl mx-auto px-2">
          Estimates based on the figures you enter. Actual savings depend on driving habits,
          fuel and electricity prices, and vehicle condition. Not financial advice.
        </footer>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  hint,
}: {
  label: string;
  value: number | string;
  onChange: (v: number | string) => void;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        step={step}
        min="0"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 text-white text-base sm:text-lg rounded-lg border border-slate-700 focus:border-red-600 focus:outline-none transition"
      />
      {hint && <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{hint}</p>}
    </div>
  );
}

function SegmentedControl<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">
        {label}
      </label>
      <div
        className="flex flex-wrap gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800"
        role="group"
        aria-label={label}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 min-w-[4.5rem] px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              value === opt.value
                ? 'bg-slate-700 text-white'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            {opt.label}
          </button>
        ))}
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
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6">
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

function VehicleInput({
  name,
  onNameChange,
  accent,
  vehicleType,
  onVehicleTypeChange,
  fuel,
  onFuelChange,
  price,
  onPriceChange,
  drivingProfile,
  onDrivingProfileChange,
  evRange,
  onEvRangeChange,
  evConsumption,
  onEvConsumptionChange,
  electricityPrice,
  onElectricityPriceChange,
  avgTripKm,
  onAvgTripKmChange,
  chargingHabit,
  onChargingHabitChange,
  breakdown,
  costPerYear,
}: {
  name: string;
  onNameChange: (v: string) => void;
  accent: 'red' | 'slate';
  vehicleType: VehicleType;
  onVehicleTypeChange: (type: VehicleType) => void;
  fuel: number | string;
  onFuelChange: (v: number | string) => void;
  price: number | string;
  onPriceChange: (v: number | string) => void;
  drivingProfile: DrivingProfile;
  onDrivingProfileChange: (v: DrivingProfile) => void;
  evRange: number | string;
  onEvRangeChange: (v: number | string) => void;
  evConsumption: number | string;
  onEvConsumptionChange: (v: number | string) => void;
  electricityPrice: number | string;
  onElectricityPriceChange: (v: number | string) => void;
  avgTripKm: number | string;
  onAvgTripKmChange: (v: number | string) => void;
  chargingHabit: ChargingHabit;
  onChargingHabitChange: (v: ChargingHabit) => void;
  breakdown: ReturnType<typeof calculateMhevCost> | ReturnType<typeof calculatePhevCost> | {
    totalCost: number;
    fuelCost: number;
    electricCost: number;
    litersPerYear: number;
    electricKm: number;
    petrolKm: number;
    electricPercent: number;
    effectiveLPer100km: number;
  };
  costPerYear: number;
}) {
  const borderColor = accent === 'red' ? 'hover:border-red-900/50' : 'hover:border-slate-700';
  const barColor = accent === 'red' ? 'bg-red-600' : 'bg-slate-600';
  const costColor = accent === 'red' ? 'text-red-500' : 'text-slate-300';

  const toNumber = (value: number | string): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className={`bg-slate-900/30 rounded-xl p-5 sm:p-6 md:p-8 border border-slate-800 ${borderColor} transition flex flex-col`}>
      <div className="mb-6 sm:mb-7 md:mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3 bg-transparent border-b-2 border-transparent hover:border-slate-700 focus:border-red-600 focus:outline-none transition w-full"
          placeholder="Vehicle name"
        />
        <div className={`w-12 sm:w-16 h-1 ${barColor} rounded-full`}></div>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-1 flex flex-col">
        <VehicleTypeSelector value={vehicleType} onChange={onVehicleTypeChange} />

        {vehicleType === 'petrol' ? (
          <>
            <NumberField
              label="Fuel economy (L/100km)"
              value={fuel}
              onChange={onFuelChange}
              step={0.1}
              hint={`${fuel === '' ? '0.0' : formatFuel(toNumber(fuel))} L/100km`}
            />
            <NumberField
              label="Price (NZD)"
              value={price}
              onChange={onPriceChange}
              hint={price === '' ? '$0' : formatCurrency(toNumber(price))}
            />
          </>
        ) : vehicleType === 'mhev' ? (
          <>
            <NumberField
              label="Fuel economy (L/100km)"
              value={fuel}
              onChange={onFuelChange}
              step={0.1}
              hint={`${fuel === '' ? '0.0' : formatFuel(toNumber(fuel))} L/100km`}
            />
            <SegmentedControl
              label="Driving mix"
              value={drivingProfile}
              onChange={onDrivingProfileChange}
              options={[
                { value: 'city', label: 'City' },
                { value: 'mixed', label: 'Mixed' },
                { value: 'highway', label: 'Highway' },
              ]}
            />
            <p className="text-xs text-slate-500 leading-relaxed -mt-2">
              Mild hybrids assist the engine but can&apos;t drive on battery alone. City driving
              typically sees a slightly bigger benefit.
            </p>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <NumberField
                label="EV range (km)"
                value={evRange}
                onChange={onEvRangeChange}
                step={1}
                hint="Distance on a full charge"
              />
              <NumberField
                label="EV use (kWh/100km)"
                value={evConsumption}
                onChange={onEvConsumptionChange}
                step={0.1}
                hint="Electric driving efficiency"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <NumberField
                label="Electricity ($/kWh)"
                value={electricityPrice}
                onChange={onElectricityPriceChange}
                step={0.01}
                hint="Home charging rate"
              />
              <NumberField
                label="Petrol mode (L/100km)"
                value={fuel}
                onChange={onFuelChange}
                step={0.1}
                hint="When the battery is empty"
              />
            </div>
            <NumberField
              label="Average trip (km)"
              value={avgTripKm}
              onChange={onAvgTripKmChange}
              step={1}
              hint="Typical one-way or round-trip distance"
            />
            <SegmentedControl
              label="How often you charge"
              value={chargingHabit}
              onChange={onChargingHabitChange}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'most', label: 'Most days' },
                { value: 'few', label: 'Few/wk' },
                { value: 'rare', label: 'Rarely' },
              ]}
            />
            <p className="text-xs text-slate-500 leading-relaxed -mt-2">
              Short trips within EV range and regular charging mean more kilometres on
              electricity, less petrol.
            </p>
          </>
        )}

        {vehicleType !== 'petrol' && (
          <NumberField
            label="Price (NZD)"
            value={price}
            onChange={onPriceChange}
            hint={price === '' ? '$0' : formatCurrency(toNumber(price))}
          />
        )}

        <div className="bg-slate-800/50 rounded-lg p-4 sm:p-5 md:p-6 border border-slate-700 mt-auto">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">
            {vehicleType === 'phev' ? 'Annual Running Cost' : 'Annual Fuel Cost'}
          </p>
          <p className={`text-3xl sm:text-4xl md:text-5xl font-light ${costColor}`}>
            {formatCurrency(costPerYear)}
          </p>
          {vehicleType === 'phev' && breakdown.electricCost > 0 && (
            <p className="text-sm text-slate-400 mt-2">
              {formatCurrency(breakdown.electricCost)} electricity +{' '}
              {formatCurrency(breakdown.fuelCost)} fuel
            </p>
          )}
          {vehicleType === 'phev' && breakdown.electricPercent > 0 && (
            <p className="text-xs text-emerald-500/80 mt-1">
              ~{Math.round(breakdown.electricPercent)}% of km on electric
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function VehicleTypeSelector({
  value,
  onChange,
}: {
  value: VehicleType;
  onChange: (type: VehicleType) => void;
}) {
  const types: { id: VehicleType; label: string; desc: string }[] = [
    {
      id: 'mhev',
      label: 'MHEV',
      desc: 'Mild hybrid — assists the engine, no plug-in charging',
    },
    {
      id: 'phev',
      label: 'PHEV',
      desc: 'Plug-in hybrid — drives on electric when charged',
    },
    {
      id: 'petrol',
      label: 'Petrol',
      desc: 'Standard petrol vehicle',
    },
  ];

  return (
    <div>
      <label className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 block">
        Vehicle type
      </label>
      <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            className={`rounded-lg px-2 py-3 sm:py-3.5 text-left transition-all ${
              value === type.id
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <span className="block text-xs sm:text-sm font-semibold tracking-wide">{type.label}</span>
            <span
              className={`block text-[10px] sm:text-[11px] mt-1 leading-snug ${
                value === type.id ? 'text-red-100/80' : 'text-slate-500'
              }`}
            >
              {type.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
