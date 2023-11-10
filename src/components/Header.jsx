import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import News from "../components/News";
import { useScrollDirection } from "../hooks/useScrollDirection";

const headerImg1 = "/header.JPG";
const headerImg2 = "/header2.JPG";

const Header = () => {
  const [headerImg, setHeaderImg] = useState(headerImg1);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  useInterval(() => {
    if (headerImg === headerImg1) setHeaderImg(headerImg2);
    if (headerImg === headerImg2) setHeaderImg(headerImg1);
  }, 10000);

  return (
    <header
      style={{ backgroundImage: `url("${headerImg}")` }}
      className={`${
        isScrollingDown ? "mt-0" : "mt-16"
      } p-6 sm:p-10 sm:min-h-[480px] bg-center bg-cover bg-no-repeat relative flex items-center transition-[background-image] duration-200 ease-in-out`}
    >
      <div className="absolute bg-zinc-800 bg-opacity-80 sm:bg-opacity-50 w-full h-full top-0 left-0" />
      <div className="absolute bg-gradient-to-r from-zinc-600 from-10% via-1% to-transparent w-1/2 h-full top-0 left-0" />
      <div className="transition flex flex-col justify-center">
        <h3 className="relative uppercase font-semibold mb-1 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[150px] text-2xl">
          Eurobowl
        </h3>
        <h3 className="relative uppercase font-semibold mb-1  bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[450px] text-4xl">
          Team Deutschland
        </h3>
        {/* <h1 className="text-white text-4xl sm:text-6xl relative bg-clip-text  text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[150px] ">Team Germany</h1> */}
        <News />
        {/* <div className="absolute right-0 bottom-0 px-3 py-2 rounded-tl-md bg-stone-200 font-semibold"><a>Was ist Bloodbowl?</a></div> */}
      </div>
    </header>
  );
};

export default Header;
