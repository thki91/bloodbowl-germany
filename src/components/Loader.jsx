import Logo from "../assets/logo.png";

const Loader = () => {
  return (
    <div className="fixed z-50 left-0 top-0 bg-stone-200 flex w-screen h-screen justify-center items-center">
      <div className="animate-bounce">
        <img src={Logo} className="w-24 sm:w-32" alt="Feuerfurz Logo" />
      </div>
    </div>
  );
};

export default Loader;
