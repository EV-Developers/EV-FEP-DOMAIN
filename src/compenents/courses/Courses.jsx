import React from 'react'
import { Link } from 'react-router-dom'
import ThemeContainer from '../parts/ThemeContainer'
import api from '../../config/api';

export default function Courses() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const tmpData = await api.get('/courses');
        if (tmpData.status == 200) {
            setData(tmpData.data.data);
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%]">
                <div className="flex justify-between">
                    <div></div>
                    <Link to="/new-course" className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400  ">Create</Link>
                </div>
                {data && data.map(item => <Link to={'/courses/' + item.id} key={"cat-" + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-2 my-2 text-sm'>{item.title}</Link>)}

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
