import { faGlobe, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Overview() {
  
  return (
    <div className="p-5">
      <div className="mb-14">
        <div className="flex py-4">
          <FontAwesomeIcon icon={faRefresh} className="mx-3 text-color" />
          <p className="mx-3 text-color">Last Updated August 2024</p>
        </div>
        <div className="flex py-4">
          <FontAwesomeIcon icon={faGlobe} className="mx-3 text-color" />
          <p className="mx-3 text-color">English</p>
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className="w-[25%]">
          <div className="mt-4"><span className="text-color">Skill Level:</span> <span className="mx-3 text-color">Beginner Level</span></div>
          <div><span className="text-color">Students Enrolled:</span><span className="mx-3 text-color">59170</span></div>
          <div><span className="text-color">Language:</span><span className="mx-3 text-color">English</span></div>
        </div>
        <div className="border-l border-l-gray-200 p-4 mb-14">
          <p className="text-color">Videos:  35</p>
          <p className="text-color">Time:  3 total hours</p>
        </div>
      </div>
      <div className="flex py-7 border-t border-t-gray-200">
        <div className="w-[15%] text-color">Description</div>
        <div className="text-color">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id non, animi magnam odio eius nulla distinctio, recusandae vero dolorum dicta dolorem rem magni, quasi omnis vel ipsam. Nemo, error nam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam minima quas voluptate delectus laudantium nostrum excepturi pariatur reiciendis ipsa eveniet cupiditate distinctio sed neque autem rerum asperiores, facere hic laborum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus, vero repudiandae qui aut cupiditate facilis delectus odit culpa corrupti voluptatem eveniet consectetur, recusandae dignissimos aliquam accusamus id quos vitae.</p>
        </div>
      </div>
    </div>
  )
}
