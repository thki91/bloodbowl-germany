import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="p-5 mt-auto bg-gradient-to-r from-red-800 to-red-500 text-white flex justify-center items-center w-full overflow-hidden">
      <div className="absolute opacity-20 left-1/2 overflow-hidden max-h-[60px]">
        <img src={Logo} className="w-32" />
      </div>
      <a className="text-white hover:text-stone-100 relative" href="/impressum">
        Impressum
      </a>
    </footer>
  );
};

export default Footer;
