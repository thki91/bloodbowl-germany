import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="p-6 mt-auto bg-gradient-to-r from-red-800 to-red-500 text-white flex justify-center items-center w-full overflow-hidden">
      <div className="sm:hidden absolute opacity-20 right-10 overflow-hidden max-h-[70px]">
        <img src={Logo} className="w-20" alt="Feuerfurz Logo" />
      </div>
      <a className="text-white hover:text-stone-100 relative" href="/impressum">
        Impressum & Datenschutz
      </a>
    </footer>
  );
};

export default Footer;
