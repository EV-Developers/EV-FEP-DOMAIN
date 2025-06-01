import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { translation } from '../../../config/translations';
import ThemeContainer from '../../../compenents/parts/ThemeContainer';
import api from '../../../config/api';
import CourseDetails from './steps/CourseDetails';
import CourseOverview from './steps/CourseOverview';

export default function EditCourse() {
    const [step, setStep] = React.useState(1);
    const [categories, setCategories] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [categoryId, setCategoryId] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [featuredImage, setFeaturedImage] = React.useState(null);
    const [levelNewName, setLevelNewName] = React.useState('');
    const [msg, setMsg] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [language, setLanguage] = React.useState(null);
    const { courseId } = useParams()
    const navigate = useNavigate();


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
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", categoryId);
        //formData.append("is_public", "true")
        formData.append("difficulty_level", level);
        //formData.append("max_students", 0);
        //formData.append("featured_image_url", featuredImage);
        //formData.append("intro_video_url", '');

        if (title != "" && description != "" && categoryId != "" && level != "") {
            const response = await api.put("/courses/" + courseId, formData);

            console.log(response);

            if (response.status == 200) {
                setLoading(false);
                navigate('/courses');
            } else {
                setLoading(false);
                setMsg(language['error_msg']);
            }
        } else {
            setLoading(false);
            setMsg(language["error_validation_msg"])
        }
    }

    /**
     * handleSteps is used to navigate between sectins
     * @param {string} selected_step step to the next section
     */
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
        loadData();
    }, [])

    const loadData = async () => {
        try {
            const tmpData = await api.get('/courses/' + courseId);
    
            console.log(tmpData);
    
            if (tmpData.status == 200) {
                setTitle(tmpData.data.title);
                setDescription(tmpData.data.description)
                setCategoryId(tmpData.data.categoryId)
                setLevel(tmpData.data.level)
                //setFeaturedImage(tmpData.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadCategoriesData = async () => {
        try {
            const tmpCategoriesData = await api.get('/course-categories');
            if (tmpCategoriesData.status == 200) {
                console.log(tmpCategoriesData.data);
    
                setCategories(tmpCategoriesData.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeContainer>
            <div className="block mx-auto w-[75%] rounded-xl m-5 bg-white p-5">
                <div className="flex">
                    <Link to={"/courses/"+courseId}>
                        <img src="/logo/course-logo.png" alt="" className="w-10 h-10 my-1" />
                    </Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight: faAngleLeft} className="my-4 m-3 text-color" />
                    <Link className="m-2 my-3 hover:text-[#4b4b4b]" to={"/courses/"+courseId}>{language && language["course"]}</Link>
                    <FontAwesomeIcon icon={language && language["dir"] == 'ltr' ? faAngleRight : faAngleLeft} className="my-4 m-3 text-color" />
                    <p className="m-3 my-3 text-color">{language && language["edit"]}</p>
                </div>
                <hr className="text-gray-200 my-5" />
                {step == 1 && <CourseDetails handleSteps={handleSteps} title={title} setTitle={setTitle} categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} levelNewName={levelNewName} setLevelNewName={setLevelNewName} level={level} setLevel={setLevel} />}
                {/* {step == 2 && <CourseGrades levelNewName={levelNewName} setLevelNewName={setLevelNewName} level={level} setLevel={setLevel} handleSteps={handleSteps} />} */}
                {step == 2 && <CourseOverview handleSteps={handleSteps} description={description} setDescription={setDescription} setFeaturedImage={setFeaturedImage} featuredImage={featuredImage} handleCreateCourse={handleCreateCourse} msg={msg} loading={loading} />}
            </div>
        </ThemeContainer>
    )
}
