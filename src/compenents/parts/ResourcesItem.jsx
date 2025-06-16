import React from 'react'
import api from '../../config/api';

export default function ResourcesItem({ language, item, setResourceId, setShowModal, role }) {
    const [resourceUrl, setResourceUrl] = React.useState(null);

    React.useEffect(() => {
        getFileUrl();
    }, []);

    const getFileUrl = async () => {
        console.log(item.file_path);
                
        const demo_file = "cpgadXkTcb621RwYciKX2XM1beDlHWukHFpoqkf0.docx";
        const rurl = "https://fep.misk-donate.com/api/resources/download/"+demo_file//+item.file_path;
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(rurl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    try {
                        if (response && !response.ok) {
                            //console.log('error');
                        }
                        return response.blob();
                    } catch (error) {
                        return null;
                    }
                })
                .then(blob => {
                   const tmpUrl = window.URL.createObjectURL(blob);
                   setResourceUrl(tmpUrl);
                })
                .catch(error => {
                    //console.error('Error loading file:', error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (<div className="border-b border-b-gray-200 p-4 ">
        <p>{item.description}</p>
        <div className="flex">
            {resourceUrl && <a className="block rounded cursor-pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-0" href={resourceUrl} download={true}>{language && language["download"]}</a>}
            {role == "creator" && <button className="block rounded cursor-pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2" onClick={() => {
                setResourceId(item.id);
                setShowModal(true);
            }}>{language && language["delete"]}</button>}
        </div>
    </div>)
}
