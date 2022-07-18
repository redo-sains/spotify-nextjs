import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState" + (Math.random() + 1).toString(36).substring(7),
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState" + (Math.random() + 1).toString(36).substring(7),
  default: false,
});
