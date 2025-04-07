import { useRef, useState } from 'react';
import ReactPlayer from 'react-player'

const VideoPlay = () => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleMute = () => {
        setMuted(!muted);
    };

    const handleVolumeChange = (event) => {
        setVolume(parseFloat(event.target.value));
    };

    const handleProgress = (progress) => {
        setProgress(progress.played * 100);
    };

    const seekTo = (event) => {
        const newTime = (event.nativeEvent.offsetX / event.target.offsetWidth) * playerRef.current.getDuration();
        playerRef.current.seekTo(newTime, "seconds");
    };

    return (
        <div className="relative w-full mt-10">
            {/* Video Player */}
            <ReactPlayer
                ref={playerRef}
                url="https://www.dropbox.com/scl/fi/07lj0mkwnpjyi3inoy3aa/MERN-Stack-Tutorial-1-What-is-the-MERN-Stack_.mp4?rlkey=qmlmiee29cifcbuqzotqhw6vg&e=1&st=ruu3ngs2&dl=0"
                playing={playing}
                muted={muted}
                volume={volume}
                onProgress={handleProgress}
                controls={false} // Disable default controls
                width="100%"
                height="100%"
            />

            {/* Custom Controls */}
            <div className="absolute bottom-1 left-1 w-[99%] bg-black bg-opacity-50 text-white flex flex-col p-2 space-y-2 rounded-b-[16px]">
                {/* Progress Bar */}
                <div
                    className="w-full h-1 bg-gray-400 cursor-pointer"
                    onClick={seekTo}
                >
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause Button */}
                        <button onClick={handlePlayPause} className="text-xl">
                            {playing ? "⏸️" : "▶️"}
                        </button>

                        {/* Mute Button */}
                        <button onClick={handleMute} className="text-xl">
                            {muted ? "🔇" : "🔊"}
                        </button>

                        {/* Volume Slider */}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20"
                        />
                    </div>

                    {/* Fullscreen Button */}
                    <button className="text-xl">🔲</button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlay;