import React from 'react'
import { faGlobe, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { translation } from '../../../../config/translations';

export default function TOverview({ data, language, totalMinutes }) {

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="flex py-4">
          <FontAwesomeIcon icon={faRefresh} className="mx-3 text-color" />
          <p className="mx-3 text-color">
            {language && language["last_updated"]}: {data && new Date(data.updated_at).toLocaleDateString('en-GB')}

          </p>
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className={`p-4 mb-4`}>
          <p className="text-color">{language && language["videos"]}:  {data && data.lessons.length}</p>
          {/* <p className="text-color">{language && language["time"]}:  {totalMinutes && totalMinutes} {language && language['total_hours']}</p> */}
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className="w-[15%] text-color">{language && language["description"]}</div>
        <div className="text-color">
          <p>{data && data.description}</p>
        </div>
      </div>
    </div>
  )
}
