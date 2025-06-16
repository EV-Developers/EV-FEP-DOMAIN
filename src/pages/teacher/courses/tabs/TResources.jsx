import React from 'react'
import { translation } from '../../../../config/translations';
import ResourcesItem from '../../../../compenents/parts/ResourcesItem';

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
    {resources_list && resources_list.map(item => <ResourcesItem key={"res-" + item.id} item={item} language={language} />)}
  </div>
  )
}
