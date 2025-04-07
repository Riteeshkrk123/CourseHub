import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ isVideoOpen, closeVideo }) => {
    const videoPlayerRef = useRef(null);


    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (videoPlayerRef.current && !videoPlayerRef.current.contains(event.target)) {
                closeVideo();
            }
        };

        if (isVideoOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVideoOpen, closeVideo]);





    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 ${isVideoOpen ? 'block' : 'hidden'}`}>
            <div
                ref={videoPlayerRef}
                className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden"
            >
                {/* Video Embed */}
                {/* Video Embed */}
                <div className="w-full">
                    <iframe
                        src="https://www.youtube.com/embed/T0bBPeofm7M?si=kSIiv5bfWkZtirVz"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-[400px] rounded-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    isVideoOpen: PropTypes.bool,
    closeVideo: PropTypes.func,
};

export default VideoPlayer;