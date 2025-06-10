import React from 'react'
import { Link } from 'react-router-dom';

import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import { translation } from '../../../config/translations';

export default function WebContent({}) {
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

  const list = [
    {
      id: 1,
      title: "about",
    },
    {
      id: 3,
      title: "tos",
    },
    {
      id: 4,
      title: "privacy_policy",
    },
    {
      id: 5,
      title: "support",
    },
  ];

  return (<ThemeContainer role="admin">
    <div className="block mx-auto w-[75%]">
      {list && list.map(item => <Link key={"content-"+item.id} to={'/dashboard/edit-content/' + item.id} className='block hover:bg-gray-100 hover:border hover:border-gray-200 rounded-xl bg-white p-5 my-2 text-sm'>{language && language[item.title]}</Link>)}
    </div>
  </ThemeContainer>)
}