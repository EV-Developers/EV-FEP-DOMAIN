import React from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';

export default function ExploreOverlay({ language, setShow }) {
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState(null);
    const [loadingCats, setLoadingCats] = React.useState(true);

    React.useEffect(() => {
        loadCategoriesData();
    }, [])

    const loadCategoriesData = async () => {
        const response = await api.get('/course-categories');

        if (response.status == 200) {
            setLoadingCats(false);
            let tmpArr = response.data;
            setCategoriesData(tmpArr);
            if (tmpArr && tmpArr.length != 0) {
                setCategoryId(tmpArr[0].id);
            }
        } else {
            setLoadingCats(false);
        }
    }

    return (
        <div className="fixed z-50 overflow-y-scroll max-h-[87vh] w-[25%] bg-[#F0F4F9] rounded-2xl mt-[7%] mx-14 border-none shadow-xl" onMouseLeave={() => setShow(false)}>
            <div className=" pb-14 mx-5">
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['courses']}</Link>
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['my_courses']}</Link>
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['recommanded']}</Link>
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['new_courses']}</Link>
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['top_rated']}</Link>
                <Link to="/teachers/courses" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['popular_courses']}</Link>
                <Link to="/teachers/performance" className={`my-2 block py-2 cursor-pointer px-3 text-sm ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`}>{language && language['performance']}</Link>

                <hr className="text-gray-300 mx-4 my-3 mt-4" />

                <h3 className="text-sm font-bold my-3 px-3">{language && language['categories']}</h3>
                {categoriesData && categoriesData.map(item => <div key={item.id}>
                    <Link to={"/categories/"+item.id} className={`py-2 text-sm cursor-pointer px-3 ${language && language['dir'] == 'ltr' ? 'hover:border-l-2 border-l-[#fa9600]' : 'hover:border-r-2 border-r-[#fa9600]'}`} onClick={() => setCategoryId(item.id)}>{item.name}</Link>
                </div>)}

                {!categoriesData && loadingCats && <div className="animate-pulse">
                    <div className="w-[65%] h-8 bg-gray-300 my-4 rounded-2xl"></div>
                    <div className="w-[65%] h-8 bg-gray-300 my-4 rounded-2xl"></div>
                    <div className="w-[65%] h-8 bg-gray-300 my-4 rounded-2xl"></div>
                </div>}
            </div>
        </div>
    )
}
