"use client";
import React from "react";
import Modal from "./Modal";
import Image from "next/image";
interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}
const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isImage>
      <div
        className="
            w-96
            h-96"
      >
        <Image alt="image" src={src} fill className="object-contain" />
      </div>
    </Modal>
  );
};

export default ImageModal;
