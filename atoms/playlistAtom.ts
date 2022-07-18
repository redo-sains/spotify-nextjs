import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState" + (Math.random() + 1).toString(36).substring(7),
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState" + (Math.random() + 1).toString(36).substring(7),
  default: "7GIwnC3WcDFDCnARazRTID",
});
