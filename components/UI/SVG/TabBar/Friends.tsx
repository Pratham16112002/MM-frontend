
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const FriendsSVGComponent: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 25"
    fill={props.color}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.739 6.65344C19.739 3.90256 17.8583 2.7998 15.1506 2.7998H8.79167C6.16711 2.7998 4.2002 3.82737 4.2002 6.46998V21.1938C4.2002 21.9196 4.98115 22.3767 5.61373 22.0219L11.9957 18.4419L18.3225 22.0158C18.9561 22.3727 19.739 21.9156 19.739 21.1888V6.65344Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.27148 9.52762H15.5898"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default FriendsSVGComponent;
