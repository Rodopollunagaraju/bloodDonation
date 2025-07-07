const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 px-4 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Blood Donation Portal</h2>
            <p className="text-sm text-gray-400">Saving lives, one drop at a time</p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm">
              📧 Email: <a href="mailto:help.blooddonation@gmail.com" className="text-red-400 hover:underline">help.bloodon22@gmail.com</a>
            </p>
            <p className="text-sm">
              📞 Contact: <a href="tel:+91630131XXXX" className="text-red-400 hover:underline">+91 63013 14319</a>
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  