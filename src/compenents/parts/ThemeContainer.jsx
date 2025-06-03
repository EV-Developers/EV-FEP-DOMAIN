import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { useLocation, useRouteError } from 'react-router-dom';
import { check_auth } from '../../utils/check_auth';

export default function ThemeContainer({ children, role, customeClasses = "md:w-[90%]" }) {
  const { pathname } = useLocation();
  const routerError = useRouteError();

  React.useEffect(() => {    
    if(role != "" && (!pathname.includes('pages') && !pathname.includes('contact'))){
      if(!routerError || (routerError && routerError.status !== 404)){
        check_auth(role);
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, role]);

  return (<>
    <Header role={role} />
    <div className={`block ${customeClasses} mx-auto`}>
      {children}
    </div>
    <Footer role={role} />
  </>)
}
