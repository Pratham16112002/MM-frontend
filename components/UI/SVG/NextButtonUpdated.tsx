import * as React from 'react';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

const NextButtonSVGComponent: React.FC<SvgProps> = (props) => (
  <Svg width={503} height={504} viewBox="0 0 53 54" fill="none" {...props}>
    <Path
      d="M26.5 52C33.1304 52 39.4893 49.3661 44.1777 44.6777C48.8661 39.9893 51.5 33.6304 51.5 27C51.5 20.3696 48.8661 14.0107 44.1777 9.32233C39.4893 4.63392 33.1304 2 26.5 2"
      stroke="url(#paint0_linear_804_265)"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Path
      opacity={0.1}
      d="M26.5 2C19.8696 2 13.5107 4.63392 8.82233 9.32233C4.13392 14.0107 1.5 20.3696 1.5 27C1.5 33.6304 4.13392 39.9893 8.82233 44.6777C13.5107 49.3661 19.8696 52 26.5 52"
      stroke="white"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Circle cx={26.5} cy={27} r={20} fill="url(#paint1_linear_804_265)" />
    <Path
      d="M24.5 22L29.3586 26.8586C29.4367 26.9367 29.4367 27.0633 29.3586 27.1414L24.5 32"
      stroke="#F5F5F5"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_804_265"
        x1={26.5}
        y1={2}
        x2={26.5}
        y2={52}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#CC5854" />
        <Stop offset={1} stopColor="#9C3FE4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_804_265"
        x1={6.5}
        y1={26.8358}
        x2={46.5}
        y2={27.1642}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C45647" stopOpacity={0} />
        <Stop offset={1} stopColor="#9C3FE4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default NextButtonSVGComponent;
