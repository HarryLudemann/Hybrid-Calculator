'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-2" style={{ color: '#D50000' }}>
              BAIC
            </div>
            <p className="text-gray-400 text-sm">
              Drive smarter. Save more. Choose BAIC Hybrid.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">BAIC Wellington</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>123 Main Street</p>
              <p>Wellington, NZ 6011</p>
              <p className="mt-4 font-semibold text-white">
                <a href="tel:0211234567" className="hover:text-red-600 transition">
                  021 123 4567
                </a>
              </p>
              <p className="font-semibold text-white">
                <a href="mailto:harry@baic.co.nz" className="hover:text-red-600 transition">
                  harry@baic.co.nz
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4">Opening Hours</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>Monday - Friday: 9:00 AM - 5:30 PM</p>
              <p>Saturday: 10:00 AM - 3:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/baic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/baic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 8.221l-.001.02c0 .337-.027.673-.081 1.001.509.325.994.703 1.438 1.125-.404-.187-.836-.349-1.289-.472.291.415.569.851.822 1.306-.659-.295-1.364-.531-2.102-.689.465.655.854 1.394 1.143 2.198-.759-.331-1.587-.548-2.457-.635.287 1.029.421 2.106.364 3.198-1.738 2.417-4.55 3.998-7.788 3.998-1.22 0-2.378-.273-3.408-.759 2.286.326 4.394-1.043 5.697-3.212-.82-.057-1.596-.417-2.196-1.02-.07.098-.139.197-.206.299-.684-.083-1.346-.339-1.944-.75.081.282.178.556.288.817-1.138.151-2.168-.34-2.77-1.195.201.409.476.766.814 1.035-1.187-1.145-1.994-2.799-1.994-4.686 0-.59.059-1.167.171-1.725 1.826 1.602 4.126 2.574 6.684 2.736-.084-.485-.131-.992-.131-1.509 0-2.839 2.261-5.143 5.143-5.143 1.479 0 2.812.571 3.772 1.5.934-.19 1.817-.564 2.609-1.076-.312.967-.972 1.78-1.831 2.294.838-.1 1.635-.331 2.371-.83-.556.831-1.259 1.56-2.065 2.157z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} BAIC Wellington. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Questions about your savings?</p>
          <a
            href="tel:0211234567"
            className="inline-block px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105"
            style={{ backgroundColor: '#D50000', color: 'white' }}
          >
            Call Harry: 021 123 4567
          </a>
        </div>
      </div>
    </footer>
  );
}
