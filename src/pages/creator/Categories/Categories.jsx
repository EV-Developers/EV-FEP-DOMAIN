import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function Categories() {
    const [data, setData] = React.useState(null);
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

    }, []);


    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await api.get('/course-categories');
            if (response.status == 200) {
                console.log(response.data);
    
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/new-category" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400   font-bold">{language && language["create"]}</Link>
                </div>

                {data && data.map(item => <Link to={'/categories/' + item.id} key={"cat-" + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-2 my-2'>{item.name}</Link>)}
                {!data && <div role='status' className='animate-pulse'>
                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
                    <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
                </div>}
            </div>
        </ThemeContainer>
    )
}
