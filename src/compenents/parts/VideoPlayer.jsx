import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'

export default function VideoPlayer({ language, tmp_vid_url, courseId, lessonId, videoData, setVideoData, userProgress = 0, poster = "/data/vid-1.webp", setVideosTime, setVideoProgress, completed=false, playNext, has_quiz }) {
    const [play, setShow] = React.useState(true);
    const [fullScreen, setFullScreen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showNext, setShowNext] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const video = useRef();

    React.useEffect(() => {
        const waiting = document.getElementById('video-' + lessonId).addEventListener('waiting', (ev) => {            
            setLoading(true);
        });

        const playing = document.getElementById('video-' + lessonId).addEventListener('playing', (ev) => {            
            setLoading(false);
        });

        return () => {
            document.removeEventListener('waiting', waiting);
            document.removeEventListener('playing', playing);
        };
    }, [tmp_vid_url]);

    React.useEffect(() => {
        const progress = document.getElementById('video-' + lessonId).addEventListener('pause', (ev) => {    
            if(setVideoProgress){
                setVideoProgress(ev.target.currentTime);
            }        
        });

        return document.removeEventListener('stop', progress);
    }, [tmp_vid_url]);

    React.useEffect(() => {
        const listen = document.getElementById('video-' + lessonId).addEventListener('loadedmetadata', function (ev) {
            const currentTime = ev.target.currentTime;
            const duration = ev.target.duration;
            const totalTime = (currentTime / duration) * 100;
            const userTime = (userProgress * duration) / 100;
            let minutes = Math.floor((duration / 60));
            let seconds = Math.floor((duration % 60));
            minutes = isNaN(minutes) ? 0 : minutes;
            seconds = isNaN(seconds) ? 0 : seconds;

            ev.target.currentTime = userTime;

            const payload = {
                id: Date.now(),
                courseId: courseId,
                lessonId: lessonId,
                duration: duration,
                minutes: minutes,
                seconds: seconds,
                currentTime: userTime,
                progress: totalTime,
            };

            setVideoData(payload);
            if(setVideosTime){
                setVideosTime(payload);
            }
        });

        return document.getElementById('video-' + lessonId).removeEventListener('loadedmetadata', listen);
    }, [tmp_vid_url]);

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
        let minutes = Math.floor((duration / 60));
        let seconds = Math.floor((duration % 60));
        minutes = isNaN(minutes) ? 0 : minutes;
        seconds = isNaN(seconds) ? 0 : seconds;
        const remaining = duration - currentTime;

        const payload = {
            courseId: courseId,
            lessonId: lessonId,
            duration: duration,
            minutes: minutes,
            seconds: seconds,
            currentTime: currentTime,
            progress: totalTime
        };

        setProgress(totalTime);
        setVideoData(payload);

        if (totalTime == 100) {
            setShow(true);
        }        

        if (playNext && remaining <= 5 && !showNext) {
            setShowNext(true);
        }
    }

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            document.getElementById("player"+lessonId).classList.toggle('is-fullscreen', fullScreen);
        };

        const handleExitFullScreen = (ev) => {
            console.log(ev.target);
            
            if(ev.target.key == "ESC" || ev.target.key == "esc"){
                setFullScreen(!fullScreen);
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullScreen = () => {        
        if(fullScreen || document.fullscreenElement){
            document.exitFullscreen();
        } 

        if(fullScreen == false || document.fullscreenElement == false) {
            //video.current.requestFullscreen()
            document.getElementById("player"+lessonId).requestFullscreen();
        }

        setFullScreen(!fullScreen);
    }

    const handleVideoProgress = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = (clickX / width) * 100;
        const role = window.localStorage.getItem("z8C2XXEo52uJQj7");
        
        // Seek video
        if (video.current?.duration) {
            if(role == "teacher"){
                if(completed){
                    video.current.currentTime = (percent / 100) * video.current.duration;
                }
            } else {
                video.current.currentTime = (percent / 100) * video.current.duration;
            }
        }
    }

    return (<div id={"player"+lessonId} className="w-full md:w-[75%] flex justify-center items-center relative px-0 player">
        {playNext && showNext && <div className={`absolute z-10 bottom-20 bg-[#fa9600a0] rounded-sm px-4 text-white mx-3 text-xs ${language && language['dir'] == 'rtl' ? 'right-0':'left-0'} md:w-[35%] xl:w-[25%] py-1 transition-opacity duration-700 ease-in ${showNext ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="font-bold italic">{language && language['next']}: </h2>
            <p className="italic">{has_quiz ? language && language["lesson_quizzes"] : playNext.title}</p>
        </div>}
        <div className="text-amber-600 bg-[#CFCFCD] absolute bottom-4 z-10 mx-0 left-0 my-3 h-2 px-0 transition-all w-full" onClick={handleVideoProgress}></div>
        <div id="progress" style={{ width: (parseInt(progress) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all blur-xs pointer-events-none cursor-progress" ></div>
        <div style={{ width: (parseInt(progress) - 0.7) + '%' }} className="text-amber-600 bg-amber-500 absolute bottom-4 z-20 mx-0 left-0 my-3 h-2 px-0 transition-all pointer-events-none" ></div>
        <button title={language && language['fullscreen']} className="bottom-0 right-0 m-5 mb-10 absolute z-30 cursor-pointer" onClick={toggleFullScreen}>
            <FontAwesomeIcon icon={fullScreen ? faCompress : faExpand} className="text-xl font-bold text-amber-300" />
        </button>
        {play && <button onClick={handlePlay} className="rounded-full w-28 h-28 m-2 py-1 px-5 text-sm absolute z-10 flex justify-center items-center cursor-pointer">
            <img src="/play_btn.png" alt="" className="w-full" />
        </button>}
        {loading && <div className="absolute z-10 flex justify-center items-center"> <img className="animate-spin w-18 h-18 m-2 " src="/loading.png" /></div>}
        <video
            onTimeUpdate={handleProgress}
            onClick={handlePlay}
            ref={video}
            height="440"
            className="w-full max-h-[430px] my-7 px-0 overflow-x-hidden rounded-t-2xl object-cover"
            //poster={poster}
            controls={false}
            preload="metadata"
            id={'video-' + lessonId}
            onContextMenu={(e) => e.preventDefault()}
        >
            <source src={tmp_vid_url} type="video/mp4" />
            {language && language['video_player_error']}
        </video>
    {/* </div> */}
    </div>)
}
