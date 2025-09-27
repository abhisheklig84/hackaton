export type SvgProps = {
  height?: string;
  width?: string;
  fill?: string;
};

const NavigationImage: React.FC<SvgProps> = ({ height, width, fill }) => {
  return (
    <svg
      width={width ? width : "24"}
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99976 5.99976L14.9999 11.9998L8.99976 17.9998"
        stroke={fill ? fill : "#0F0F0F"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NavigationImage;
