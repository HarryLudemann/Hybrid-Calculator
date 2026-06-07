'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<'lead' | 'testdrive'>('lead');
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleInterest: 'bj30-hybrid',
    message: '',
  });
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    phone: '',
    vehiclePreference: 'bj30-hybrid',
    preferredDate: '',
    preferredTime: '10:00',
  });
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadFormData),
      });

      if (response.ok) {
        setSubmitted('lead');
        setLeadFormData({
          name: '',
          email: '',
          phone: '',
          vehicleInterest: 'bj30-hybrid',
          message: '',
        });
        setTimeout(() => setSubmitted(null), 5000);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/testdrive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testDriveData),
      });

      if (response.ok) {
        setSubmitted('testdrive');
        setTestDriveData({
          name: '',
          phone: '',
          vehiclePreference: 'bj30-hybrid',
          preferredDate: '',
          preferredTime: '10:00',
        });
        setTimeout(() => setSubmitted(null), 5000);
      }
    } catch (error) {
      console.error('Error submitting test drive:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save?</h2>
          <p className="text-gray-600 text-lg">
            Contact Harry at BAIC Wellington to book your test drive or get more information
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setActiveTab('lead')}
            className="flex-1 py-3 rounded-lg font-semibold transition"
            style={{
              backgroundColor: activeTab === 'lead' ? '#D50000' : '#F2F2F2',
              color: activeTab === 'lead' ? 'white' : '#000',
            }}
          >
            Get Savings Report
          </button>
          <button
            onClick={() => setActiveTab('testdrive')}
            className="flex-1 py-3 rounded-lg font-semibold transition"
            style={{
              backgroundColor: activeTab === 'testdrive' ? '#D50000' : '#F2F2F2',
              color: activeTab === 'testdrive' ? 'white' : '#000',
            }}
          >
            Book Test Drive
          </button>
        </div>

        {/* Success Message */}
        {submitted && (
          <div
            className="mb-8 p-4 rounded-lg text-white text-center font-semibold"
            style={{ backgroundColor: '#D50000' }}
          >
            ✓ Thank you! Harry will contact you shortly.
          </div>
        )}

        {/* Lead Capture Form */}
        {activeTab === 'lead' && (
          <form onSubmit={handleLeadSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadFormData.name}
                  onChange={(e) =>
                    setLeadFormData({ ...leadFormData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={leadFormData.email}
                  onChange={(e) =>
                    setLeadFormData({ ...leadFormData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={leadFormData.phone}
                  onChange={(e) =>
                    setLeadFormData({ ...leadFormData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="021 234 5678"
                />
              </div>

              {/* Vehicle Interest */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle of Interest
                </label>
                <select
                  value={leadFormData.vehicleInterest}
                  onChange={(e) =>
                    setLeadFormData({
                      ...leadFormData,
                      vehicleInterest: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="bj30-hybrid">BAIC BJ30 Hybrid</option>
                  <option value="x55">BAIC X55</option>
                  <option value="b30">BAIC B30</option>
                  <option value="x7">BAIC X7</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={leadFormData.message}
                  onChange={(e) =>
                    setLeadFormData({ ...leadFormData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Tell us more about your needs..."
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg font-bold text-white text-lg transition"
              style={{ backgroundColor: '#D50000', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Submitting...' : 'Get My Savings Report'}
            </button>
          </form>
        )}

        {/* Test Drive Form */}
        {activeTab === 'testdrive' && (
          <form onSubmit={handleTestDriveSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={testDriveData.name}
                  onChange={(e) =>
                    setTestDriveData({ ...testDriveData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={testDriveData.phone}
                  onChange={(e) =>
                    setTestDriveData({ ...testDriveData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="021 234 5678"
                />
              </div>

              {/* Vehicle Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Model
                </label>
                <select
                  value={testDriveData.vehiclePreference}
                  onChange={(e) =>
                    setTestDriveData({
                      ...testDriveData,
                      vehiclePreference: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="bj30-hybrid">BAIC BJ30 Hybrid</option>
                  <option value="x55">BAIC X55</option>
                  <option value="b30">BAIC B30</option>
                  <option value="x7">BAIC X7</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={testDriveData.preferredDate}
                  onChange={(e) =>
                    setTestDriveData({
                      ...testDriveData,
                      preferredDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  required
                  value={testDriveData.preferredTime}
                  onChange={(e) =>
                    setTestDriveData({
                      ...testDriveData,
                      preferredTime: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg font-bold text-white text-lg transition"
              style={{ backgroundColor: '#D50000', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Submitting...' : 'Book a Test Drive at BAIC Wellington'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
