'use client';

import { VEHICLES } from '@/lib/calculations';

export default function VehicleShowcase() {
  return (
    <section id="vehicles" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">BAIC Vehicles in NZ</h2>
          <p className="text-gray-600 text-lg">Compare our hybrid and petrol models</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
            >
              {/* Vehicle Image */}
              <div
                className="w-full h-48 flex items-center justify-center"
                style={{ backgroundColor: '#F2F2F2' }}
              >
                <div className="text-center text-gray-500">
                  <svg
                    className="w-20 h-20 mx-auto mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 3v2m6-2v2M9 5H5m10 0h4M9 11h.01M15 11h.01M9 15h.01M15 15h.01M9 19h.01M15 19h.01"
                    />
                  </svg>
                  <p className="text-sm">Vehicle image</p>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6">
                {/* Badge */}
                {vehicle.type === 'hybrid' && (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-3"
                    style={{ backgroundColor: '#D50000' }}
                  >
                    HYBRID
                  </span>
                )}
                {vehicle.type === 'petrol' && (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-gray-700 mb-3 bg-gray-200">
                    PETROL
                  </span>
                )}

                <h3 className="text-lg font-bold mb-2">{vehicle.name}</h3>

                {/* Specs */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Economy:</span>
                    <span className="font-semibold">{vehicle.fuelEconomy} L/100km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price:</span>
                    <span className="font-semibold">${vehicle.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="w-full py-3 rounded-lg font-semibold text-white transition"
                  style={{ backgroundColor: '#D50000' }}
                  onClick={() => {
                    const element = document.getElementById('calculator');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Select Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
