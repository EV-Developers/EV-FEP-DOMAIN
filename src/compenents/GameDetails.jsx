import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeContainer from './parts/ThemeContainer';
import api from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function GameDetails() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const { catId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const response = await api.get('/games/' + catId);
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

        if (e.target.description.value != "" && e.target.title.value != "") {
            const response = await api.put("/games/" + catId, formData);

            if (response.status == 200) {
                navigate('/games');
            } else {
                setMsg("Something went wrong");
            }
        } else {
            setMsg("Please enter all required feilds.")
        }

    }

    const handleDelete = async () => {
        const r = window.confirm("Are you sure?");

        if (r) {
            const response = await api.delete('/games/' + catId);
            console.log(response);
            if (response.status == 200) {
                navigate('/games')
            } else {
                console.log('error');
            }
        }
    }

    return (
        <ThemeContainer>
            {data }<form method="post" onSubmit={handleUpdate} className="block mx-auto w-[75%] bg-white rounded-xl p-4">
                <label htmlFor="title">
                    <p className="my-3 font-bold">Title</p>
                    <input id="title" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Write here" />
                </label>
                <label htmlFor="title">
                    <p className="my-3 font-bold">Description</p>
                    <textarea id="description" name="description" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Write here" ></textarea>
                </label>
                <label htmlFor="content">
                    <p className="my-3 font-bold">Content</p>
                    <textarea id="content" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Write here" ></textarea>
                </label>

                {msg && <div className="p-4 m-2">{msg}</div>}

                <div className="flex flex-row justify-between mt-14">
                    <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">Update</button>
                    <button onClick={handleDelete} className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="button">Delete</button>
                </div>
            </form>
        </ThemeContainer>

    )
}
