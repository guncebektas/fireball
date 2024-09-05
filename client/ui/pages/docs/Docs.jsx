import React from "react";
import {useFind, useSubscribe} from "meteor/react-meteor-data";
import {PUBLISH} from "../../../../imports/modules/links/enums/publish";
import {linkRepository} from "../../../../imports/modules/links/linkRepository";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Docs = () => {
  const foreGroundColors = [
    "text-red-700",
    "text-orange-700",
    "text-rose-700",
    "text-yellow-700",
  ];
  const backgroundColors = [
    "bg-red-50",
    "bg-orange-50",
    "bg-rose-50",
    "bg-yellow-50",
  ];
  const isLoading = useSubscribe(PUBLISH.LINKS);

  const data = useFind(() => linkRepository.find());

  const links = data.map((d, index) => ({
    ...d,
    iconForeground: foreGroundColors[index],
    iconBackground: backgroundColors[index],
  }));

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  const actions = links.map((link) => ({
    id: link._id,
    title: link.title,
    href: link.url,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
    ...link,
  }));

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "rounded-lg inline-flex p-3 ring-4 ring-white"
              )}
            >
              {action.icon}
            </span>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a
                  href={action.href}
                  target="_blank"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {action.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
