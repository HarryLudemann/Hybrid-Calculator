'use client';

export default function About() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BAIC Hybrid?</h2>
          <p className="text-gray-600 text-lg">
            Expert guidance from Harry at BAIC Wellington
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Harry */}
          <div>
            {/* Avatar Placeholder */}
            <div
              className="w-full h-80 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: '#E0E0E0' }}
            >
              <div className="text-center text-gray-500">
                <svg
                  className="w-32 h-32 mx-auto mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p>Harry's Photo</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Meet Harry</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Harry specializes in helping Kiwi drivers make smart vehicle choices. With years of experience in the automotive industry and a passion for sustainable driving, Harry helps customers at BAIC Wellington find the perfect hybrid solution for their needs.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Guidance</h4>
                  <p className="text-gray-600 text-sm">
                    Personalized recommendations based on your lifestyle and budget
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Savings</h4>
                  <p className="text-gray-600 text-sm">
                    Real numbers on fuel savings and break-even analysis
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                  <p className="text-gray-600 text-sm">
                    Deep knowledge of NZ roads, conditions, and vehicle performance
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Trusted Partner</h4>
                  <p className="text-gray-600 text-sm">
                    2000+ happy drivers trust BAIC and Harry's expertise
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-lg font-bold text-white text-lg transition transform hover:scale-105"
              style={{ backgroundColor: '#D50000' }}
            >
              Talk to Harry
            </a>
          </div>
        </div>

        {/* Why Hybrid Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#D50000' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Fuel Efficient</h4>
            <p className="text-gray-600">
              Save up to 50% on fuel costs with BAIC hybrid technology. Perfect for Kiwi drivers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#D50000' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Smart Technology</h4>
            <p className="text-gray-600">
              Advanced hybrid systems automatically switch between electric and fuel power for optimal efficiency.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#D50000' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Better Value</h4>
            <p className="text-gray-600">
              Higher upfront cost pays for itself quickly through fuel savings and lower running costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
