import React from "react";

interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
}
const PlusIcon: React.FC<SVGProps> = ({ fill, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "24"}
      height={height ? height : "25"}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M6 12.5137L18 12.5137M12 18.5137L12 6.51367"
        stroke={fill ? fill : "#0F0F0F"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
