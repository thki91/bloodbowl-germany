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
      <header className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 overflow-hidden rounded-br-[40px]">
        <div className="absolute top-0 left-0 bg-stone-900 h-full w-full">
          <div
            className="absolute w-[1200px] h-[200%] -left-20 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(220 38 38) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[1200px] h-[200%] -top-0 right-0 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #fcd34d 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[700px] h-[200%] -top-0 right-1/2 opacity-30 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #fcd34d 0%, transparent 20%)",
            }}
          />
          <div
            className="absolute w-[500px] h-[100%] -top-0 right-0 opacity-30 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(220 38 38) 0%, transparent 50%)",
            }}
          />
        </div>
        <h2 className="text-2xl sm:text-4xl ml-6 sm:ml-10 uppercase font-semibold tracking-wide text-white relative">
          {title}
        </h2>
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
      <div className="absolute bg-stone-800 bg-opacity-80 sm:bg-opacity-50 w-full h-full top-0 left-0" />
      <div className="absolute bg-gradient-to-r from-stone-600 from-10% via-1% to-transparent w-1/2 h-full top-0 left-0" />
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
