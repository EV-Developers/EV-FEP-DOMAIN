export const check_auth = (role) => {
    let user_role = window.localStorage.getItem("z8C2XXEo52uJQj7");
    user_role == 'teacher' ? 'teachers' : role;
    console.log(user_role, role);

    if(role != "" && user_role != role){
        console.log('true');
        
        //window.location.href = '/';
    }
}