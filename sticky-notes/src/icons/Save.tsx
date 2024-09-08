import React from "react";

const SaveIcon = ({ size = "26" }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 26 26"
      stroke-width="1.6"
      className="size-8 icon"
    >
      <path
        stroke="#18181A"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default SaveIcon;
