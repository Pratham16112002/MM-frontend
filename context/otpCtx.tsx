import React, { PropsWithChildren } from 'react';

const OTPContext = React.createContext<{
  otp: number | null;
  saveOtp: (otp: number) => void;
  deleteOtp: () => void;
}>({
  otp: null,
  saveOtp: () => null,
  deleteOtp: () => null,
});

export const useOTPCtx = () => {
  return React.useContext(OTPContext);
};

export function OTPProvider({ children }: PropsWithChildren) {
  const [otp, setOtp] = React.useState<number | null>(null);
  const saveOtp = (otp: number) => {
    setOtp(otp);
  };
  const deleteOtp = () => {
    setOtp(null);
  };
  const value = {
    otp,
    saveOtp,
    deleteOtp,
  };
  return <OTPContext.Provider value={value}>{children}</OTPContext.Provider>;
}
