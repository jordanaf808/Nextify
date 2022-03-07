
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from "../hooks/useSpotify";

import Songs from './Songs';

import { ChevronDownIcon } from '@heroicons/react/outline'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {

  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  // Instead of getting the value like this:
  // const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); 
  // Recoil allows us to just get the 'read-only' value like this:
  const playlistId = useRecoilValue(playlistIdState);

  // Now we need to get the playlist we select. We can store that in an 'playlistAtom.js'. for easy access and store default value.
  const [playlist, setPlaylist] = useRecoilState(playlistState); 


  function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const colorsMax = colors.length
  const colorRandNum = randomIntFromInterval(0, colorsMax) 

  // set background color
  useEffect(() => {
    setColor(colors[colorRandNum])
  }, [playlistId])

  // get playlist info
  useEffect(() => {
    spotifyApi.getPlaylist(playlistId)
    .then((data) => {setPlaylist(data.body)})
    .catch((err) => console.log("useEffect getPlaylist went wrong in Center.js", err))
  }, [spotifyApi, playlistId])

  return (
      <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8 flex flex-row-reverse w-full h-fit p-5">
          <div className="flex items-center bg-black text-white space-x-3 rounded-full opacity-90 hover:opacity-80 cursor-pointer p-1">
            {/* session? = Optional Chaining 
                - checks if variable exists before executing. 
                - simpler markup and prevents errors, instead returns 'undefined'.
            */}
            <img className="rounded-full w-10 h-10" src={session?.user.image} alt="User Image" />
            <h2 className="text-white">{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5 fill-slate-700" />
          </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            
            {/* Issue with getting credentials to retrieve Playlist Image on load
                - we server-side-render session info with getServerSideProps in index.js
            */}
            <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0].url} alt={`${playlist?.name} Playlist Image`} />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            </div>
        </section>
        <div>
          <Songs />
        </div>
      </div>
    );

};

export default Center;
