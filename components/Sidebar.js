import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]); 
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); 

  console.log("you picked playlistID: ", playlistId)

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      })
    }
  }, [session, spotifyApi]);
  // console.log('get accessToken(): ' + spotifyApi.getAccessToken());
  // console.dir(playlists);
  
  return (
    // set responsive styles based on screen size: `lg:text-sm sm:max-w-[12rem]`
    // hide on mobile and reveal on sm: `hidden sm:inline-flex`
    <div style={{zIndex:10}} className='hidden sm:inline text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] border-r border-gray-900 h-screen w-fit overflow-y-scroll scrollbar-hide'>
      <h1>Sidebar</h1>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>
          <p>LogOut</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>My Library</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'></hr>

        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;
