export default function About() {
    return (
      <section id="about" className="py-20 bg-gray-100 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-red-600">Why Donate Blood?</h2>
          <p className="mt-4 text-gray-700 text-lg">
            Blood donation is a simple act that can save lives. Every drop counts in medical emergencies, surgeries, and treatments.
          </p>
          
          {/* Three Benefits */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold text-red-600">Saves Lives</h3>
              <p className="mt-2 text-gray-600">Your donation can help patients in critical need of blood.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold text-red-600">Improves Health</h3>
              <p className="mt-2 text-gray-600">Regular blood donation promotes better health for donors.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold text-red-600">Helps Hospitals</h3>
              <p className="mt-2 text-gray-600">Ensures that hospitals and blood banks have sufficient supply.</p>
            </div>
          </div>
  
          {/* Call to Action */}
          <div className="mt-8">
            <a href="#donate" className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition">
              Become a Donor
            </a>
          </div>
        </div>
      </section>
    );
  }
  