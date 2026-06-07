'use client';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 md:py-32">
      {/* Background overlay with pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-red-600" style={{ opacity: 0.05 }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Your Hybrid Savings with BAIC Wellington
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Instant fuel savings calculator for NZ drivers. See exactly how much you'll save with a BAIC hybrid.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="px-8 py-4 rounded-lg font-bold text-lg text-white transition transform hover:scale-105 text-center"
                style={{ backgroundColor: '#D50000' }}
              >
                Calculate Your Savings
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition text-center"
                style={{ borderColor: '#D50000', color: '#D50000' }}
              >
                Book a Test Drive
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center space-x-6 text-gray-300">
              <div>
                <div className="text-2xl font-bold text-red-500">15+</div>
                <div className="text-sm">Years in NZ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">50%+</div>
                <div className="text-sm">Fuel Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">2000+</div>
                <div className="text-sm">Happy Drivers</div>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="hidden md:block">
            <div
              className="w-full h-96 rounded-2xl flex items-center justify-center text-gray-600"
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <div className="text-center">
                <svg
                  className="w-32 h-32 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="text-gray-600">BAIC Hybrid SUV Image</p>
                <p className="text-sm text-gray-500">(High-quality vehicle image here)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
