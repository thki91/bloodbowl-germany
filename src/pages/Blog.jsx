import Layout from "../Layout";
import Heading from "../components/Heading";

function Blog() {
  return (
    <Layout>
      <section className="pt-6 sm:pt-8 text-sm md:text-base mb-[60vh]">
        <Heading title="Work in Progress" variant="small" />
        <p>Folgt im Frühjahr..</p>
      </section>
    </Layout>
  );
}

export default Blog;
