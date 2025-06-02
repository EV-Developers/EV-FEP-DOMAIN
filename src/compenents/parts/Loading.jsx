import React from 'react'

export default function Loading() {
  return (<div className="flex items-center justify-between w-full h-full fixed z-50 bg-white">
    <img src="/logo/course-logo.png" className="animate-spin block mx-auto w-[5%]" alt="" />
  </div>)
}
