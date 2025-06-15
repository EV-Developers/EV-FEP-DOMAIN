import React from 'react'

export default function ResourcesItem({ language, item, setResourceId, setShowModal }) {
    const [resourceUrl, setResourceUrl] = React.useState(null);

    React.useEffect(() => {
        getVideo();
    }, []);

    const getVideo = async () => {
        const rurl = "https://fep.misk-donate.com/api/resources/download/";
        const token = window.localStorage.getItem('rJp7E3Qi7r172VD');

        try {
            fetch(rurl + item.file_path, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    try {
                        if (response && !response.ok) {
                            return false;
                        }
                        return response.blob();
                    } catch (error) {
                        //console.log(error);
                        return null;
                    }
                })
                .then(blob => {
                    if (blob) {
                        const tmpVideoURL = window.URL.createObjectURL(blob);

                        setResourceUrl(tmpVideoURL);
                    }
                })
                .catch(error => {
                    console.error('Error loading video:', error);
                });
        } catch (error) {
            //console.log(error);
        }
    }

    return (<div className="border-b border-b-gray-200 p-4 ">
        <p>{item.description}</p>
        <div className="flex">
            <a className="block rounded cursor-pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-0" href={resourceUrl && resourceUrl} download={true}>{language && language["download"]}</a>
            <button className="block rounded cursor-pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-2" onClick={() => {
                setResourceId(item.id);
                setShowModal(true);
            }}>{language && language["delete"]}</button>
        </div>
    </div>)
}
