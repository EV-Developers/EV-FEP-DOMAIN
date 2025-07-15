import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';
import ConfrimModal from '../../../../compenents/parts/ConfrimModal';
import api from '../../../../config/api';

export default function Quizzes() {
  const [language, setLanguage] = React.useState(null);
  const [quizzId, setQuizzId] = React.useState(null);
  const [lessonQuizzId, setLessonQuizzId] = React.useState(null);
  const [quizzList, setQuizzList] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (quizzId) {
      try {
        const response = await api.delete('/quizzes/' + quizzId.quiz_id + '/question/' + quizzId.id);

        if (response.status == 200) {
          window.location.reload();
        } else {
          //console.log('error');
        }
      } catch (error) {
        //console.log(error);
      }
    }
  }

  React.useEffect(() => {
    loadLessonQuzzies();
  }, []);

  const loadLessonQuzzies = async () => {
    try {
      const response = await api.get('/quizzes?lesson_id=' + lessonId);
      if (response.status == 200) {
        if (response.data && response.data.length != 0) {
          console.log(response.data[0].id);
          setQuizzList(response.data);
          setLessonQuizzId(response.data[0].id);
        }
      } else {
        //console.log('error');
      }
    } catch (error) {
      //console.log(error);
    }

  }

  return (<ThemeContainer>
    {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}
    <div className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
      <div className="flex justify-between">
        <div></div>
        <Link to={lessonQuizzId ? `/quizzes/${courseId}/${lessonId}/${lessonQuizzId}/0` : `/quizzes/${courseId}/${lessonId}/new-quiz`} className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["create"]}</Link>
      </div>
      <div className="flex">
        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" /> <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
        <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link><FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
        <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + courseId}>{language && language['course']}</Link>
        <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
        <p className="m-3 my-3 text-color">{language && language["lessons_quizzes"]}</p>
      </div>
      {quizzList && quizzList.map(quiz => quiz.questions && quiz.questions.map(item => <div key={item.id} className="border-t border-t-gray-200 py-5">
        {item.question_image && <img src={"https://fep.misk-donate.com/storage/"+item.question_image} className="w-[45%]" />}
        <p className="text-xl p-3 m-2 font-bold">{item.question_text}</p>
        {<p className="text-sm p-3 m-2">{language && language["mark"]}: {item.mark}</p>}

        {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["question_type"]}: {language && language[item.question_type]}</p>}
        {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["answers_list"]}:</p>}
        {item.answers && item.answers.map(answer => <div key={answer.id} className={`p-3 m-2 rounded-2xl ${answer.is_correct ? 'bg-green-200' : 'bg-white'} ${answer.answer_image ? 'inline-block w-[25%]':'block'}`}>
          {answer.answer_image && <img src={"https://fep.misk-donate.com/storage/"+answer.answer_image} className="w-full" />}
          <p className={`p-3 m-2  ${answer.answer_image ? 'text-xs text-center' : 'text-sm'}`}>{answer.answer_text}</p>
        </div>)}
        <div className="flex justify-between">
          <Link to={`/quizzes/${courseId}/${lessonId}/${quiz.id}/${item.id}`} className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["edit"]}</Link>
          <button onClick={() => {
            setShowModal(true);
            setQuizzId({
              id: item.id,
              quiz_id: quiz.id
            });
          }} className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["delete"]}</button>
        </div>
      </div>))}
    </div>

  </ThemeContainer>)
}
