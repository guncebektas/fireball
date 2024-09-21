import React, { useState } from 'react';
import { Card, Modal, Button } from 'flowbite-react';

export const RssFeedDetail = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!item) {
    return <div>Select an item to view details.</div>;
  }

  return (
    <>
      <Card className="p-4">
        <h2 className="font-bold text-xl text-blue-600">{item.title}</h2>
        <p className="text-gray-600">{new Date(item.pubDate).toLocaleDateString()}</p>
        <div className="mt-2">
          <Button onClick={() => setIsOpen(true)} className="text-blue-500 hover:underline">
            Read more
          </Button>
        </div>
        <div className="mt-4">
          <p>{item.description || 'No description available.'}</p>
        </div>
      </Card>

      {/* Modal for detailed view */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>
          {item.title}
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-600">{new Date(item.pubDate).toLocaleDateString()}</p>
          <div className="mt-4">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
          <div className="mt-4">
            <p>{item.description || 'No description available.'}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
