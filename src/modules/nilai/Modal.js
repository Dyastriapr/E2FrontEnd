import React from "react";

const Modal = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none text-black">
      <div className="relative w-full md:w-1/4 mx-auto my-6 z-50">
        {/* Konten Modal */}
        <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header Modal */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* Body Modal */}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              {content}
            </p>
          </div>
          {/* Footer Modal */}
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onClose}
              style={{ transition: "all .15s ease" }}
            >
              Close
            </button>
            {/* Tombol tambahan bisa ditambahkan di sini */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
