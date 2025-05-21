import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeContainer from './parts/ThemeContainer';
import api from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Material() {
    const [data, setData] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const { catId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const response = await api.get('/materials/' + catId);
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

        if (e.target.description.value != "" && e.target.name.value != "") {
            const response = await api.put("/materials/" + catId, formData);

            console.log(response);


            if (response.status == 200) {
                navigate('/materials');
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
            const response = await api.delete('/materials/' + catId);
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
            {data }<form method="post" onSubmit={handleUpdate} className="block mx-auto w-[75%] bg-white rounded-xl p-4">
                <label htmlFor="courseOverview">
                    <p className="my-3 font-bold">Material title</p>
                    <textarea id="courseOverview" name="course-overview" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400 " placeholder="Write here" ></textarea>
                </label>
                <label htmlFor="uploadImage" className="p-14 h-[300px] w-full flex items-center justify-center my-4 rounded-xl bg-color border border-color">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faArrowUp} className="text-3xl rounded-xl bg-gradient-to-b from-[#fa9600] to-[#ffe696] p-3 px-4 text-gray-100" />
                        <p className="text-l font-bold">Upload Material</p>
                        <p className="text-sm text-gray-400">Drag and drop</p>
                    </div>
                    <input type="file" accept="image/jpg,image/png" id="file" name="file" className="hidden " />
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
