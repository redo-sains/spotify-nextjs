import React from "react";
import { RecoilState, useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

interface Props {
  track: SpotifyApi.PlaylistTrackObject;
  order: number;
}

const Song: React.FC<Props> = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(
    currentTrackIdState as RecoilState<string | null>
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    setCurrentTrackId(track.track?.id as string);
    setIsPlaying(true);
    // spotifyApi
    //   .play({
    //     uris: [track.track?.uri!],
    //   })
    //   .catch((e) => console.log("play Song Error = ", e));
  };

  return (
    <div
      onClick={() => playSong()}
      className="grid grid-cols-2 text-gray-500 cursor-pointer rounded-lg py-4 px-5 hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4 ">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track?.album.images[0].url}
          alt=""
        />
        <div>
          <p className="truncate w-32 lg:w-64 text-white">
            {track.track?.name}
          </p>
          <p className="w-40">{track.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track?.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track?.duration_ms as number)}</p>
      </div>
    </div>
  );
};

export default Song;
