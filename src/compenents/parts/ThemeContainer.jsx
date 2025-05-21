import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function ThemeContainer({ children }) {
  return (<>
    <Header />
    <div className="block md:w-[90%] mx-auto">
        {children}
    </div>
    <Footer />
  </>)
}
