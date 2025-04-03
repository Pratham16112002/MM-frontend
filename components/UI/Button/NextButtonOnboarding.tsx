import React from 'react';
import { TouchableOpacity } from 'react-native';
import NextButtonSVGComponent from '../SVG/NextButtonUpdated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import { Container } from './styles';
interface Props {
  onClick: () => void;
}

const NextButtonOnboard: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <NextButtonSVGComponent width={wp(10)} height={hp(10)} />
    </TouchableOpacity>
  );
};

export default NextButtonOnboard;
