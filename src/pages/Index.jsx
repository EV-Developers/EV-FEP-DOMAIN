import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const userRole = window.localStorage.getItem("auth_user_role");
        
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
