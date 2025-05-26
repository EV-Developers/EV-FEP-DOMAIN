import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'react-router-dom';

export default function ThemeContainer({ children, role }) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (<>
    <Header role={role} />
    <div className="block md:w-[90%] mx-auto">
        {children}
    </div>
    <Footer />
  </>)
}
