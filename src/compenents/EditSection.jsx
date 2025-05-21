import React, { useState } from 'react'
import ThemeContainer from './parts/ThemeContainer';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../config/api';

export default function EditSection() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    
    const navigate = useNavigate();
    const { courseId, sectionId } = useParams();

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const response = await api.get('/lessons/'+sectionId);
        console.log(response);
        if (response.status == 200) {
            setData(response.data);
        } else {
            console.log('error');
            
        }
    }
   
    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.target);
        formData.append("lesson_cover_image", "2");

        if (e.target.name.value != "" && e.target.description.value != "") {
            const response = await api.put("/lessons/"+sectionId, formData);

            console.log(response);

            if (response.status == 200) {
                navigate('/courses/'+courseId);
            } else {
                setMsg("Something went wrong");
            }
        } else {
            setMsg("Please enter all required feilds.")
        }
    }

    return (<ThemeContainer>
        {data && <form method="post" encType="multipart/form-data" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]" onSubmit={handleUpdate}>
            <label htmlFor="sectionTitle">
                <p id="sectionTitle" className="my-3 font-bold">Section Title</p>
                <input type="text" id="sectionTitle" name="title" placeholder="Write here" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" defaultValue={data.title} />
            </label>

            <p className="my-3 font-bold">Content Section</p>
            <textarea id="addSection" name="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Add section" >{data.description}</textarea>

            <label htmlFor="uploadVideo" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color mb-14">
                <div className="text-center">
                    <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                    <p className="text-l font-bold">Upload A Video</p>
                    <p className="text-sm text-gray-400">Drag and drop</p>
                </div>
                <input type="file" id="uploadVideo" name="video_path" className="hidden" />
            </label>

            <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color mb-14">
                <div className="text-center">
                    <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                    <p className="text-l font-bold">Upload A Video Cover</p>
                    <p className="text-sm text-gray-400">Drag and drop</p>
                </div>
                <input type="file" id="uploadImage" name="lesson_cover_image" className="hidden " />
            </label>
            
            {msg && <div className="p-4 m-2">{msg}</div>}

            <div className="flex flex-row justify-between">
                <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">Update</button>
            </div>
        </form>}
    </ThemeContainer>)
}
