import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AddSection from './compenents/AddSection';
import AddMaterial from './compenents/AddMaterial';
import AddAssesement from './compenents/AddAssesement';
import Categories from './compenents/Categories';
import Materials from './compenents/Materials';
import Home from './compenents/Home';
import Courses from './compenents/courses/Courses';
import Course from './compenents/courses/Course';
import AddCourse from './compenents/courses/AddCourse';
import Quizzes from './compenents/quizzes/Quizzes';
import NewQuiz from './compenents/quizzes/NewQuiz';
import Search from './compenents/Search';
import NewCategory from './compenents/NewCategory';
import CategoryDetails from './compenents/CategoryDetails';
import EditSection from './compenents/EditSection';
import EditQuiz from './compenents/quizzes/EditQuiz';
import AddResourses from './compenents/AddResourses';
import EditCourse from './compenents/courses/EditCourse';
import EditAssesement from './compenents/EditAssesement';
import Material from './compenents/Material';
import Login from './compenents/login';
import Profile from './compenents/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:coursesId",
    element: <Course />,
  },
  {
    path: "/new-course",
    element: <AddCourse />,
  },
  {
    path: "/courses/edit/:coursesId",
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
    path: "/add-section/:coursesId",
    element: <AddSection />,
  },
  {
    path: "/sections/:sectionId",
    element: <EditSection />,
  },
  {
    path: "/quizzes/:lessonId",
    element: <Quizzes />,
  },
  {
    path: "/quizzes/:lessonId/new-quiz",
    element: <NewQuiz />,
  },
  {
    path: "/quizzes/:lessonId/:quizzId",
    element: <EditQuiz />,
  },
  {
    path: "/add-assesment/:coursesId",
    element: <AddAssesement />
  },
  {
    path: "/edit-assesment/:coursesId",
    element: <EditAssesement />,
  },
  {
    path: "new-category",
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
    path: "new-resource",
    element: <AddResourses />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
