import React from 'react'
import api from '../../config/api';

export default function UserProfile({ open, setOpen, language }) {
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [photo, setPhoto] = React.useState("/profile.jpeg");
    const [msg, setMsg] = React.useState(null);

    React.useEffect(() => {
        const tmpName = window.localStorage.getItem("VPHl3hMFGI8w9kq");
        const tmpEmail = window.localStorage.getItem("L5HiP7ZpOyuVnO4");

        console.log(tmpName, tmpEmail);

        setName(tmpName);
        setEmail(tmpEmail);
    }, []);

    const getUserProfile = async () => {
        // teacher/profile
        // student/profile
        const user_id = window.localStorage.getItem("DDOj9KHr51qW1xi");
        const userRole = window.localStorage.getItem("z8C2XXEo52uJQj7");

        try {
            const tmpData = await api.get(`/${userRole}/profile/`);

            if (tmpData.status == 200) {
                console.log(tmpData.data);
                setName(tmpData.data.name);
                setBio(tmpData.data.bio);
                setEmail(tmpData.data.email);
                setPhoto(tmpData.data.photo);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handlePhotoChange = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            const image = window.URL.createObjectURL(e.target.files[0])
            setPhoto(image);
        }
    }

    const handleUpdateUserProfile = (e) => {
        e.preventDefault();
        const authUser = window.localStorage.getItem("DDOj9KHr51qW1xi");
        const formData = new FormData(e.target);
        formData.append('user_id', authUser);
        const name = e.target.name.value;
        const bio = e.target.bio.value;
        const email = e.target.email.value;

        if (name == "" || bio == "" || email == "") {
            setMsg(language['error_validation_msg']);
            setLoading(false);
            return false;
        }
    }

    return (<div open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" onClick={() => setOpen(false)} />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <form method="post" onSubmit={handleUpdateUserProfile} className="bg-white mx-auto m-3 rounded-xl p-5 w-[45%]">
                    <label htmlFor="photo" className="block">
                        <img src={photo} className="rounded-full m-4 w-26 h-26 mx-auto block" />
                        <input type="file" id="photo" name="photo" className="hidden" onChange={handlePhotoChange} />
                    </label>
                    <label htmlFor="name">
                        <p id="name" className="my-3 font-bold">{language && language["name"]}</p>
                        <input type="text" id="name" name="name" placeholder={language && language["write_here"]} defaultValue={name} onChange={val => setName(val.target.value)} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>
                    <label htmlFor="bio">
                        <p id="bio" className="my-3 font-bold">{language && language["bio"]}</p>
                        <input type="text" id="bio" name="bio" defaultValue={bio} onChange={val => setBio(val.target.value)} placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>
                    <label htmlFor="email">
                        <p id="email" className="my-3 font-bold">{language && language["email"]}</p>
                        <input type="text" id="email" name="email" defaultValue={email} onChange={val => setEmail(val.target.value)} placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>

                    {msg && <div className="p-4 m-2 text-center">
                        {msg}
                    </div>}

                    <div className="flex justify-between w-full">
                        <button type="button" onClick={() => setOpen(false)} className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{language && language["cancel"]}</button>

                        <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}
