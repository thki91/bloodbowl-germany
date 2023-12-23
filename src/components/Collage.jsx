import { useState, useEffect } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "./Modal";
import { Gallery } from "react-grid-gallery";

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

  const handleClickCollage = (_, { caption, src }) => {
    setModalContent(
      <div>
        <img src={src} className="h-full w-max p-2 pb-2.5" />
        <div className="text-center italic text-sm">{caption}</div>
      </div>
    );
  };

  return (
    <section className="py-5" id="collage">
      <Modal
        show={!!modalContent}
        handleClose={() => setModalContent(null)}
        classes="!max-h-screen"
      >
        {modalContent}
      </Modal>
      <Gallery
        images={galleryData}
        onClick={handleClickCollage}
        enableImageSelection={false}
        rowHeight={300}
      />
    </section>
  );
};

export default Collage;
