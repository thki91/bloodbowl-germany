import { useState, useEffect } from "react";
import useContentful from "../../hooks/useContentful";
import Modal from "../Modal";

const Collage = () => {
  const [galleryData, setGalleryData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getGallery } = useContentful();

  useEffect(() => {
    const getGalleryData = async () => {
      const data = await getGallery();
      setGalleryData(data?.[0]);
    };
    getGalleryData();
  }, []);

  const handleClickCollage = (image) => {
    setModalContent(<img src={image} className="h-full p-2 pb-2.5" />);
  };

  const baseCollageClasses =
    "bg-stone-500 w-full h-full bg-cover bg-no-repeat bg-center hover:scale-105 transition cursor-pointer";

  return (
    <section
      className="py-5 sm:py-10 bg-stone-800 -mx-4 sm:-mx-10"
      id="collage"
    >
      <Modal
        show={!!modalContent}
        handleClose={() => setModalContent(null)}
        classes="!max-h-screen"
      >
        {modalContent}
      </Modal>
      <div className="px-4 sm:px-10 flex gap-3 min-h-[260px] sm:min-h-[300px] md:min-h-[320px]">
        <div className="flex-1 md:flex-auto md:w-[150px] xl:w-[200px] flex gap-3">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image1}')` }}
            onClick={() => handleClickCollage(galleryData?.image1)}
          />
        </div>
        <div className="hidden xl:block md:w-[110px] xl:max-w-[250px] flex-1">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image2}')` }}
            onClick={() => handleClickCollage(galleryData?.image2)}
          />
        </div>
        <div className="flex-1 flex gap-3 flex-col">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image3}')` }}
            onClick={() => handleClickCollage(galleryData?.image3)}
          ></div>
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image4}')` }}
            onClick={() => handleClickCollage(galleryData?.image4)}
          ></div>
        </div>
        <div className="hidden sm:block flex-1">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image5}')` }}
            onClick={() => handleClickCollage(galleryData?.image5)}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Collage;
