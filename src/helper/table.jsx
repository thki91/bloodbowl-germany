import Undead from "../assets/races/Undead.png";
import ChaosDwarfs from "../assets/races/ChaosDwarfs.png";
import Skaven from "../assets/races/Skaven.png";
import Orcs from "../assets/races/Orcs.png";
import Lizardmen from "../assets/races/Lizardmen.png";
import WoodElves from "../assets/races/WoodElves.png";
import DarkElves from "../assets/races/DarkElves.png";
import Necromantic from "../assets/races/Necromantic.png";
import Amazons from "../assets/races/Amazons.png";
import Humans from "../assets/races/Humans.png";
import Norse from "../assets/races/Norse.png";
import ProElves from "../assets/races/ProElves.png";
import HighElves from "../assets/races/HighElves.png";
import Slann from "../assets/races/Slann.png";
import Dwarfs from "../assets/races/Dwarfs.png";
import Underworld from "../assets/races/Underworld.png";
import Vampires from "../assets/races/Vampires.png";
import Khorne from "../assets/races/Khorne.png";
import ChaosPact from "../assets/races/ChaosPact.png";

export const mapTableMemberLink = (tableData, colIndex) => {
  return [...tableData]?.map((col) => {
    let name = Object.values(col)[colIndex];
    const nameIsString = typeof name === "string";

    const formatName = (name) => {
      return name.replace("__", "👑").replace("*", "🌐");
    };

    if (nameIsString) {
      name = (
        <a
          href={`https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=${name
            .replace("__", "")
            .replace("*", "")}`}
          target="_blank"
          rel="noreferrer"
        >
          {formatName(name)}
        </a>
      );
    }

    const keyToUpdate = Object.keys(col)[colIndex];
    col[keyToUpdate] = name;
    return col;
  });
};

const raceMappings = {
  undead: Undead,
  "chaos dwarves": ChaosDwarfs,
  "chaos dwarfs": ChaosDwarfs,
  skaven: Skaven,
  orc: Orcs,
  orcs: Orcs,
  "wood elves": WoodElves,
  lizardmen: Lizardmen,
  "dark elves": DarkElves,
  "high elves": HighElves,
  necromantic: Necromantic,
  amazons: Amazons,
  humans: Humans,
  norse: Norse,
  elves: ProElves,
  underworld: Underworld,
  slann: Slann,
  dwarves: Dwarfs,
  dwarfs: Dwarfs,
  dwarf: Dwarfs,
  vampires: Vampires,
  khorne: Khorne,
  "chaos pact": ChaosPact,
};

export const mapTableRace = (tableData, colIndex) => {
  if (!tableData) return;
  return [...tableData]?.map((col) => {
    let races = Object.values(col)[colIndex];
    const isString = typeof races === "string";
    if (isString) {
      races = (
        <div className="flex justify-center items-center flex-wrap gap-x-1 min-w-[70px]">
          {races.split(",").map((race) => {
            const val = raceMappings[race.trim().toLowerCase()];
            if (!val) return;
            return (
              <span aria-label={race} data-balloon-pos="up">
                <img src={val} className="w-4 h-4" />
              </span>
            );
          })}
        </div>
      );
    }

    const keyToUpdate = Object.keys(col)[colIndex];
    col[keyToUpdate] = races;
    return col;
  });
};
