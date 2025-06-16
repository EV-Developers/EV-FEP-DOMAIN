import React from 'react'
import { translation } from '../../../../config/translations';

export default function TComments() {
  const [show, setShow] = React.useState(false)
  const stars = [1, 2, 3, 4, 5];
  const [ratting, setRatting] = React.useState(0);
  const [language, setLanguage] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);

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

  const comments_list = [
    {
      id: 'com-1',
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis harum nesciunt eum inventore quia obcaecati quod error reiciendis in numquam tempore dolores iure, aliquam ullam, alias ab, dolorem excepturi repudiandae?",
      review: 4,
      likes: 1,
      user: {
        name: 'Adam Ali',
        avatar: '/data/user.jpeg'
      },
      date: new Date()
    }
  ]

  const handleDeleteComment = () => {

  }

  const handleLikeComment = () => {

  }

  const handleAddReply = () => {

  }

  return (<div>
    {open && <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 p-7 flex flex-col items-center justify-center">
            <div className="text-center font-color p-5 text-xl">{comment}</div>
            <div className="flex mx-auto">

              {stars && stars.map(star => star <= ratting ? <img src="/star.png" className="mx-1 w-10 h-10 cursor-pointer" onClick={() => setRatting(star)} /> : <img src="/starg.png" className="mx-1 w-10 h-10 cursor-pointer" onClick={() => setRatting(star)} />)}
            </div>
            <div className="flex justify-between w-full">
              <button className="block mx-auto rounded pointer mt-7 m-2 py-3 px-7 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" onClick={() => setOpen(false)}>{language && language["cancel"]}</button>
              <button className="block mx-auto rounded pointer mt-7 m-2 py-3 px-7 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add"]}</button>
            </div>
          </div>
        </div>
      </div>
    </div>}

    {comments_list.map(item => <div key={`comment-${item.id}`} className="bg-[#00000016] my-5 rounded-2xl m-3 p-3">
      <div className="flex">
        <div>
          <img src={item.user.avatar} alt="" className="rounded-full w-14 bg-white" />
        </div>
        <div>
          <div className="flex my-2 mx-3">
            <p className="text-color font-bold">{item.user.name}</p>
            <p className="text-color mx-4">{item.date.toLocaleDateString('en-GB')}</p>
          </div>
          <div className="flex">
            {/* {stars && stars.map(star => <FontAwesomeIcon icon={faStar} className={`${star <= item.review ? 'primary' : 'text-gray-500'} mx-1`} />)} */}
            {stars && stars.map(star => star <= item.review ? <img key={`star-${star}`} src="/star.png" className="mx-1 w-5 h-5" /> : <img key={`star-${star}`} src="/starg.png" className="mx-1 w-5 h-5" />)}
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="text-sm text-color ml-14 ">{item.comment}</p>

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
    </div>)}

    <div className="relative m-4 mt-14">
      <div className={`flex justify-between ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} absolute z-10 bottom-0 w-full m-0 p-4`}>
        <div></div>
        <button onClick={() => setOpen(true)} className={`block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold`}>{language && language["publish"]}</button>
      </div>
      <textarea className="bg-[#00000016] rounded-2xl w-full p-2 px-4 pr-20 placeholder:text-gray-400 shadow-inner" placeholder={language && language["write_here"]} rows="7" onChange={val => setComment(val.target.value)} value={comment}></textarea>
    </div>
  </div>
  )
}
