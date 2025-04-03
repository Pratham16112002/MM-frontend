export type AppContextType = {
  isAuthenticated?: boolean;
  toggleIsAuthenticated: () => void;
  loading: boolean;
  checkUse: () => void;
};


export type PersonalizedPickListType = {
  username : string;
  profilePicUrl : string;
}

export type SpotLightCardType = {
  username : string;
  profilePicUrl : string;
  fullName : string
}