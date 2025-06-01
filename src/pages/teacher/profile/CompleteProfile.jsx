import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';

export default function CompleteProfile() {
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

  return (<ThemeContainer role="teacher">
      <div>CompleteProfile</div>
  </ThemeContainer>)
}
