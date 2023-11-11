import CarouselDefault from "../Carousel";
import GlobeIcon from "../../assets/globe.png";
import DiceIcon from "../../assets/dice.png";
import TrophyIcon from "../../assets/trophy.png";
import ClockIcon from "../../assets/clock.png";
import PrayIcon from "../../assets/pray.png";
import CommunityIcon from "../../assets/community.png";

const FactItem = ({ text, iconUrl }) => {
  return (
    <>
      <img src={iconUrl} className="w-12 text-center mx-auto mb-7" />
      <div className=" text-center mb-2">Wusstest du...</div>
      <div className="pb-8 sm:pb-12 text-center">{text}</div>
    </>
  );
};

function Facts() {
  return (
    <section className="pt-10 sm:pt-18 pb-10 sm:pb-16 bg-stone-800 -mx-4 sm:-mx-10 text-white text-md sm:text-xl font-semibold">
      <div className="mx-auto max-w-[80%]">
        <CarouselDefault
          items={[
            <FactItem
              text="Es gibt über 63.000 registrierte Bloodbowl Spieler bei der NAF"
              iconUrl={GlobeIcon}
            />,
            <FactItem
              text="Die erste Edition von Bloobowl wurde von Jervis Johnson 1986 designt"
              iconUrl={DiceIcon}
            />,
            <FactItem
              text="Die maximal Spielzeit eines Turnierspiels beträgt meistens 2.5 Stunden"
              iconUrl={ClockIcon}
            />,
            <FactItem
              text="Die englische Nationalmannschaft konnte 4 mal in Folge den Eurobowl gewinnen"
              iconUrl={TrophyIcon}
            />,
            <FactItem
              text="Beim Bloodbowl betet man nicht zu Gott, sondern zum Nuffle"
              iconUrl={PrayIcon}
            />,
            <FactItem
              text="England, Frankreich, Italien und Spanien haben die größte Bloodbowl Community"
              iconUrl={CommunityIcon}
            />,
          ]}
        />
      </div>
    </section>
  );
}

export default Facts;
