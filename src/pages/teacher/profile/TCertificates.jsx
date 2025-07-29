import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { Link } from 'react-router-dom';
import api from '../../../config/api';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TCertificates() {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [language, setLanguage] = React.useState(null);

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

        loadData();
    }, []);


    const loadData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/certificates');

            if (response.status == 200) {
                setLoading(false);

                if (response.data) {
                    setData(response.data);
                }
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const handleCertificate = async (item_id) => {   
        const aurl = `https://fep.misk-donate.com/api/certificates/${item_id}/download`;
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(aurl, {
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
                    element.download = Date.now().toString();
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

    return (<ThemeContainer role="teachers" customeClasses="w-full">
        <div className="2xl:w-[75%] mx-auto mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/catsbanner.png)] bg-cover ">
            <div className="mx-auto w-[75%] text-center text-blue-950">
                <h2 className="text-5xl font-bold p-3 pt-14">{language && language['certificates']}</h2>
            </div>
        </div>

        <div className="block mx-auto w-[75%]">
            <div className="flex flex-wrap my-5 p-2">
                {data && data.map(item => <div key={"cat-" + item.id} className="block p-4 py-5 my-2 w-[22%] mx-1 text-sm text-center cursor-pointer">
                    <div className="p-4 bg-[#dce5f1] rounded-xl transition-all hover:scale-105">
                        <FontAwesomeIcon icon={faFilePdf} className="block text-8xl text-[#1a31d3]" />
                        <Link to={'/teachers/categories/' + item.id} className="block my-3 font-bold text-start hover:text-[#1a31d3]">{item.category_name}</Link>
                        <button className="block my-2 cursor-pointer hover:text-[#1a31d3]" onClick={() => handleCertificate(item.id)}>{language && language['download']}</button>
                    </div>
                </div>)}
                {loading && !data && <>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                    <div className='rounded-xl bg-gray-300 p-5 py-2 my-2 mx-3 w-[22%] h-[200px]'></div>
                </>}
            </div>
        </div>
    </ThemeContainer>)
}
