import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../config/api';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFilePdf, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function TMaterials() {
    const [language, setLanguage] = React.useState(null);
    const [list, setList] = React.useState(null);

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

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await api.get('/materials');
            if (response.status == 200) {
                setList(response.data);
            }
        } catch (error) {
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
        <ThemeContainer role="teachers" customeClasses="w-full">
            <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/catsbanner.png)] bg-cover ">
                <div className="mx-auto w-[75%] text-center text-blue-950">
                    <h2 className="text-5xl font-bold p-3 pt-14">{language && language['materials']}</h2>
                </div>
            </div>

            <div className="block mx-auto w-[75%]">
                <div className="flex flex-wrap my-5 p-2">
                    {list && list.map(item => <button onClick={() => handleGetMatrial(item.file)} Link to={'/categories/' + item.id}  key={"cat-" + item.id} className="block p-4 py-5 my-2 w-[22%] mx-1 text-sm text-center cursor-pointer">
                        <div className="p-4 bg-[#dce5f1] rounded-xl transition-all hover:scale-105">
                            <FontAwesomeIcon icon={getFileType(item.file)} className="text-8xl text-[#1a31d3]" />
                            <p className="my-3 font-bold text-start">{item.title}</p>
                            <p className="my-3 text-xs text-start">{item.description}</p>
                        </div>
                    </button>)}
                    {!list && <>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    </>}
                </div>
            </div>
        </ThemeContainer>
    )
}
