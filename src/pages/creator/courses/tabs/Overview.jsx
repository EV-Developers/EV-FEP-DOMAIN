import { faGlobe, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { translation } from '../../../../config/translations';

export default function Overview({ courseId }) {
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

  return (
    <div className="p-5">
      <div className="mb-14">
        <div className="flex py-4">
          <FontAwesomeIcon icon={faRefresh} className="mx-3 text-color" />
          <p className="mx-3 text-color">{["last_updated"]} August 2024</p>
        </div>
        <div className="flex py-4">
          <FontAwesomeIcon icon={faGlobe} className="mx-3 text-color" />
          <p className="mx-3 text-color">English</p>
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className="w-[25%]">
          <div className="mt-4"><span className="text-color">{language && language["skill_level"]}:</span> <span className="mx-3 text-color">Beginner Level</span></div>
          <div><span className="text-color">{language && language["language"]}:</span><span className="mx-3 text-color">English</span></div>
        </div>
        <div className={`${language && language["dir"] == 'ltr' ? 'border-l border-l-gray-200' : 'border-r border-r-gray-200'} p-4 mb-14`}>
          <p className="text-color">{language && language["videos"]}:  35</p>
          <p className="text-color">{language && language["time"]}:  3 {language && language['total_hours']}</p>
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className="w-[15%] text-color">{language && language["description"]}</div>
        <div className="text-color">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id non, animi magnam odio eius nulla distinctio, recusandae vero dolorum dicta dolorem rem magni, quasi omnis vel ipsam. Nemo, error nam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam minima quas voluptate delectus laudantium nostrum excepturi pariatur reiciendis ipsa eveniet cupiditate distinctio sed neque autem rerum asperiores, facere hic laborum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus, vero repudiandae qui aut cupiditate facilis delectus odit culpa corrupti voluptatem eveniet consectetur, recusandae dignissimos aliquam accusamus id quos vitae.</p>
        </div>
      </div>
    </div>
  )
}
