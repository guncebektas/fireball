import React, { useState } from 'react';
import {useTranslator} from "../../providers/i18n";
import {Modal} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const productsData = [
  { id: '1', categoryTitle: 'Category 1', title: 'Product 1', price: 29.99, starCount: 4.5, description: 'Description of Product 1', image: 'https://via.placeholder.com/100' },
  { id: '2', categoryTitle: 'Category 1', title: 'Product 2', price: 39.99, starCount: 4.0, description: 'Description of Product 2', image: 'https://via.placeholder.com/100' },
  { id: '3', categoryTitle: 'Category 2', title: 'Product 3', price: 49.99, starCount: 5.0, description: 'Description of Product 3', image: 'https://via.placeholder.com/100' },
  { id: '4', categoryTitle: 'Category 2', title: 'Product 4', price: 59.99, starCount: 3.5, description: 'Description of Product 4', image: 'https://via.placeholder.com/100' },
];

export const StoreMenuModal = ({store, isOpen, onClose}) => {
  const t = useTranslator();

  const [activeTab, setActiveTab] = useState('Category 1');

  const handleTabChange = (category) => {
    setActiveTab(category);
  };

  // Filter products by the active category
  const filteredProducts = productsData.filter(product => product.categoryTitle === activeTab);

  if (!store) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{store.title}</Modal.Header>
      <Modal.Body>
        <div className="gap-3 mx-auto max-w-screen-xl dark:text-white relative">
          <div className="overflow-x-auto relative">
            <ul id="tab-list" className="flex border-b space-x-4 w-full min-w-max mobile-glimpse">
              <li className="cursor-pointer">
                <button
                  className={`py-2 px-4 ${activeTab === 'Category 1' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => handleTabChange('Category 1')}
                >
                  {t('Category 1')}
                </button>
              </li>
              <li className="cursor-pointer">
                <button
                  className={`py-2 px-4 ${activeTab === 'Category 2' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => handleTabChange('Category 2')}
                >
                  {t('Category 2')}
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border p-4 mb-2 flex justify-between items-center">
                <div>
                  <h3 className="m-title font-bold">{product.title}</h3>
                  <p className="m-text">{product.description}</p>
                  <p className="m-text">Price: ${product.price.toFixed(2)}</p>
                  <p className="text-green-500">Stars: {product.starCount} <FontAwesomeIcon icon="star"/></p>
                </div>
                <img src={product.image} alt={product.title} className="ml-4 w-24 h-24 object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
