import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../../config/translations';
import ConfrimModal from '../../../../compenents/parts/ConfrimModal';

export default function Comments({ courseId }) {
  const [show, setShow] = React.useState(false)
  const stars = [1, 2, 3, 4, 5];
  const [language, setLanguage] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

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
    {showModal && <ConfrimModal message={language && language['confirm']} action={handleDeleteComment} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
    {comments_list.map(item => <div className="bg-[#00000016] my-5 rounded-2xl m-3 p-3">
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
            {stars && stars.map(star => <FontAwesomeIcon icon={faStar} className={`${star <= item.review ? 'primary' : 'text-gray-500'} mx-1`} />)}
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="text-sm text-color ml-14 ">{item.comment}</p>

        <div className="flex justify-between">
          <div></div>
          <div className="relative w-[75%]">
            <div className="flex">
              <button className='px-3 py-1 mx-2  my-2 cursor-pointer hover:bg-white rounded-2xl' onClick={() => setShowModal(true)}>{language && language["delete"]} <FontAwesomeIcon icon={faTrash} className="primary" /></button>
              <button className='px-3 py-1 mx-2 cursor-pointer hover:bg-white rounded-2xl flex my-2'><span>{language && language["like"]}</span> <img src="/like.png" className="mx-1 w-4 h-4 cursor-pointer" /></button>
              <button className='px-3 py-1 mx-2 cursor-pointer hover:bg-white rounded-2xl flex my-2' onClick={() => setShow(!show)}>
                <span>{language && language["reply"]} </span>
                <img src="/prioritylow.png" className="w-3 h-2 mt-2 mx-2" alt="" />
              </button>
            </div>
            {show && <div>
              <button className={`block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 ${language && language['dir'] == 'ltr' ? 'right-0' : 'left-0'} absolute z-10`}>{language && language["add"]}</button>
              <textarea className="bg-white rounded-2xl w-full p-2 px-4 pr-20" placeholder={language && language["write_here"]}></textarea>
            </div>}
          </div>
        </div>
      </div>
    </div>)}
  </div>
  )
}
