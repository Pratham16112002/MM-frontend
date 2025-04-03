
import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const RecommendationSVGComponent: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 25"
    fill={props.color}
    {...props}
  >
    <Circle
      cx={11.7664}
      cy={12.2669}
      r={8.98856}
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={props.color}
    />
    <Path
      d="M18.0181 18.9854L21.5421 22.5002"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RecommendationSVGComponent;
