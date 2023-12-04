import { useState, useEffect } from "react";
import useContentful from "../../hooks/useContentful";

const Collage = () => {
  const [galleryData, setGalleryData] = useState();
  const { getGallery } = useContentful();

  useEffect(() => {
    const getGalleryData = async () => {
      const data = await getGallery();
      setGalleryData(data?.[0]);
    };
    getGalleryData();
  }, []);

  return (
    <section
      className="py-5 sm:py-10 bg-stone-800 -mx-4 sm:-mx-10"
      id="collage"
    >
      <div className="px-4 sm:px-10 flex gap-3 min-h-[260px] sm:min-h-[300px] md:min-h-[320px]">
        <div className="flex-1 md:flex-auto md:w-[150px] xl:w-[200px] flex gap-3">
          <div
            className="bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${galleryData?.image1}')` }}
          />
        </div>
        <div className="hidden xl:block md:w-[110px] xl:max-w-[250px] flex-1">
          <div
            className="bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${galleryData?.image2}')` }}
          />
        </div>
        <div className="flex-1 flex gap-3 flex-col">
          <div
            className="bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${galleryData?.image3}')` }}
          ></div>
          <div
            className="bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${galleryData?.image4}')` }}
          ></div>
        </div>
        <div className="hidden sm:block flex-1">
          <div
            className="bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${galleryData?.image5}')` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Collage;
