import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from 'recoil';
import { milsToMinutesAndSeconds } from '../lib/time';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

const Song = ({order, track}) => {

  const spotifyApi = useSpotify();
  console.log(track);

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <div 
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg" 
      onClick={playSong}
      >
      <div className="flex items-center">
        <p>{order + 1}</p>
        <img 
          className="h-[8vw] w-[8vw] m-[1rem] mr-[3rem]" 
          src={track.track.album.images[0].url} 
          alt="" 
        />
        <div className="w-full truncate">
          <p className="text-white truncate">{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex shrink items-center justify-between truncate ml-auto sm:ml-0">
        <p className="truncate">{track.track.album.name}</p>
        <p>{milsToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )

}

export default Song