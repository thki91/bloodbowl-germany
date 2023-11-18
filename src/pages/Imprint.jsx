import Layout from "../Layout";
import Heading from "../components/Heading";

function Imprint() {
  return (
    <Layout>
      <section className="py-10">
        <Heading title="Impressum" />
        <div className="mb-5">In Bearbeitung...</div>
        <Heading title="Ressourcen" />
        <div className="flex flex-col items-start text-sm gap-y-1.5">
          <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
            Dice icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/world"
            title="world icons"
          >
            World icons created by turkkub - Flaticon
          </a>
          <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
            Dice icons created by Dimi Kazak - Flaticon
          </a>
          <a href="https://www.flaticon.com/free-icons/time" title="time icons">
            Time icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/trophy"
            title="trophy icons"
          >
            Trophy icons created by Freepik - Flaticon
          </a>
          <a href="https://www.flaticon.com/free-icons/pray" title="pray icons">
            Pray icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/population"
            title="population icons"
          >
            Population icons created by Gajah Mada - Flaticon
          </a>
          <a href="https://www.flaticon.com/free-icons/out" title="out icons">
            Out icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/down-arrow"
            title="down arrow icons"
          >
            Down arrow icons created by Smashicons - Flaticon
          </a>
        </div>
      </section>
    </Layout>
  );
}

export default Imprint;
