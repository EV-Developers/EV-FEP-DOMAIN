import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import api from '../config/api';

export default function Login() {
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);

        if (e.target.email.value == "" && e.target.password.value == ""){
            setMsg("Please enter your eamil and password.");
        } else if(!e.target.email.value.includes("@") || !e.target.email.value.includes(".")) {
            setMsg("Please enter a valid email.");
        } else {
            try {
                const response = await api.post("/login", formData);
                console.log(response);

                if (response.status == 200 || response.status == 201) {
                    if(response.data.user.status == "active"){
                        localStorage.setItem("auth_token", response.data.token);
                        localStorage.setItem("auth_user", response.data.user.id);
                        navigate('/');
                    } else {
                        setMsg("Wrong email or password");
                    }
                } else {
                    setMsg("Wrong email or password..");
                }
            } catch (error) {
                console.log(error);
                setMsg("Something went wrong");
            }
        }
    }
    return (
        <div className="flex w-[90%] mx-auto">
            <div className="w-[50%] h-full">
                <img src="/logo/Logo.png" alt="" className="block mx-auto w-[45%] mt-14 " />
                <h3 className="text-2xl mx-auto block text-center m-4">FEP Dashboard</h3>

                <form method="post" onSubmit={handleLogin}>
                    <input type="email" name="email" className="rounded-xl p-4 border border-gray-200 bg-white block mx-auto w-[45%] my-4" placeholder="E-mail" />
                    <input type="password" name="password" className="rounded-xl p-4 border border-gray-200 bg-white block mx-auto w-[45%] mb-7" placeholder="Password" />

                    {msg && <div className="p-4 m-2">
                        {msg}
                    </div>}

                    <button className="block rounded-xl pointer m-2 py-4 px-28 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto cursor-pointer">Login</button>
                </form>

            </div>
            <div className="w-[50%]">
                <img src="/banner/banner.webp" className="w-full h-full" />
            </div>
        </div>
    )
}
