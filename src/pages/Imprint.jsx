import Layout from "../Layout";
import Heading from "../components/Heading";

function Imprint() {
  return (
    <Layout>
      <Heading title="Impressum" />
      <div className="absolute top-0 left-0 bg-stone-900 h-full w-full">
        <div
          className="absolute w-[1200px] h-[200%]  -left-20"
          style={{
            background:
              "radial-gradient(circle, rgba(220 38 38) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute w-[1200px] h-[200%] -top-0 right-0"
          style={{
            background: "radial-gradient(circle, #fcd34d 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[150%] -top-0 right-1/2 opacity-30"
          style={{
            background: "radial-gradient(circle, #fcd34d 0%, transparent 20%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[100%] -top-0 right-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(220 38 38) 0%, transparent 50%)",
          }}
        />
      </div>
    </Layout>
  );
}

export default Imprint;
