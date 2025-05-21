import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './parts/Header';
import Sidebar from './parts/Sidebar';
import { faArrowUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from './parts/Footer';
import ThemeContainer from './parts/ThemeContainer';
import { useParams } from 'react-router-dom';
import api from '../config/api';

export default function EditAssesement() {
    const [show, setShow] = useState(false);
    const { coursesId } = useParams();

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const response = await api.get('/assignments/'+coursesId);
        console.log(response);
        if (response.status == 200) {
            setData(response.data);
        } else {
            console.log('error');
            
        }
    }

    const [attchmentType, setAttchmentType] = useState({
        id: 'file',
        title: 'Zip File',
    });

    const attachments_types = [
        {
            id: 'file',
            title: 'Zip File',
        },
        {
            id: 'git',
            title: 'Public Git Reposastory',
        },
        {
            id: 'other',
            title: 'Other',
        },
    ]


    const handleAddAssesement = async (e) => {
        e.preventDefault();
        setMsg(null);
        
        const formData = new FormData(e.target);

        //return false;

        if (e.target.title.value != "" && e.target.description.value != "") {
            const response = await api.put("/assignments/"+coursesId, formData);
            
            if (response.status == 200) {
                navigate('/courses/'+coursesId);
            } else {
                setMsg("Something went wrong");
            }
        } else {
            setMsg("Please enter all required feilds.")
        }
    }

    return (
        <ThemeContainer>
            <form method="post" encType="multipart/form-data" onSubmit={handleAddAssesement} className="w-[75%] block mx-auto rounded-xl m-5 bg-white p-5">
                <p className="my-3 font-bold">Choose Assesment/assesments type</p>
                <div className="relative">
                    <button className="flex justify-between font-bold bg-color py-2 px-5 mx-3 rounded-xl text-sm" onClick={() => setShow(!show)}><span>{attchmentType && attchmentType.title}</span> <FontAwesomeIcon icon={faCaretDown} /></button>
                    {show && <div className="bg-color block rounded-xl w-[25%] p-3 absolute z-10">
                        {attachments_types && attachments_types.map(item => <button onClick={() => setAttchmentType(item)} key={item.id} className={`block text-left font-bold rounded-xl w-full mb-3 p-3 ${attchmentType && attchmentType.id == item.id ? 'bg-gradient-to-br from-[#fa9600] to-[#ffe696] hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400' : 'bg-white'}`}>
                            {item.title}
                        </button>)}
                    </div>}
                </div>

                <label htmlFor="description" className="block mb-14">
                    <p className="my-3 font-bold">Description</p>
                    <input type="text" id="description" placeholder="Write something or add a link" className="py-2 px-14  rounded shodow-sm bg-gray-200 w-full placeholder-gray-400" />
                </label>

                <p className="my-3 font-bold">Assesment explenation video <span className="text-gray-600">(optional)</span></p>
                <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                        <p className="text-l font-bold">Upload Video</p>
                        <p className="text-sm text-gray-400">Drag and drop</p>
                    </div>
                    <input type="file" accept="image/jpg,image/png" id="uploadImage" name="uploadImage" className="hidden " />
                </label>

                <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto">Add</button>
            </form>
        </ThemeContainer>
    )
}
