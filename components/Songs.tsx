import React from "react";
import {
  AtomOptions,
  RecoilState,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue<SpotifyApi.PlaylistObjectFull | null>(
    playlistState
  );

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((d, i) => {
        return <Song key={d.track?.id} track={d} order={i} />;
      })}
    </div>
  );
};

export default Songs;
