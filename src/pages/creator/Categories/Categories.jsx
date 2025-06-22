import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ConfrimModal from '../../../compenents/parts/ConfrimModal';

export default function Categories() {
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
            const response = await api.get('/course-categories');
            if (response.status == 200) {
                setData(response.data);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete('/course-categories/' + showModal);

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

    return (
        <ThemeContainer customeClasses="w-full">
            {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
            
            <div className="mt-0 h-[300px] w-full bg-green-600 bg-[url(/imgs/catsbanner.png)] bg-cover ">
                <div className="mx-auto w-[75%] text-center text-blue-950">
                    <h2 className="text-5xl font-bold p-3 pt-14">{language && language['categories']}</h2>
                </div>
            </div>

            <div className="block mx-auto w-[75%]">
                <div className="flex flex-wrap my-5 p-2">
                    <Link to={'/new-category'} className={`hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-20 my-2 w-[17%] mx-2 text-sm text-center text-white flex flex-col justify-center items-center bg-[url('/imgs/catsbg.png')] bg-center transition-all hover:scale-105 ${!data && 'animate-pulse'}`}>
                        <img src="/imgs/addbtn.png" alt="" />
                        <p className="my-3">{language && language['add']}</p>
                    </Link>
                    {data && data.map(item => <div key={"cat-" + item.id} className="hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-20 my-2 w-[17%] mx-2 text-sm text-white flex flex-col justify-center items-center bg-[url('/imgs/catsbg.png')] bg-cover transition-all hover:scale-105 relative">
                        <button className={`absolute top-0 ${language && language['dir'] == 'ltr' ? 'left-0':'right-0'} m-5 cursor-pointer`} onClick={() => setShowModal(item.id)}><FontAwesomeIcon icon={faTrashCan} className="text-xl" /></button>
                        <Link Link to={'/categories/' + item.id}>
                            <img src="/imgs/cats.png" alt="" />
                            <p className="my-3 font-bold">{item.name}</p>
                        </Link>
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
