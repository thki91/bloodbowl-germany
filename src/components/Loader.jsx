import Logo from "../assets/logo.png";

const Loader = () => {
  return (
    <div className="animate-bounce">
      <img src={Logo} className="w-20" />
    </div>
  );
};

export default Loader;
