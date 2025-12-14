import { useState, useEffect } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "./Modal";

const ImageGrid = ({ images, onImageClick, rowHeight = 300 }) => {
  if (!images?.length) return null;

  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gridAutoRows: `${rowHeight}px`,
      }}
    >
      {images.map((image, index) => {
        const tag = image.tags[0]?.value;
        return (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.caption || ""}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {tag && (
              <span className="absolute bottom-2 left-2 inline-block px-2.5 py-1 text-xs font-semibold leading-none text-yellow-400 bg-black/65 whitespace-nowrap rounded">
                {tag}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Collage = () => {
  const [galleryData, setGalleryData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getGallery } = useContentful();

  useEffect(() => {
    const getGalleryData = async () => {
      const data = await getGallery();
      // preload images
      if (data && data[0]) {
        data[0].galleryDesktop?.forEach((galleryEntry) => {
          new Image().src = galleryEntry.src;
        });
        data[0].galleryMobile?.forEach((galleryEntry) => {
          new Image().src = galleryEntry.src;
        });
        setGalleryData(data[0]);
      }
    };
    getGalleryData();
  }, []);

  const handleClickCollage = ({ caption, src }) => {
    setModalContent(
      <div>
        <img src={src} className="h-full w-max p-2 pb-2.5" />
        <div className="text-center italic text-sm">{caption}</div>
      </div>,
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
      {/* Desktop */}
      <div className="hidden md:block">
        <ImageGrid
          images={galleryData?.galleryDesktop}
          onImageClick={handleClickCollage}
          rowHeight={300}
        />
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <ImageGrid
          images={galleryData?.galleryMobile}
          onImageClick={handleClickCollage}
          rowHeight={300}
        />
      </div>
    </section>
  );
};

export default Collage;
