import { faCalendar, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function TCertificate({language, handleCourseCertificateDownload}) {

    return (
        <div className="p-5">
            <div className="mb-14">
                <div className="flex py-4">
                    <FontAwesomeIcon icon={faCalendar} className="mx-3 text-color" />
                    <p className="mx-3 text-color">{language && language["date"]} August 2024</p>
                </div>
                <button onClick={handleCourseCertificateDownload}  className="flex py-4 group">
                    <FontAwesomeIcon icon={faDownload} className="mx-3 text-gray-500 group-hover:text-[#fa9600]" />
                    <p className="text-gray-500 mx-3 cursor-pointer group-hover:text-[#fa9600]">Dowload</p>
                </button>
            </div>
        </div>
    )
}
