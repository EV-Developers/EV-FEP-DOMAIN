import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'react-router-dom';
import { check_auth } from '../../config/check_auth';

export default function ThemeContainer({ children, role, customeClasses = "md:w-[90%]" }) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    console.log(role);

    if (role && role != '') {
      check_auth(role);
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (<>
    <Header role={role} />
    <div className={`block ${customeClasses} mx-auto`}>
      {children}
    </div>
    <Footer role={role} />
  </>)
}
