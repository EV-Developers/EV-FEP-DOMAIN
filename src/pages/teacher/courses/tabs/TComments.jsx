import React from 'react'
import { translation } from '../../../../config/translations';
import api from '../../../../config/api';
import CommentItem from '../../../../compenents/parts/CommentItem';

export default function TComments({ courseId, language }) {
  const stars = [1, 2, 3, 4, 5];
  const [ratting, setRatting] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    handleGetComments();
  }, []);

  const handleGetComments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/comments?course_id="+courseId);
      console.log(response.data);
      
      if(response.status == 200){
        setLoading(false);
        setData(response.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePostComment = async () => {
    setMsg("");
    try {
      if(comment === ""){
        setMsg(language['error_validation_msg'])
        return false;
      }
      const token = window.localStorage.getItem("rJp7E3Qi7r172VD");
      const formData = new FormData();
      formData.append("course_id", courseId);
      formData.append("text", comment);
      
      const response = await fetch("https://fep.misk-donate.com/api/comments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
        
      if(response.status == 200){
        setOpen(false);
        setComment("");
        setRatting(0);
        handleGetComments();
      } else {
        setMsg(language['error'])
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            
            {msg && <div className="p-4 m-2">{msg}</div>}

            <div className="flex justify-between w-full">
              <button className="block mx-auto rounded pointer mt-7 m-2 py-3 px-7 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" onClick={() => setOpen(false)}>{language && language["cancel"]}</button>
              <button disabled={loading} onClick={handlePostComment} className="block mx-auto rounded pointer mt-7 m-2 py-3 px-7 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["add"]}</button>
            </div>
          </div>
        </div>
      </div>
    </div>}

    {data && data.map(item => <CommentItem key={"c-"+item.id} language={language} item={item} />)}

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
