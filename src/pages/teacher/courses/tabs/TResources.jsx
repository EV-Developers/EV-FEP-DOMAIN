import React from 'react'
import { translation } from '../../../../config/translations';

export default function TResources({ resources_list }) {
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


  return (<div>
    {resources_list && resources_list.map(item => <div className="border-b border-b-gray-200 p-4 ">
      <h4 className="text-l font-bold">{item.title}</h4>
      <p>{item.description}</p>
      <button className="block rounded pointer my-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer">{language && language['download']}</button>
    </div>)}
  </div>
  )
}
