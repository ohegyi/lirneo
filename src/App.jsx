import './index.css'
import { useState, useEffect } from 'react'


import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import NewCalendar from './newCalendar'
import { supabase } from './lib/supabase'
import Home from './Home'
import { MantineProvider } from '@mantine/core'
import Calendar from './calendar'
import AdminSchedule from './adminSchedule'
import TutorDash from './tutorDash'
import TutorSetup from './tutorSetup'
import TutorInvite from './tutorInvite'
import Profile from './profile'
import ListSchedule from './listSchedule'
import Layout from './Layout'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import TutoringRequest from './tutoringRequest'
import TutorRequestNotifications from './tutorRequestNotifications'

export default function App(){
    
  return (
   <BrowserRouter>
         <MantineProvider>
         <Routes>
           <Route element={<Layout imageSrc={claims.user_metadata.avatar_url} role={role} />}>
           <Route path="/" element={<Home />} />
            <Route path="/tutorSetup" element={<TutorSetup />} />
            <Route path="/tutorRequestNotifications" element={<TutorRequestNotifications />} />
           <Route path="/newCalendar" element={<NewCalendar />} />
           <Route path="/Calendar" element={<Calendar />} />
           <Route path="/listSchedule" element={<ListSchedule />} />
           <Route path="/adminSchedule" element={<AdminSchedule />} />
           <Route path="/tutorDash" element={<TutorDash />} />
           <Route path="/tutorInvite" element={<TutorInvite />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/tutoringRequest" element={<TutoringRequest />}/> 
           </Route>
         </Routes>
         </MantineProvider>
       </BrowserRouter>
  )
}