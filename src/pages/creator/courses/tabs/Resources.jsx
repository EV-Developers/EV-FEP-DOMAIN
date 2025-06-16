import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { translation } from '../../../../config/translations';
import ConfrimModal from '../../../../compenents/parts/ConfrimModal';
import api from '../../../../config/api';
import ResourcesItem from '../../../../compenents/parts/ResourcesItem';

export default function Resources({ data, resources_list, courseId }) {
  const [showModal, setShowModal] = React.useState(false);
  const [language, setLanguage] = React.useState(null);
  const [resourceId, setResourceId] = React.useState(null);
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
    try {
      const response = await api.delete('/resources/' + resourceId);
      if (response.status == 200) {
        window.location.reload();
      } else {
        //console.log('error');
      }
    } catch (error) {
      //console.log(error);
    }
  }

  return (<div>
    <div className="flex border-b border-gray-200">
      <Link to={"/new-resource/" + courseId} className="block rounded pointer my-3 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 m-4">{language && language["upload"]}</Link>
    </div>

    {showModal && <ConfrimModal message={language && language['confirm']} action={handleDelete} title={language && language['delete']} language={language} open={showModal} setOpen={setShowModal} />}

    {resources_list && resources_list.map(item => <ResourcesItem key={"res-" + item.id} item={item} language={language} setResourceId={setResourceId} setShowModal={setShowModal} role="creator" />)}
  </div>
  )
}
