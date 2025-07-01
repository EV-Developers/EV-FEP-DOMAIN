import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFilePdf, faImage, faTrashCan, faVideo } from '@fortawesome/free-solid-svg-icons';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';

export default function Materials() {
    const [data, setData] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [showModal, setShowModal] = React.useState(null);

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                setLanguage(translation[0]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            } else {
                setLanguage(translation[1]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            }
        } else {
            setLanguage(translation[0]);
            window.localStorage.setItem("language", 'english');
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }

    }, []);


    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await api.get('/materials');
            if (response.status == 200) {
                setData(response.data);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getFileType = (file) => {
        try {
            const tmpFile = file.split('.');
            const extention = tmpFile[tmpFile.length - 1];
            if (extention.toLowerCase().includes('png', 'jpg', 'jepg', 'webp')) {
                return faImage;
            } else if(extention.toLowerCase() == 'pdf'){
                return faFilePdf;
            }  else if(extention.toLowerCase() == 'mp4'){
                return faVideo;
            } else {
                return faFile;
            }
        } catch (error) {
            return faFile;
        }
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete('/materials/' + showModal);

            if (response.status == 200) {
                window.location.reload();
            } else {
                setShowModal(null);
                //console.log('error');
            }
        } catch (error) {
            setShowModal(null);
            //console.log(error);
        }
    }


    const handleGetMatrial = async (file) => {
        const aurl = "https://fep.misk-donate.com/api/materials/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl + file, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    try {
                        if (response && !response.ok) {
                            return false
                        }
                        return response.blob();
                    } catch (error) {
                        return false;
                    }
                })
                .then(blob => {
                    const tmpURL = URL.createObjectURL(blob);
                    const element = document.createElement('a');
                    element.href = tmpURL;
                    element.download = file;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                
                })
                .catch(error => {
                    console.error('Error loading video:', error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeContainer customeClasses="w-full">
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            
            <div className="mt-0 h-[300px] w-full bg-[url(/imgs/catsbanner.png)] bg-cover ">
                <div className="mx-auto w-[75%] text-center text-blue-950">
                    <h2 className="text-5xl font-bold p-3 pt-14">{language && language['materials']}</h2>
                </div>
            </div>

            <div className="block mx-auto w-[75%]">
                <div className="flex flex-wrap my-5 p-2">
                    <Link to={'/add-material'} className={`hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-14 my-2 w-[17%] mx-2 text-sm text-center text-white flex flex-col justify-center items-center bg-[url('/imgs/catsbg.png')] bg-center transition-all hover:scale-105 ${!data && 'animate-pulse'}`}>
                        <img src="/imgs/addbtn.png" alt="" />
                        <p className="my-3">{language && language['add']}</p>
                    </Link>
                    {data && data.map(item => <div key={"cat-" + item.id} className="p-5 py-7 my-2 w-[17%] mx-2 text-sm text-center ">
                        <div className="block  p-4 bg-[#dce5f1] rounded-xl transition-all hover:scale-105 relative pt-14">
                            <button className={`absolute top-0 ${language && language['dir'] == 'ltr' ? 'left-0':'right-0'} m-5 cursor-pointer`} onClick={() => setShowModal(item.id)}><FontAwesomeIcon icon={faTrashCan} className="text-xl" /></button>
                            <FontAwesomeIcon icon={getFileType(item.file)} className="text-8xl cursor-pointer" onClick={() => handleGetMatrial(item.file)} />
                        </div>
                            <p className="my-3 font-bold text-start cursor-pointer" onClick={() => handleGetMatrial(item.file)}>{item.title}</p>
                            <p className="my-3 text-xs text-start">{item.description}</p>
                    </div>)}
                    {!data && <>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[17%] h-[340px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[17%] h-[340px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[17%] h-[340px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[17%] h-[340px]'></div>
                    </>}
                </div>
            </div>
        </ThemeContainer>
    )
}
