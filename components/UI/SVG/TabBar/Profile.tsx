
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ProfileSVGComponent: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width}
    height={props.width}
    viewBox="0 0 24 25"
    fill={props.color}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98493 13.8457C4.11731 13.8457 0.814453 14.4305 0.814453 16.7724C0.814453 19.1143 4.09636 19.72 7.98493 19.72C11.8525 19.72 15.1545 19.1343 15.1545 16.7933C15.1545 14.4524 11.8735 13.8457 7.98493 13.8457Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98489 10.5059C10.523 10.5059 12.5801 8.44779 12.5801 5.90969C12.5801 3.3716 10.523 1.31445 7.98489 1.31445C5.44679 1.31445 3.3887 3.3716 3.3887 5.90969C3.38013 8.43922 5.42394 10.4973 7.95251 10.5059H7.98489Z"
      stroke={props.color}
      strokeWidth={1.42857}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ProfileSVGComponent;

