import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import News from "../components/News";
import { useLocation } from "react-router-dom";

const headerImg1 = "/header.JPG";
const headerImg2 = "/header2.JPG";

const Header = () => {
  const [headerImg, setHeaderImg] = useState(headerImg1);
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  useInterval(() => {
    if (headerImg === headerImg1) setHeaderImg(headerImg2);
    if (headerImg === headerImg2) setHeaderImg(headerImg1);
  }, 10000);

  let title = "BB Deutschland";
  if (location.pathname === "/archiv") title = "Newsarchiv";
  if (location.pathname === "/historie") title = "Historie";
  if (location.pathname === "/impressum") title = "Impressum";

  if (!isHomepage) {
    return (
      <header
        className={`min-h-[150px] relative pb-5 px-2 md:px-10 pt-16 md:pb-16 md:pt-24 bg-stone-900 -mx-4 sm:-mx-10 bg-[url('/bg_team_mobile.png')] sm:bg-[url('/bg_team.png')] bg-center bg-fixed bg-no-repeat bg-contain rounded-br-3xl`}
      >
        <h3 className="pb-8 sm:pb-0 pt-10 pl-10 relative uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[220px] sm:w-[320px] text-2xl sm:text-4xl !text-white">
          {title}
        </h3>
      </header>
    );
  }

  return (
    <header
      style={{ backgroundImage: `url("${headerImg}")` }}
      className={`p-6 pt-20 sm:pt-24 sm:p-10 ${
        isHomepage ? "sm:min-h-[480px]" : "sm:min-h-[300px]"
      } bg-center bg-cover bg-no-repeat relative flex items-center transition-[background-image] duration-200 ease-in-out`}
    >
      <div className="absolute bg-zinc-800 bg-opacity-80 sm:bg-opacity-50 w-full h-full top-0 left-0" />
      <div className="absolute bg-gradient-to-r from-zinc-600 from-10% via-1% to-transparent w-1/2 h-full top-0 left-0" />
      <div className="transition flex flex-col justify-center">
        <h3 className="relative uppercase font-semibold mb-1 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[150px] text-xl sm:text-2xl">
          Eurobowl
        </h3>
        <h3 className="relative uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[220px] sm:w-[320px] text-2xl sm:text-4xl">
          {title}
        </h3>
        {isHomepage && <News />}
      </div>
    </header>
  );
};

export default Header;
