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

  const handleClickCollage = ({ url, description }) => {
    setModalContent(
      <div>
        <img src={url} className="h-full w-max p-2 pb-2.5" />
        <div className="text-center italic text-sm">{description}</div>
      </div>
    );
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
      {/* desktop */}
      <div className="hidden px-4 sm:px-10 lg:flex gap-3 min-h-[260px] sm:min-h-[300px] md:min-h-[320px]">
        <div className="flex-1 md:flex-auto md:w-[150px] xl:w-[200px] flex gap-3">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image1?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image1)}
          />
        </div>
        <div className="hidden xl:block md:w-[110px] xl:max-w-[250px] flex-1">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image2?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image2)}
          />
        </div>
        <div className="flex-1 flex gap-3 flex-col">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image3?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image3)}
          ></div>
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image4?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image4)}
          ></div>
        </div>
        <div className="hidden sm:block flex-1">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image5?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image5)}
          ></div>
        </div>
      </div>

      {/* mobile + tablet */}
      <div className="px-4 sm:px-10 lg:hidden gap-3 ">
        <div className="flex gap-3 h-[200px] md:h-[250px] mb-3">
          <div
            className={baseCollageClasses}
            style={{ backgroundImage: `url('${galleryData?.image1?.url}')` }}
            onClick={() => handleClickCollage(galleryData?.image1)}
          />
          <div className="w-[150px] md:w-[200px] flex-shrink-0">
            <div
              className={baseCollageClasses}
              style={{ backgroundImage: `url('${galleryData?.image2?.url}')` }}
              onClick={() => handleClickCollage(galleryData?.image2)}
            />
          </div>
        </div>
        <div className="flex gap-3 h-[300px] md:h-[400px] w-full">
          <div className="flex-shrink-0 min-w-[200px] md:min-w-[250px]">
            <div
              className={baseCollageClasses}
              style={{ backgroundImage: `url('${galleryData?.image5?.url}')` }}
              onClick={() => handleClickCollage(galleryData?.image5)}
            ></div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div
              className={baseCollageClasses}
              style={{ backgroundImage: `url('${galleryData?.image3?.url}')` }}
              onClick={() => handleClickCollage(galleryData?.image3)}
            ></div>
            <div
              className={baseCollageClasses}
              style={{ backgroundImage: `url('${galleryData?.image4?.url}')` }}
              onClick={() => handleClickCollage(galleryData?.image4)}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collage;
