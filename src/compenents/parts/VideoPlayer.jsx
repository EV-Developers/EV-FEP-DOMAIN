import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function VideoPlayer({ tmp_vid_url, courseId, lessonId, videoData, setVideoData, userProgress = 0 }) {
    const [play, setShow] = React.useState(true);
    const [progress, setProgress] = React.useState(0);
    const video = useRef();

    React.useEffect(() => {
        if(video){
            try {
                video.current.currentTime = userProgress;
            } catch (error) {
                console.log(error);
            }
        }
    }, [video])

    const handlePlay = () => {
        if (play) {
            video.current.play()
        } else {
            video.current.pause()
        }
        setShow(!play);
    }

    const handleProgress = (e) => {
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;
        const totalTime = (currentTime / duration) * 100;
        const payload = {
            courseId: courseId,
            lessonId: lessonId,
            duration: duration,
            currentTime: currentTime,
            progress: totalTime
        };
                
        setProgress(totalTime);
        setVideoData(payload);

        if (totalTime == 100) {
            setShow(true);
        }
    }

    return (<div className="w-full md:w-[75%] flex justify-center items-center relative px-0">
        <div className="text-amber-600 bg-[#CFCFCD] absolute bottom-4 z-10 mx-0 left-0 my-3 h-2 px-0 transition-all w-full"></div>
        <div style={{ width: (parseInt(progress) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all blur-xs"></div>
        <div style={{ width: (parseInt(progress) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all"></div>
        {play && <button onClick={handlePlay} className="rounded-full w-14 h-14 pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br  hover:from-amber-700 group-hover:to-amber-400 absolute z-10 flex justify-center items-center cursor-pointer"><FontAwesomeIcon icon={faPlay} className="block text-white text-3xl mx-auto" /></button>}
        <video onTimeUpdate={handleProgress} onClick={handlePlay} ref={video} height="440" className="w-full my-7 px-0 overflow-x-hidden rounded-t-2xl" poster="/data/vid-1.webp" controls={false}>
            <source src={tmp_vid_url} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>)
}
