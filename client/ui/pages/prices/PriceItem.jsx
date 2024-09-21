import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "flowbite-react";

export const PriceItem = ({title, subTitle, price, features, onClick}) => {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{subTitle}.</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>

      <ul role="list" className="mb-8 space-y-4 text-left">
        {
          features.map((feature, index) =>
            <li className="flex items-center space-x-3" key={index}>
              <FontAwesomeIcon icon="check" className="text-green-500 dark:text-green-400"/>
              <span>{feature}</span>
            </li>
          )
        }
      </ul>
      <Button color="blue">Get started</Button>
    </div>
  )
}
