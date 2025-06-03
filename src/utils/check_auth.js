export const check_auth = (role) => {
    const user_role = window.localStorage.getItem("z8C2XXEo52uJQj7");
    let tmpRole = "";

    switch (user_role) {
        case 'content_creator':
            tmpRole = null;
        break;
        case 'teacher':
            tmpRole = 'teachers';
        break;
        case 'student':
            tmpRole = 'students';
        break;
        case 'admin':
            tmpRole = 'admin';
        break;

        default:
            tmpRole = user_role;
        break;
    }

    console.log(tmpRole, role);

    if(tmpRole != '' && tmpRole != role){
        console.log('not authurized..');
        
        window.location.href = '/';
    }
}