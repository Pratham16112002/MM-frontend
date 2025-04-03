import { StyleSheet } from 'react-native';
import React from 'react';
import OTPTextView from 'react-native-otp-textinput';
import { moderateScale, scale } from 'react-native-size-matters';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  value: string;
  onChange: (e: string) => void;
  maxLength: number;
};
const styles = StyleSheet.create({
  textInputContainer: {
    position: 'relative',
    height: scale(80),
  },
  roundedTextInput: {
    width: scale(50),
    height: scale(50),
    borderWidth: moderateScale(2),
    borderRadius: hp('1%'),
    color: 'white',
  },
});

const SplitInputField: React.FC<Props> = ({ value, onChange, maxLength }) => {
  return (
    <OTPTextView
      autoFocus={true}
      defaultValue={value}
      handleTextChange={onChange}
      inputCount={maxLength}
      textInputStyle={styles.roundedTextInput}
      containerStyle={styles.textInputContainer}
      inputCellLength={1}
    />
  );
};

export default SplitInputField;
