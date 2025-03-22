import About from "../components/About";

export default function Home() {
    return (
        <>
        <section
        id="home"
        className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          backgroundImage: "url('images/hero.jpg')", // Ensure correct path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%)",
          height: "90vh", // Fixed height
          width: "100%", // Full width
        }}
      >
        {/* Dark Overlay for Better Readability
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
  
        {/* Content */}
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold">Donate Blood, Save Lives</h1>
          <p className="mt-4 text-lg md:text-xl">
            Your blood donation can be the lifeline for someone in need. Join us in making a difference.
          </p>
          <div className="mt-6 space-x-4">
            <a href="#donate" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition">
              Become a Donor
            </a>
            <a href="#request" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
              Request Blood
            </a>
          </div>
        </div>
      </section>
      <About/>
        </>
      
    );
  }
  