import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function TCategories() {
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
    }, []);

    /**
     * @async
     * load all courses categories data
     */
    const loadData = async () => {
        const response = await api.get('/course-categories');
        if (response.status == 200) {
            setData(response.data);
        }
    }

    return (
        <ThemeContainer role="teachers">
            <div className="block mx-auto w-[75%]">
                {data && data.map(item => <Link to={'/teachers/categories/' + item.id} key={"cat-" + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-2 my-2'>{item.name}</Link>)}
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
