import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeContainer from './parts/ThemeContainer';
import api from '../config/api';

export default function CategoryDetails() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const { catId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const response = await api.get('/course-categories/'+catId);
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
        console.log(e.target);
        

        const formData = new FormData(e.target);

        if (e.target.description.value != "" && e.target.name.value != "" ) {
            const response = await api.put("/course-categories/"+catId, formData);

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

    const handleDelete = async () => {
        const r = window.confirm("Are you sure?");

        if(r){
            const response = await api.delete('/course-categories/'+catId);
            console.log(response);
            if (response.status == 200) {
                navigate('/categories')
            } else {
                console.log('error');
            }
        }
    }

    return (
        <ThemeContainer>
            {data && <form method="post" onSubmit={handleUpdate} className="block mx-auto w-[75%] bg-white rounded-xl p-4">
                <div>
                    <label htmlFor="title">
                        <p id="title" className="my-3 font-bold">Title</p>
                        <input type="text" id="title" name="name" defaultValue={data.name} placeholder="Write name" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>
                    <label htmlFor="description">
                        <p className="my-3 font-bold">Description</p>
                        <textarea name="description" id="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Category description" >{data.description}</textarea>
                    </label>   
                </div>

                {msg && <div className="p-4 m-2">{msg}</div>}

                <div className="flex flex-row justify-between mt-14">
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">Update</button>
                    <button onClick={handleDelete} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="button">Delete</button>
                </div>
            </form>}
        </ThemeContainer>

    )
}
