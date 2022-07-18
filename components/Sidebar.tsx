import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import React, { ReactComponentElement, useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlistAtom";

interface MenuProps {
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const menuButton1: MenuProps[] = [
  {
    name: "Home",
    Icon: HomeIcon,
  },
  {
    name: "Search",
    Icon: SearchIcon,
  },
  {
    name: "Your Library",
    Icon: LibraryIcon,
  },
];

const menuButton2: MenuProps[] = [
  {
    name: "Create Playlist",
    Icon: PlusCircleIcon,
  },
  {
    name: "Liked Songs",
    Icon: HeartIcon,
  },
  {
    name: "Your Episodes",
    Icon: RssIcon,
  },
];

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [playlistId, setPlaylistId] = useRecoilState<string>(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylist(data.body.items);
        })
        .catch((err) => console.log(err, "error spotify"));
    }
  }, []);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-32">
      <div className="space-y-4">
        {/* <button
          onClick={() => {
            signOut();
          }}
          className="flex items-center space-x-2 hover:text-white"
        >
          <HomeIcon className="h-5 w-5" />
          <p>Log out</p>
        </button> */}
        {menuButton1.map(({ name, Icon }) => (
          <button
            key={name}
            className="flex items-center space-x-2 hover:text-white"
          >
            <Icon className="h-5 w-5" />
            <p>{name}</p>
          </button>
        ))}
        <hr className="border-t-[0.1px] border-gray-900" />
        {menuButton2.map(({ name, Icon }) => (
          <button
            key={name}
            className="flex items-center space-x-2 hover:text-white"
          >
            <Icon className="h-5 w-5" />
            <p>{name}</p>
          </button>
        ))}
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* playlist */}
        {playlist.map(({ name, id }) => (
          <p
            key={id}
            onClick={() => {
              setPlaylistId(id);
            }}
            className="cursor-pointer hover:text-white"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
