import { VolumeUpIcon as VolumeOffIcon } from "@heroicons/react/outline";
import {
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  FastForwardIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(
    currentTrackIdState as RecoilState<string | null>
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo: any = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((d) => {
        setCurrentTrackId(d.body?.item?.id as string);

        spotifyApi.getMyCurrentPlaybackState().then((d) => {
          setIsPlaying(d.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // spotifyApi.getMyCurrentPlaybackState().then((d) => {
    //   console.log(d.body.is_playing);
    //   if (d.body.is_playing) {
    //     spotifyApi.pause();
    //     setIsPlaying(false);
    //   } else {
    //     spotifyApi.play();
    //     setIsPlaying(true);
    //   }
    // });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((e) => console.log(e));
    }, 500),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b  from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 w-full ">
      <div className=" flex items-center space-x-4 w-full">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div className="">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artist?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon
            onClick={() => {
              handlePlayPause();
            }}
            className="button w-10 h-10"
          />
        ) : (
          <PlayIcon
            onClick={() => {
              handlePlayPause();
            }}
            className="button w-10 h-10"
          />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => {
            volume < 100 && setVolume(volume + 10);
          }}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
