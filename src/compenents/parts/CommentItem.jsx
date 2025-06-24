import React from 'react'

export default function CommentItem({language, item}) {
  const stars = [1, 2, 3, 4, 5];
  const [show, setShow] = React.useState(false);

  return (<div className="bg-[#00000016] my-5 rounded-2xl m-3 p-3">
      <div className="flex">
        <div>
          <img src={item.user ? item.user.avatar : "/profile.jpeg"} alt="" className="rounded-full w-14 bg-white" />
        </div>
        <div>
          <div className="flex my-2 mx-3">
            <p className="text-color font-bold">{item.user && item.user.name}</p>
            <p className="text-color mx-4">{new Date(item.created_at).toLocaleDateString('en-GB')}</p>
          </div>
          <div className="flex">
            {/* {stars && stars.map(star => <FontAwesomeIcon icon={faStar} className={`${star <= item.review ? 'primary' : 'text-gray-500'} mx-1`} />)} */}
            {stars && stars.map(star => star <= item.review ? <img key={`star-${star}`} src="/star.png" className="mx-1 w-5 h-5" /> : <img key={`star-${star}`} src="/starg.png" className="mx-1 w-5 h-5" />)}
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="text-sm text-color ml-14 ">{item.text}</p>

        <div className="flex justify-between">
          <div></div>
          <div className="relative w-[75%]">
            <div className="flex">
              <button className='px-3 py-1 mx-2 cursor-pointer hover:bg-white rounded-2xl flex my-2'><span>{language && language["like"]}</span> <img src="/like.png" className="mx-1 w-4 h-4 cursor-pointer" /></button>
              <button className='p-3 mx-2 py-1 my-2 cursor-pointer hover:bg-white rounded-2xl flex ' onClick={() => setShow(!show)}>
                <span>{language && language["reply"]} </span>
                <img src="/prioritylow.png" className="w-3 h-2 mt-2 mx-2" alt="" />
              </button>
            </div>
            {show && <div className="mt-3">
              <button className={`block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} absolute z-10`}>{language && language["add"]}</button>
              <textarea className="bg-white rounded-2xl w-full p-2 px-4 pr-20 placeholder:text-gray-400 shadow-inner" placeholder={language && language["write_here"]}></textarea>
            </div>}
          </div>
        </div>
      </div>
    </div>)
}
