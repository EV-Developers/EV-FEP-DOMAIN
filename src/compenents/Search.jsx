import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ThemeContainer from './parts/ThemeContainer';
import api from '../config/api';

export default function Search() {
  const { query } = useParams()
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const tmpData = await api.get('/courses/q='+query);
      if (tmpData.status == 200) {
        setData(tmpData.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      
      setData([]);
    }
  }

  return (
    <ThemeContainer>
      <div className="block mx-auto w-[75%]">
        <div className="text-xl py-5 font-bold">
          Search results for {query}
        </div>
        {data && data.map(item => <Link to={'/courses/' + item.id} key={"cat-" + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 py-2 my-2 text-sm'>{item.title}</Link>)}

        {!data && <div role='status' className='animate-pulse'>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
          <div className='block rounded-xl bg-gray-300 p-5 py-2 my-2 w-full h-8'></div>
        </div>}

        {data && data.length == 0 && <p className="p-5 m-5">No results found for {query}...</p>}
      </div>
    </ThemeContainer>
  )
}
