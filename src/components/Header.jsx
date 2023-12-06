import { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import News from "../components/News";
import { useLocation } from "react-router-dom";
import useContentful from "../hooks/useContentful";

const Header = () => {
  const [headerImg, setHeaderImg] = useState(null);
  const [headerImageData, setHeaderImageData] = useState();
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const { getHeaderImages } = useContentful();

  useEffect(() => {
    const fetchHeaderImages = async () => {
      const data = await getHeaderImages();
      setHeaderImg(data.image1);
      setHeaderImageData(data);
    };
    fetchHeaderImages();
  }, []);

  useInterval(() => {
    if (headerImg === headerImageData.image1)
      setHeaderImg(headerImageData.image2);
    if (headerImg === headerImageData.image2)
      setHeaderImg(headerImageData.image1);
  }, 10000);

  let title = "BB Deutschland";
  if (location.pathname === "/news") title = "News";
  if (location.pathname === "/statistik") title = "Statistik";
  if (location.pathname === "/impressum") title = "Impressum";

  if (!isHomepage) {
    return (
      <header className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 overflow-hidden rounded-br-[40px]">
        <div className="absolute top-0 left-0 bg-stone-900 h-full w-full">
          <div
            className="absolute w-[700px] sm:w-[1200px] h-[200%] -left-1/4 sm:-left-20 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(220 38 38) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[1000px] sm:w-[1200px] h-[200%] -top-0 sm:right-0 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #fcd34d 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[400px] sm:w-[700px] h-[200%] -top-0 sm:right-1/2 opacity-30 animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #fcd34d 0%, transparent 20%)",
            }}
          />
          <div
            className="absolute w-[300px] sm:w-[500px] h-[100%] -top-0 right-0 opacity-30 animate-[pulse_4s_ease-in-out_infinite]"
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
      className={`p-6 pt-20 sm:pt-24 lg:pt-28 sm:p-10 ${
        isHomepage ? "md:min-h-[450px]" : "sm:min-h-[300px]"
      } bg-center bg-cover bg-no-repeat relative flex items-center transition-[background-image] duration-200 ease-in-out`}
    >
      <div className="absolute bg-stone-800 bg-opacity-80 sm:bg-opacity-50 w-full h-full top-0 left-0" />
      <div className="absolute bg-gradient-to-r from-stone-600 from-10% via-1% to-transparent w-1/2 h-full top-0 left-0" />
      <div className="transition flex flex-col justify-center">
        <h3 className="relative uppercase font-semibold mb-1 sm:tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-full md:w-[150px] text-xl sm:text-2xl">
          <span className="hidden md:block">Eurobowl</span>
          <span className="md:hidden">Eurobowl BB Deutschland</span>
        </h3>
        <h3 className="hidden md:block relative uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black via-red-500 to-yellow-400 w-[220px] sm:w-[320px] text-2xl sm:text-4xl">
          {title}
        </h3>
        {isHomepage && <News />}
      </div>
    </header>
  );
};

export default Header;
