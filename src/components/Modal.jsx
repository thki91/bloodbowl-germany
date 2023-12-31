import { useCallback, useEffect } from "react";

export const ModalTitle = ({ title }) => {
  return (
    <h3 className="text-lg font-semibold bg-gradient-to-r from-black via-red-500 to-yellow-400 absolute top-0 left-0 mb-10 rounded-br-md px-2 py-1.5 text-white">
      {title}
    </h3>
  );
};

const Modal = ({ handleClose, show, children, classes }) => {
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity left-0 top-0 z-50 pointer-events-none"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto left-0 top-0">
        <div className="flex sm:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ${classes}`}
          >
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div
                className="absolute right-0 top-0 py-2 rounded-sm px-3 sm:py-2.5 sm:px-3.5 text-lg font-semibold cursor-pointer hover:text-stone-500 transition"
                onClick={handleClose}
              >
                &#10005;
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
