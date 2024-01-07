import { useEffect, useState } from "react";
import Layout from "../Layout";
import Heading from "../components/Heading";
import useContentful from "../hooks/useContentful";

function Imprint() {
  const [imprintData, setImprintData] = useState();
  const { getImprint } = useContentful();

  useEffect(() => {
    const getImprintData = async () => {
      const data = await getImprint();
      setImprintData(data);
    };
    getImprintData();
  }, []);

  return (
    <Layout>
      <section className="py-6 sm:pt-8 text-sm md:text-base">
        <div
          dangerouslySetInnerHTML={{
            __html: imprintData?.content,
          }}
        />
      </section>
    </Layout>
  );
}

export default Imprint;
