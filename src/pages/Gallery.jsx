import Layout from "../Layout";
import Heading from "../components/Heading";
import Collage from "../components/Collage";

function Gallery() {
  return (
    <Layout>
      <section className="pt-6 sm:pt-8 text-sm md:text-base mb-10">
        <Heading title="" variant="small" />
        <Collage />
      </section>
    </Layout>
  );
}

export default Gallery;
