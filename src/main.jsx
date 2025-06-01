import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ContactPage from './pages/ContactPage';
import Home from './pages/creator/Home';
import Courses from './pages/creator/courses/Courses';
import Course from './pages/creator/courses/Course';
import AddCourse from './pages/creator/courses/AddCourse';
import AddAssesement from './pages/creator/courses/AddAssesement';
import EditAssesement from './pages/creator/courses/EditAssesement';
import EditCourse from './pages/creator/courses/EditCourse';
import Quizzes from './pages/creator/courses/quizzes/Quizzes';
import NewQuiz from './pages/creator/courses/quizzes/NewQuiz';
import EditQuiz from './pages/creator/courses/quizzes/EditQuiz';
import AddLesson from './pages/creator/courses/AddLesson';
import EditLesson from './pages/creator/courses/EditLesson';
import AddResourses from './pages/creator/courses/AddResourses';
import Materials from './pages/creator/Materials/Materials';
import Material from './pages/creator/Materials/Material';
import AddMaterial from './pages/creator/Materials/AddMaterial';
import Categories from './pages/creator/Categories/Categories';
import CategoryDetails from './pages/creator/Categories/CategoryDetails';
import NewCategory from './pages/creator/Categories/NewCategory';
import Search from './pages/creator/Search';
import Games from './pages/creator/Games/Games';
import AddGame from './pages/creator/Games/AddGame';
import GameDetails from './pages/creator/Games/GameDetails';
import PagesContent from './pages/PagesContent';
import THome from './pages/teacher/THome';
import SignUp from './pages/SignUp';
//Teachers
import TCourses from './pages/teacher/courses/TCourses';
import TCourse from './pages/teacher/courses/TCourse';
import Exam from './pages/teacher/courses/quizzes/Exam';
import TLessonDetails from './pages/teacher/courses/TLessonDetails';
import TCategories from './pages/teacher/categories/Tcategories';
import TCategoryDetails from './pages/teacher/categories/TCategoryDetails';
import TMaterials from './pages/teacher/Materials/TMaterials';
import TGames from './pages/teacher/Games/TGames';
import SHome from './pages/students/SHome';
import AHome from './pages/admin/AHome';
import CertificatesGenerator from './pages/teacher/Certificates/CertificatesGenerator';
import SubmitAssesment from './pages/teacher/courses/SubmitAssesment';

const router = createBrowserRouter([
  // Creators
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: "/contact",
    element: <ContactPage />
  },
  {
    path: "/creators",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <Course />,
  },
  {
    path: "/new-course",
    element: <AddCourse />,
  },
  {
    path: "/courses/edit/:courseId",
    element: <EditCourse />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/:catId",
    element: <CategoryDetails />,
  },
  {
    path: "/materials",
    element: <Materials />,
  },
  {
    path: "/materials/:item",
    element: <Material />,
  },
  {
    path: "/add-material",
    element: <AddMaterial />
  },
  {
    path: "/add-lessons/:courseId",
    element: <AddLesson />,
  },
  {
    path: "/lessons/:lessonId",
    element: <EditLesson />,
  },
  {
    path: "/lessons/quizzes/:courseId/:lessonId",
    element: <Quizzes />,
  },
  {
    path: "/quizzes/:courseId/:lessonId/new-quiz",
    element: <NewQuiz />,
  },
  {
    path: "/quizzes/:courseId/:lessonId/:quizzId",
    element: <EditQuiz />,
  },
  {
    path: "/add-assesment/:courseId",
    element: <AddAssesement />
  },
  {
    path: "/edit-assesment/:courseId",
    element: <EditAssesement />,
  },
  {
    path: "/new-category",
    element: <NewCategory />
  },
  {
    path: "/add-material",
    element: <AddMaterial />
  },
  {
    path: '/search/:query',
    element: <Search />
  },
  {
    path: "/new-resource",
    element: <AddResourses />
  },
  {
    path: "/games",
    element: <Games />
  },
  {
    path: "/games/:gameId",
    element: <GameDetails />
  },
  {
    path: "/add-game",
    element: <AddGame />
  },
  // Gernal
  {
    path: "/pages/:pageName",
    element: <PagesContent />
  },
  // Teachers
  {
    path: "/teachers",
    element: <THome />
  },
  {
    path: "/teachers/courses",
    element: <TCourses />
  },
  {
    path: "/teachers/courses/:courseId",
    element: <TCourse />
  },
  {
    path: "/teachers/courses/lesson/:lessonId",
    element: <TLessonDetails />,
  },
  {
    path: "/teachers/courses/quiz/:lessonId",
    element: <Exam />,
  },
  {
    path: "/teachers/categories",
    element: <TCategories />,
  },
  {
    path: "/teachers/categories/:catId",
    element: <TCategoryDetails />,
  },
  {
    path: "/teachers/materials",
    element: <TMaterials />,
  },
  {
    path: "/teachers/games",
    element: <TGames />,
  },
  {
    path: "/teachers/generator/:courseId",
    element: <CertificatesGenerator />,
  },
  {
    path: "/teachers/submit-assesment/:courseId",
    element: <SubmitAssesment />
  },
  // Studetns
  {
    path: "/students",
    element: <SHome />,
  },


  // Admins
  {
    path: "/dashboard",
    element: <AHome />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);