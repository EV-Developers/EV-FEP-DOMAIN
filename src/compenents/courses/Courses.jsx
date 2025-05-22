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
                {data && data.map(item => <Link to={'/courses/' + item.id} key={"cat-" + item.id} className='p-5 py-2 my-2 text-sm flex border-b border-b-[#aba9a9]'>
                    <img src="/data/vid-1.webp" alt="" className="w-[25%] rounded-xl" />
                    <div className="mx-4">
                        <h2 className="text-2xl">{item.title}</h2>
                        <p className="text-color py-2">A course by <strong className="text-bold primary-text">mohammed razi</strong>, electronic trainer and developer</p>

                    </div>
                </Link>)}

                {!data && <div role='status' className='animate-pulse'>
                    <div className="flex border-b border-b-gray-300">
                        <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                        <div className="w-full">
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                        </div>
                    </div>
                    <div className="flex border-b border-b-gray-300">
                        <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                        <div className="w-full">
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                        </div>
                    </div>
                    <div className="flex border-b border-b-gray-300">
                        <div className="bg-gray-300 block rounded-xl p-5 py-2 my-2 mr-2 w-[25%] h-[15vh]"></div>
                        <div className="w-full">
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[65%] h-6'></div>
                            <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-[50%] h-2'></div>
                        </div>
                    </div>
                </div>}
            </div>
        </ThemeContainer>
    )
}
