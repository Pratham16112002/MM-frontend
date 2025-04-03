import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const AverageRatingSVGComponent : React.FC<SvgProps> = (props) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      opacity={0.7}
      d="M9 1L10.8862 7.08547H17L12.0569 10.8462L13.9431 17L9 13.1709L4.05691 17L5.94309 10.8462L1 7.08547H7.11382L9 1Z"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinejoin="round"
    />
  </Svg>
);
export default AverageRatingSVGComponent;
