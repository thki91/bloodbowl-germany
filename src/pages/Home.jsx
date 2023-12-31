import Layout from "../Layout";
import Team from "../components/home/Team";
import Ranking from "../components/home/Ranking";
import Bloodbowl from "../components/home/Bloodbowl";
import { useState } from "react";
import Eurobowl from "../components/home/Eurobowl";
import Sponsors from "../components/home/Sponsors";

function Home() {
  const [firstSection, setFirstSection] = useState("eurobowl");
  return (
    <Layout>
      <div className="relative flex justify-end items-end -mt-9 -mr-4 sm:-mr-14 lg:-mr-20">
        <div className="z-10 px-3 py-2 rounded-tl-md bg-stone-200 font-semibold text-sm">
          <span
            className={`link py-2 px-4 ${
              firstSection === "eurobowl"
                ? "border-b-2 border-red-600 !text-stone-800 hover:!text-stone-500"
                : "!text-stone-600 hover:!text-stone-500"
            }`}
            onClick={() => setFirstSection("eurobowl")}
          >
            Eurobowl
          </span>
          <span
            className={`link py-2 px-4 ${
              firstSection === "bloodbowl"
                ? "border-b-2 border-red-600 !text-stone-800 hover:!text-stone-500"
                : "!text-stone-600 hover:!text-stone-500"
            }`}
            onClick={() => setFirstSection("bloodbowl")}
          >
            Bloodbowl
          </span>
        </div>
      </div>
      {firstSection === "bloodbowl" && <Bloodbowl />}
      {firstSection === "eurobowl" && <Eurobowl />}
      <Team />
      <Ranking />
      <Sponsors />
    </Layout>
  );
}

export default Home;
