import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");
        
        if(userRole && userRole != "" && userRole != null){
            if(userRole == 'teacher'){
                navigate('/teachers');
            } else if(userRole == 'content_creator') {
                navigate('/creators');
            } else if(userRole == 'adminstrator') {
                navigate('/dashboard');
            } else {
                navigate('/students');
            }
        } else {
            navigate('/login');
        }
    }, []);

  return (
    <div>.</div>
  )
}
