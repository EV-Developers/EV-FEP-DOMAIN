import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { translation } from '../../../../config/translations';
import ThemeContainer from '../../../../compenents/parts/ThemeContainer';


export default function Quizzes() {
  const { courseId, lessonId } = useParams();

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

  const quzzes_list = [
    {
      id: "quiz-1",
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      question_type: "One choice",
      answers: [
        {
          id: 'ans-1',
          answer: 'Yes',
          correct: false
        },
        {
          id: 'ans-2',
          answer: 'No',
          correct: true
        },
      ]
    },
    {
      id: "quiz-2",
      question: "Expedita nam alias praesentium soluta porro maxime asperiores sapiente recusandae illum molestiae inventore?",
      question_type: "Multi choice",
      answers: [
        {
          id: 'ans2-1',
          answer: 'Yes',
          correct: false
        },
        {
          id: 'ans2-1',
          answer: 'Maybe',
          correct: true
        },
        {
          id: 'ans2-2',
          answer: 'No',
          correct: true
        },
      ]
    }
  ]

  const handleDelete = async (quizzId) => {
    const r = window.confirm("Are you sure?");

    if (r) {
      const response = await api.delete('/quizzes/' + quizzId);
      console.log(response);
      if (response.status == 200) {
        navigate("/quizzes/" + lessonId)
      } else {
        console.log('error');
      }
    }
  }

  return (<ThemeContainer>
    <div className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
      <div className="flex justify-between">
        <div></div>
        <Link to={`/quizzes/${courseId}/${lessonId}/new-quiz`} className="block rounded pointer m-4 py-3 px-10 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 font-bold">{language && language["create"]}</Link>
      </div>
      <div className="flex">
        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" /> <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight:faAngleLeft} className="my-4 m-3 text-color" />
        <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link><FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight:faAngleLeft} className="my-4 m-3 text-color" />
        <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/" + courseId}>{language && language['course']}</Link>
        <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight:faAngleLeft} className="my-4 m-3 text-color" />
        <p className="m-3 my-3 text-color">{language && language["lessons_quizzes"]}</p>
      </div>
      {quzzes_list && quzzes_list.map(item => <div key={item.id} className="border-t border-t-gray-200 py-5">
        <p className="text-xl p-3 m-2 font-bold">{item.question}</p>
        {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["question_type"]}: {item.question_type}</p>}
        {item.answers && item.answers.length != 0 && <p className="text-sm p-3 m-2">{language && language["answers_list"]}:</p>}
        {item.answers && item.answers.map(answer => <div key={answer.id} className={`p-3 m-2 rounded-2xl ${answer.correct ? 'bg-green-200' : 'bg-white'}`}>{answer.answer}</div>)}
        <div className="flex justify-between">
          <Link to={`/quizzes/${courseId}/${lessonId}/${item.id}`} className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["edit"]}</Link>
          <button onClick={() => handleDelete(item.id)} className="block rounded text-sm pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language["delete"]}</button>
        </div>
      </div>)}
    </div>

  </ThemeContainer>)
}
