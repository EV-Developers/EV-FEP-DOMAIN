import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import CourseDetails from './steps/CourseDetails';
import CourseOverview from './steps/CourseOverview';
import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';

export default function AddCourse() {
    const [step, setStep] = React.useState(1);
    const [categories, setCategories] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [categoryId, setCategoryId] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [featuredImage, setFeaturedImage] = React.useState(null);
    const [levelNewName, setLevelNewName] = React.useState('');
    const [categoryName, setCategoryName] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();

    const [language, setLanguage] = React.useState(null);

    React.useEffect(() => {
        const lang = window.localStorage.getItem("language");

        if (lang && lang != '' && lang != null) {
            if (lang == 'english') {
                setLanguage(translation[0]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
            } else {
                setLanguage(translation[1]);
                window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            }
        } else {
            setLanguage(translation[0]);
            window.localStorage.setItem("language", 'english');
            window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }

    }, []);

    const handleCreateCourse = async () => {
        setMsg(null);
        setLoading(true);
        const auth_user = window.localStorage.getItem("auth_user");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", categoryId);
        formData.append("is_public", "true")
        formData.append("level", level)
        formData.append("difficulty_level", 1);
        formData.append("max_students", 0);
        formData.append("createdBy", auth_user);
        if(featuredImage && featuredImage[0]){
            formData.append("featured_image", featuredImage[0], featuredImage[0].name);
        }


        if (title != "" && description != "" && categoryId != "" && level != "") {
            try {
                const response = await api.post("/courses", formData);

                console.log(response);

                if (response.status == 200 || response.status == 201) {
                    setLoading(false)
                    navigate('/courses');
                } else {
                    setLoading(false);
                    setMsg(language["error_msg"]);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
                setMsg(language["error_msg"]);
            }
        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
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
        loadCategoriesData();
    }, [categoryId]);

    const loadCategoriesData = async () => {
        console.log(categoryId);
        
        const tmpCategoriesData = await api.get('/course-categories');
        if (tmpCategoriesData.status == 200) {
            setCategories(tmpCategoriesData.data);
        }
    }

    /*
    const handleSubmit = async () => {
        //e.preventDefault();
        const auth_user = window.localStorage.getItem("auth_user");
        
        if(title == "" || description == ""){
            setMsg(language["error_validation_msg"]);

            return false;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", categoryId);
        formData.append("is_public", "true")
        formData.append("level", level)
        formData.append("difficulty_level", level);
        formData.append("max_students", '0');
        if(featuredImage && featuredImage[0]){
            formData.append("featured_image", featuredImage[0]);
        }
        formData.append("createdBy", auth_user);

        const response = await api.post("/courses", formData);

        console.log(response);

        if (response.status == 200 || response.status == 201) {
            navigate('/courses');
        } else {
            setMsg(language["error_msg"]);
        }
    }
    */

    return (
        <ThemeContainer>
            {/* <form post="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="file" name="featured_image" />
                
                <button type="submit">Add</button>
            </form> */}
            <div className="block mx-auto w-[75%] rounded-xl m-5 bg-white p-5">
                <div className="flex">
                    <Link to="/courses">
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses"}>{language && language["courses"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["new"]}</p>
                </div>
                <hr className="text-gray-200 my-5" />
                {step == 1 && <CourseDetails handleSteps={handleSteps} title={title} setTitle={setTitle} categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} categoryName={categoryName} setCategoryName={setCategoryName} levelNewName={levelNewName} setLevelNewName={setLevelNewName} level={level} setLevel={setLevel} />}
                {/* {step == 2 && <CourseGrades levelNewName={levelNewName} setLevelNewName={setLevelNewName} handleSteps={handleSteps} level={level} setLevel={setLevel} />} */}
                {step == 2 && <CourseOverview handleSteps={handleSteps} description={description} setDescription={setDescription} setFeaturedImage={setFeaturedImage} featuredImage={featuredImage} handleCreateCourse={handleCreateCourse} msg={msg} loading={loading} />}
            </div>
        </ThemeContainer>
    )
}
