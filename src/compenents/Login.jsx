import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import api from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [msg, setMsg] = React.useState(null);
    const [passwordType, setPasswordType] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);
        setLoading(true);
        if (e.target.email.value == "" && e.target.password.value == "") {
            setMsg("Please enter your eamil and password.");
            setLoading(false);
        } else if (!e.target.email.value.includes("@") || !e.target.email.value.includes(".")) {
            setMsg("Please enter a valid email.");
            setLoading(false);
        } else {
            try {
                const response = await api.post("/login", formData);
                console.log(response);

                if (response.status == 200 || response.status == 201) {
                    if (response.data.user.status == "active") {
                        localStorage.setItem("auth_token", response.data.token);
                        localStorage.setItem("auth_user", response.data.user.id);
                        setLoading(false);
                        navigate('/');
                    } else {
                        setLoading(false);
                        setMsg("Wrong email or password");
                    }
                } else {
                    setMsg("Wrong email or password..");
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                setMsg("Something went wrong");
            }
        }
    }
    return (
        <div className="flex w-[90%] mx-auto">
            <div className="block w-[50%] h-[100vh] bg-white">
                <img src="/logo/Logo.png" alt="" className="block mx-auto w-[45%] mt-14 " />

                <h3 className="text-3xl mx-auto block text-center m-4 my-14">FEP Dashboard</h3>

                <form method="post" onSubmit={handleLogin}>
                    <div className="relative h-11 mx-auto w-[45%] mb-7">
                        <input
                            className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                            placeholder=" "
                            type="email"
                            name="email" 
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            E-mail
                        </label>
                    </div>
                    <div className="relative h-11 mx-auto w-[45%] mb-7">
                        <input
                            className="peer h-full w-full border-b border-[#FD9800] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#FD9800] outline outline-0 transition-all placeholder-shown:border-[#FD9800] focus:border-[#FD9800] focus:outline-0 disabled:border-0 disabled:bg-[#757575]"
                            placeholder=" "
                            type={passwordType ? "password"  : "text"}
                            name="password" 
                        />
                        <button type="button" className="absolute right-0 m-2 cursor-pointer " onClick={() => setPasswordType(!passwordType)}>
                            <FontAwesomeIcon icon={passwordType ? faAngleDown : faAngleUp} className="text-color" />
                        </button>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#FD9800] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#FD9800] peer-focus:after:scale-x-100 peer-focus:after:border-[#FD9800] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                    </div>

                    {msg && <div className="p-4 m-2 text-center">
                        {msg}
                    </div>}

                    <button className="rounded-xl pointer m-2 py-4 px-28 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto cursor-pointer text-white flex">{loading && <img className="animate-spin w-4 m-1" src="/loading_white.png" />} <span>Login</span></button>
                </form>
            </div>
            <div className="w-[50%]">
                <img src="/banner/banner.webp" className="w-full h-[100vh]" />
            </div>
        </div>
    )
}
