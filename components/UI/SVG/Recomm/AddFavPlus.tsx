import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const RecommSearchIconSVGComponent : React.FC<SvgProps> = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      d="M16 2V30M2 16H30"
      stroke="#BFBFBF"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RecommSearchIconSVGComponent ;
