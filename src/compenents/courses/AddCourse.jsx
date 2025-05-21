import React, { useState } from 'react'
import ThemeContainer from '../parts/ThemeContainer';
import CourseDetails from './steps/CourseDetails';
import CourseOverview from './steps/CourseOverview';
import CourseGrades from './steps/CourseGrades';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';

export default function AddCourse() {
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [level, setLevel] = useState("1");
    const [createdBy, setCreatedBy] = useState("1");
    const [featuredImage, setFeaturedImage] = useState(null);
    const [levelNewName, setLevelNewName] = useState('');
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    const handleCreateCourse = async () => {
        setMsg(null);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", categoryId);
        formData.append("is_public", "true")
        formData.append("level", level)
        formData.append("difficulty_level", 1);
        formData.append("max_students", 0);
        formData.append("featured_image_url", featuredImage);
        //formData.append("intro_video_url", '');
        formData.append("createdBy", "2");

        console.log(featuredImage);
        //navigate('/courses');

        //return false;
        
        if (title != "" && description != "" && categoryId != "" && level != "" && createdBy != "") {
            try {
                const response = await api.post("/courses", formData);
                console.log(response);
                
                if(response.status == 200 || response.status == 201){
                     navigate('/courses');
                } else {
                    setMsg("Something went wrong");
                }
            } catch (error) {
                console.log(error);
                setMsg("Something went wrong");    
            }
        } else {
            setMsg("Please enter all required feilds.")
        }
    } 

    const handleSteps = (selected_step) => {
        let tmpStep = step;

        if (selected_step == 'next') {
            tmpStep += 1;
        } else {
            tmpStep = tmpStep == 0 ? 1 : tmpStep - 1;
        }

        setStep(tmpStep);
    }

    React.useEffect(() => {
        loadCategoriesData()
    }, [])

    const loadCategoriesData = async () => {
        const tmpCategoriesData = await api.get('/course-categories');
        if (tmpCategoriesData.status == 200) {

            setCategories(tmpCategoriesData.data);
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%] rounded-xl m-5 bg-white p-5">
                {step == 1 && <CourseDetails handleSteps={handleSteps} title={title} setTitle={setTitle} categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} />}
                {step == 2 && <CourseGrades levelNewName={levelNewName} setLevelNewName={setLevelNewName} handleSteps={handleSteps} level={level} setLevel={setLevel} />}
                {step == 3 && <CourseOverview handleSteps={handleSteps} description={description} setDescription={setDescription} setFeaturedImage={setFeaturedImage} featuredImage={featuredImage} handleCreateCourse={handleCreateCourse} msg={msg} />}
            </div>
        </ThemeContainer>
    )
}
