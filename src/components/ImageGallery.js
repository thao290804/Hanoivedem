import React from 'react';
import { Modal, Image } from 'antd';

const ImageGallery = ({ images, visible, onClose }) => {
  return (
    <Modal
      title="Bộ sưu tập ảnh"
      visible={visible}
      footer={null}
      onCancel={onClose}
      width={800}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',    // Centers images horizontally
        alignItems: 'center',        // Centers images vertically within the flex container
        gap: '10px',
        minHeight: '200px'           // Ensures the images are vertically centered if there aren't many images
      }}>
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            width={200}
            height={150}
            alt={`Gallery image ${index + 1}`}
            style={{ borderRadius: '5px' }}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ImageGallery;
