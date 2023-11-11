import Layout from "../Layout";
import Team from "../components/home/Team";
import Facts from "../components/home/Facts";
import Ranking from "../components/home/Ranking";
import Bloodbowl from "../components/home/Bloodbowl";
import { useState } from "react";
import Eurobowl from "../components/home/Eurobowl";

function Home() {
  const [firstSection, setFirstSection] = useState("eurobowl");
  return (
    <Layout>
      <div className="relative flex justify-end items-end -mt-10 -mr-6 sm:-mr-10">
        <div className="z-20 px-3 py-2 rounded-tl-md bg-stone-200 font-semibold ">
          <a
            className={`py-2 px-4 ${
              firstSection === "eurobowl"
                ? "border-b-2 border-red-600"
                : "text-stone-400"
            }`}
            onClick={() => setFirstSection("eurobowl")}
          >
            Eurobowl
          </a>
          <a
            className={`py-2 px-4 ${
              firstSection === "bloodbowl"
                ? "border-b-2 border-red-600"
                : "text-stone-400"
            }`}
            onClick={() => setFirstSection("bloodbowl")}
          >
            Bloowbowl
          </a>
        </div>
      </div>
      {firstSection === "bloodbowl" && <Bloodbowl />}
      {firstSection === "eurobowl" && <Eurobowl />}
      <Team />
      <Ranking />
      <Facts />
    </Layout>
  );
}

export default Home;
