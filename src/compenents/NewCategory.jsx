import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import ThemeContainer from './parts/ThemeContainer';

export default function NewCategory() {
    const [description, setDescription] = React.useState("");
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setMsg(null);

        const formData = new FormData(e.target);

        if (e.target.description.value != "" && e.target.name.value != "" ) {
            const response = await api.post("/course-categories", formData);

            console.log(response);

            if (response.status == 200) {
                navigate('/categories');
            } else {
                setMsg("Something went wrong");
            }
        } else {
            setMsg("Please enter all required feilds.")
        }

    }

    return (<ThemeContainer>
        <form method="post" onSubmit={handleAddCategory} className="w-[75%] bg-white mx-auto p-5 rounded-2xl mt-4">
            <label htmlFor="title">
                <p id="title" className="my-3 font-bold">Title</p>
                <input type="text" id="title" name="name" placeholder="Write category name" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>

            <label htmlFor="description">
                <p className="my-3 font-bold">Description</p>
                <textarea value={description} name="description" onChange={val => setDescription(val.target.value)} id="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Category description" ></textarea>
            </label>

            {msg && <div className="p-4 m-2">{msg}</div>}

            <div className="flex flex-row justify-between mt-8">
                <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Add</button>
            </div>
        </form>
    </ThemeContainer>)
}
