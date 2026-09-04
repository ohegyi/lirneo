import { StrictMode } from 'react'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'
import { AuthProvider } from './lib/authProvider.js'
import Layout from './Layout.jsx';
import SignIn from './signIn.jsx'
import Home from './Home.jsx'
import TutorSetup from './tutorSetup.jsx'
import ReactDOM from 'react-dom/client';
import TutorRequestNotifications from './tutorRequestNotifications.jsx'
import NewCalendar from './newCalendar.jsx'
import Calendar from './calendar.jsx'
import ListSchedule from './listSchedule.jsx'
import AdminSchedule from './adminSchedule.jsx'
import TutorDash from './tutorDash.jsx'
import TutorInvite from './tutorInvite.jsx'
import Profile from './profile.jsx'
import TutoringRequest from './tutoringRequest.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './lib/protectedRoute.jsx';
import { Notifications } from '@mantine/notifications';
import MyProfile from './myProfile.jsx';
import StudentDash from './studentDash.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<SignIn />
  },{
    element: (
      <ProtectedRoute>
        <div style={{width:'100vw', position:'absolute', left:0}}>
        <Layout />
        </div>
      </ProtectedRoute>
    ),
    children: [
      {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/tutorSetup",
    element: <TutorSetup />,
  },
  {
    path: "/tutorRequestNotifications",
    element: <TutorRequestNotifications />,
  },
  {
    path:'/studentDash',
    element: <StudentDash/>
  },
  {
    path: "/newCalendar",
    element: <NewCalendar />,
  },
  {
    path: "/Calendar",
    element: <Calendar />,
  },
  {
    path: "/listSchedule",
    element: <ListSchedule />,
  },
  {
    path: "/adminSchedule",
    element: <AdminSchedule />,
  },
  {
    path: "/tutorDash",
    element: <TutorDash />,
  },
  {
    path: "/tutorInvite",
    element: <TutorInvite />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/tutoringRequest",
    element: <TutoringRequest />,
  },
  {
    path: "/myProfile",
    element: <MyProfile />,
  },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider>
        <Notifications />
      <RouterProvider router={router} />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>
);