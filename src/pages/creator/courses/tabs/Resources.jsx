import React from 'react'
import { Link } from 'react-router-dom'
import { translation } from '../../../../config/translations';
import ConfrimModal from '../../../../compenents/parts/ConfrimModal';

export default function Resources({ resources_list }) {
  const [showModal, setShowModal] = React.useState(false);
  const [language, setLanguage] = React.useState(null);
  const [resourceId, setResourceId] = React.useState(null);

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

  const handleDelete = () => {
    console.log(resourceId);
    
  }

  return (
    <div>
      <div className="flex border-b border-gray-200">
        <Link to="/new-resource" className="block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 m-2">{language && language["upload_new"]}</Link>
      </div>

      {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}

      {resources_list && resources_list.map(item => <div className="border-b border-b-gray-200 p-4 ">
        <h2 className="font-bold text-xl py-2">{item.title}</h2>
        <p>{item.description}</p>
        <div className="flex">
          <button className="block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" onClick={() => {
            setResourceId(item.id);
            setShowModal(true);
          }}>{language && language["delete"]}</button>
          <a href={item.file} download={item.file} className='block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-3'>{language && language["download"]}</a>
        </div>
      </div>)}
    </div>
  )
}
