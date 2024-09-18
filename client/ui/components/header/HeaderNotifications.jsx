import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const HeaderNotifications = () => {
  return (
    <>
      <button
        type="button"
        data-dropdown-toggle="notification-dropdown"
        className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">View notifications</span>
        <FontAwesomeIcon icon="bell"/>
      </button>

      <div
        className="hidden overflow-hidden z-10 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
        id="notification-dropdown"
      >
        <div
          className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
        >
          Notifications
        </div>
        <div>
          <a
            href="#"
            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div className="flex-shrink-0">
              <img
                className="w-11 h-11 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Green avatar"
              />
              <div
                className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                  ></path>
                  <path
                    d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="pl-3 w-full">
              <div
                className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
              >
                New message from
                <span className="font-semibold text-gray-900 dark:text-white"
                >Bonnie Green</span
                >: "Hey, what's up? All set for the presentation?"
              </div>
              <div
                className="text-xs font-medium text-primary-600 dark:text-primary-500"
              >
                a few moments ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div className="flex-shrink-0">
              <img
                className="w-11 h-11 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Leos avatar"
              />
              <div
                className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="pl-3 w-full">
              <div
                className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
              >
                    <span className="font-semibold text-gray-900 dark:text-white"
                    >Jese leos</span
                    >
                and
                <span className="font-medium text-gray-900 dark:text-white"
                >5 others</span
                >
                started following you.
              </div>
              <div
                className="text-xs font-medium text-primary-600 dark:text-primary-500"
              >
                10 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div className="flex-shrink-0">
              <img
                className="w-11 h-11 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                alt="Joseph McFall avatar"
              />
              <div
                className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="pl-3 w-full">
              <div
                className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
              >
                    <span className="font-semibold text-gray-900 dark:text-white"
                    >Joseph Mcfall</span
                    >
                and
                <span className="font-medium text-gray-900 dark:text-white"
                >141 others</span
                >
                love your story. See it and view more stories.
              </div>
              <div
                className="text-xs font-medium text-primary-600 dark:text-primary-500"
              >
                44 minutes ago
              </div>
            </div>
          </a>
        </div>
        <a
          href="#"
          className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
        >
          <div className="inline-flex items-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            View all
          </div>
        </a>
      </div>
    </>);
};
