import './index.css'
import { useState, useEffect } from 'react'
import { Alert, Button, Divider, Drawer, Input, Loader, Notification, Slider, Text, TextInput } from '@mantine/core';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
import { supabase } from './lib/supabase'
import './index.css'
import './lib/notifications.css';
import '@mantine/dates/styles.css';
import { IconChevronRight, IconInfoCircle, IconX } from '@tabler/icons-react';
import { TimePicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useAuth } from './lib/useAuth';
import { notifications } from '@mantine/notifications';
const icon = <IconInfoCircle />

export default function Calendar() {
  const datesDays={'23':'Monday,', '24':'Tuesday,','25':'Wednesday,','26':'Thursday,','27':'Friday,','28':'Saturday,','29':'Sunday,'}
    const datesTimes={
        '00':['12', 'am'],
        '01':['1', 'am'],
        '02':['2', 'am'],
        '03':['3', 'am'],
        '04':['4', 'am'],
        '05':['5', 'am'],
        '06':['6', 'am'],
        '07':['7', 'am'],
        '08':['8', 'am'],
        '09':['9', 'am'],
        '10':['10', 'am'],
        '11':['11', 'am'],
        '12':['12', 'pm'],
        '13':['1', 'pm'],
        '14':['2', 'pm'],
        '15':['3', 'pm'],
        '16':['4', 'pm'],
        '17':['5', 'pm'],
        '18':['6', 'pm'],
        '19':['7', 'pm'],
        '20':['8', 'pm'],
        '21':['9', 'pm'],
        '22':['10', 'pm'],
        '23':['11', 'pm'],
        '24':['12', 'pm'],
    }
    const {profile} = useAuth()
    const navigate = useNavigate()
  const [eventsOfficial, setEventsOfficial] = useState([])
  const [origEvents, setOrigEvents] = useState([])
  const[showError,setShowError]=useState(false)
  const [confirmReject, setConfirmReject] = useState(false)
  const [resize, setResize] = useState(false)
  const [message, setMessage] = useState('')
  const [orig, setOrig] = useState(true)
  const [lastRound1, setLastRound1] = useState(false)
  const [load, setLoad] = useState(true)
  const [busies, setBusies] = useState([])
  const [tutorings, setTutorings] = useState([])
  const[blocked,setBlocked]=useState(true)
  const [frees, setFrees] = useState([])
  const [tutorProposals, setTutorProposals] = useState([])
  const [ok, setok] = useState(false)
  const [finalPhase, setFinalPhase] = useState(false)
  const [curID,setCurID]=useState('')
  const [curStart,setCurStart]=useState('')
  const [curEnd,setCurEnd]=useState('')
  const [value, setValue] = useState(50);
  const [user, setUser] = useState(null);
const ids = [
  'c75be34c-d999-487a-bf24-92f1174a44a3',
  'fe6afbd7-07d3-40c4-9f3f-71ff0b381bcb',
  '04432478-6989-4d9b-b1a7-e023243795e6',
  '57b48aea-192c-4360-8633-dd3fc89bc544',
  'ec9e1bab-a526-4c57-9421-03dff31e9115',
  'c3272f00-c592-4f63-9ba8-5e34848b93ce',
  '90ca3aaf-d9cb-4fde-8ac7-974b2a60a8dc',
  'e9fab653-6d12-4829-b6c9-f59fadca64e6',
  '21a14bea-ebf5-4ab3-879d-6606394b8982',
  'df42ce9f-45f8-4771-bf61-d4dfcf773ff2',
  'd16978b4-fb59-492a-950c-e6ec786835b9',
  'cb236bdd-81e9-46f2-9495-c5ff46e93c7c',
  '360ceb2b-74ec-4c21-8123-0db51fe88281',
  '34bf7432-3997-41ed-80e8-243258b36853',
  '090afce1-5017-4e15-81a7-ced095831223',
  'ba3967d8-8575-4f33-8cbb-e2fd5ce878fe',
  'db84ad8e-c4b8-4765-bb33-4056630a8321',
  '81572c87-ede4-42ed-954d-d380905628be',
  '2426f6a9-965c-41cc-b2cd-4afa94fe2c44',
  'c8c63c8c-3109-4f9b-8421-ca1bcd258ebd',
  '6c3a4ae8-b3c2-43c9-90d9-f0a650fea9a9',
  '161375a7-840e-4918-9603-c7affef0e97f',
  '15d670c8-e5ea-4e0c-8312-141027f11a6e',
  '3df0b95e-030c-4561-80c0-9d3324475db3',
  'a45b1fd7-8c83-45d1-824b-ffe5fb542fde',
  'a8e68fde-1d0a-4585-96c8-3536f78fd01b',
  '4140bc13-02e3-4868-a0d7-b9eee99d9ced',
  'f2f45f25-fe28-4ddb-8ad3-7e56a47c5c5f',
  '2b31e4f1-7073-41c5-a5e7-6a33031cfcdf',
  '7dfe70d8-7efa-4256-81de-e9a18982090f',
  'd451ab62-8620-4580-a43c-43bbb62ea9dc',
  'a0bff0cc-7cfb-4472-b0cb-91945a1a19b3',
  '3a2677f7-11bb-48f0-bdb6-7e9af34553be',
  '6ad62fc1-6e58-4748-aa5f-18c8da8d9391',
  'cec3c8f1-71b9-4854-bb9b-c314c86212ee',
  'e9aa809a-68b6-46df-a5de-021ab031d42c',
  '49064aa9-d326-4645-ac4a-4b75d962f14f',
  'f180b59f-1f97-4eca-b73c-99bccfe353fe',
  'ac329be0-707c-4a20-8317-daacfd35a832',
  '1ecaa0c2-bcaa-4c87-a2db-1f854b4ae643',
  'eaf5e356-8d07-4c99-b6a2-f784054a4e26',
  'a5b6046f-ae83-4330-968b-5a29eda18930',
  'eb6a0f93-4b10-4cc6-b1af-59fa16560351',
  'f8668472-895f-4b07-91bd-a7f625c1a071',
  '78440d7c-3890-45a3-9986-3e7bc1021b48',
  '24c1a92c-2c0d-48dc-908f-0d8dac7178d0',
  'a386dbc0-0a34-47cb-99a9-754a50f5f787',
];
  let setupEvents = [
      {
        id: 'c75be34c-d999-487a-bf24-92f1174a44a3',
        start: "2026-03-22T08:35:00",
        end: "2026-03-22T09:20:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },
      {
        id: 'fe6afbd7-07d3-40c4-9f3f-71ff0b381bcb',
        start: "2026-03-22T09:25:00",
        end: "2026-03-22T10:10:00",
        backColor: "#67c660cc",
        borderColor:'#67c660cc',
      },
      {
        id: '04432478-6989-4d9b-b1a7-e023243795e6',
        start: "2026-03-22T10:35:00",
        end: "2026-03-22T11:20:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },
      {
        id: '57b48aea-192c-4360-8633-dd3fc89bc544',
        start: "2026-03-22T11:20:00",
        end: "2026-03-22T11:50:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },
      {
        id: 'ec9e1bab-a526-4c57-9421-03dff31e9115',
        start: "2026-03-22T12:40:00",
        end: "2026-03-22T13:10:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },
      {
        id: 'c3272f00-c592-4f63-9ba8-5e34848b93ce',
        start: "2026-03-22T13:10:00",
        end: "2026-03-22T13:55:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },
      {
        id: '90ca3aaf-d9cb-4fde-8ac7-974b2a60a8dc',
        start: "2026-03-22T14:00:00",
        end: "2026-03-22T14:45:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },
      {
        id: 'e9fab653-6d12-4829-b6c9-f59fadca64e6',
        start: "2026-03-22T14:45:00",
        end: "2026-03-22T15:15:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },







      {
        id: '21a14bea-ebf5-4ab3-879d-6606394b8982',
        start: "2026-03-23T08:35:00",
        end: "2026-03-23T09:20:00",
        backColor: "#5978ffcc",
        borderColor:'#5978ffcc',
      },
      {
        id: 'df42ce9f-45f8-4771-bf61-d4dfcf773ff2',
        start: "2026-03-23T09:25:00",
        end: "2026-03-23T10:10:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },
      {
        id: 'd16978b4-fb59-492a-950c-e6ec786835b9',
        start: "2026-03-23T10:35:00",
        end: "2026-03-23T11:20:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },
      {
        id: 'cb236bdd-81e9-46f2-9495-c5ff46e93c7c',
        start: "2026-03-23T11:20:00",
        end: "2026-03-23T11:50:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },
      {
        id: '360ceb2b-74ec-4c21-8123-0db51fe88281',
        start: "2026-03-23T12:40:00",
        end: "2026-03-23T13:10:00",
        backColor: "#67c660cc",
        borderColor:'#67c660cc',
      },
      {
        id: '34bf7432-3997-41ed-80e8-243258b36853',
        start: "2026-03-23T13:10:00",
        end: "2026-03-23T13:55:00",
        backColor: "#67c660cc",
        borderColor:'#67c660cc',
      },
      {
        id: '090afce1-5017-4e15-81a7-ced095831223',
        start: "2026-03-23T14:00:00",
        end: "2026-03-23T14:45:00",
        backColor: "#ff3c3ccc",
        borderColor:'#ff3c3ccc',
      },
      {
        id: 'ba3967d8-8575-4f33-8cbb-e2fd5ce878fe',
        start: "2026-03-23T14:45:00",
        end: "2026-03-23T15:15:00",
        backColor: "#ff3c3ccc",
        borderColor:'#ff3c3ccc',
      },






      {
        id: 'db84ad8e-c4b8-4765-bb33-4056630a8321',
        start: "2026-03-24T09:00:00",
        end: "2026-03-24T09:30:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },
      {
        id: '81572c87-ede4-42ed-954d-d380905628be',
        start: "2026-03-24T09:30:00",
        end: "2026-03-24T10:15:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },
      {
        id: '2426f6a9-965c-41cc-b2cd-4afa94fe2c44',
        start: "2026-03-24T10:20:00",
        end: "2026-03-24T11:05:00",
        backColor: "#ff3c3ccc",
        borderColor:'#ff3c3ccc',
      },
      {
        id: 'c8c63c8c-3109-4f9b-8421-ca1bcd258ebd',
        start: "2026-03-24T11:30:00",
        end: "2026-03-24T12:15:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },
      {
        id: '6c3a4ae8-b3c2-43c9-90d9-f0a650fea9a9',
        start: "2026-03-24T12:20:00",
        end: "2026-03-24T13:05:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },
      




      {
        id: '161375a7-840e-4918-9603-c7affef0e97f',
        start: "2026-03-25T08:35:00",
        end: "2026-03-25T09:20:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },
      {
        id: '15d670c8-e5ea-4e0c-8312-141027f11a6e',
        start: "2026-03-25T09:25:00",
        end: "2026-03-25T10:10:00",
        backColor: "#5978ffcc",
        borderColor:'#5978ffcc',
      },
      {
        id: '3df0b95e-030c-4561-80c0-9d3324475db3',
        start: "2026-03-25T11:05:00",
        end: "2026-03-25T11:50:00",
        backColor: "#67c660cc",
        borderColor:'#67c660cc',
      },
      {
        id: 'a45b1fd7-8c83-45d1-824b-ffe5fb542fde',
        start: "2026-03-25T12:40:00",
        end: "2026-03-25T13:10:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },
      {
        id: 'a8e68fde-1d0a-4585-96c8-3536f78fd01b',
        start: "2026-03-25T13:10:00",
        end: "2026-03-25T13:55:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },
      {
        id: '4140bc13-02e3-4868-a0d7-b9eee99d9ced',
        start: "2026-03-25T14:00:00",
        end: "2026-03-25T14:45:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },
      {
        id: 'f2f45f25-fe28-4ddb-8ad3-7e56a47c5c5f',
        start: "2026-03-25T14:45:00",
        end: "2026-03-25T15:15:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },






      {
        id: '2b31e4f1-7073-41c5-a5e7-6a33031cfcdf',
        start: "2026-03-26T08:35:00",
        end: "2026-03-26T09:20:00",
        backColor: "#67c660cc",
        borderColor:'#67c660cc',
      },
      {
        id: '7dfe70d8-7efa-4256-81de-e9a18982090f',
        start: "2026-03-26T09:25:00",
        end: "2026-03-26T10:10:00",
        backColor: "#ffef3ccc",
        borderColor:'#ffef3ccc',
      },
      {
        id: 'd451ab62-8620-4580-a43c-43bbb62ea9dc',
        start: "2026-03-26T10:35:00",
        end: "2026-03-26T11:20:00",
        backColor: "#ff3c3ccc",
        borderColor:'#ff3c3ccc',
      },
      {
        id: 'a0bff0cc-7cfb-4472-b0cb-91945a1a19b3',
        start: "2026-03-26T11:20:00",
        end: "2026-03-26T11:50:00",
        backColor: "#ff3c3ccc",
        borderColor:'transparent',
      },
      {
        id: '3a2677f7-11bb-48f0-bdb6-7e9af34553be',
        start: "2026-03-26T12:40:00",
        end: "2026-03-26T13:10:00",
        backColor: "#5978ffcc",
        borderColor:'#5978ffcc',
      },
      {
        id: '6ad62fc1-6e58-4748-aa5f-18c8da8d9391',
        start: "2026-03-26T13:10:00",
        end: "2026-03-26T13:55:00",
        backColor: "#5978ffcc",
        borderColor:'#5978ffcc',
      },
      {
        id: 'cec3c8f1-71b9-4854-bb9b-c314c86212ee',
        start: "2026-03-26T14:00:00",
        end: "2026-03-26T14:45:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },
      {
        id: 'e9aa809a-68b6-46df-a5de-021ab031d42c',
        start: "2026-03-26T14:45:00",
        end: "2026-03-26T15:15:00",
        backColor: "#a3faffcc",
        borderColor:'#a3faffcc',
      },




      {
        id: '49064aa9-d326-4645-ac4a-4b75d962f14f',
        start: "2026-03-27T08:35:00",
        end: "2026-03-27T09:20:00",
        backColor: "#b73cffcc",
        borderColor:'#b73cffcc',
      },
      {
        id: 'f180b59f-1f97-4eca-b73c-99bccfe353fe',
        start: "2026-03-27T09:25:00",
        end: "2026-03-27T10:10:00",
        backColor: "#5978ffcc",
        borderColor:'#5978ffcc',
      },
      {
        id: 'ac329be0-707c-4a20-8317-daacfd35a832',
        start: "2026-03-27T10:25:00",
        end: "2026-03-27T11:10:00",
        backColor: "#ff3c3ccc",
        borderColor:'#ff3c3ccc',
      },
      {
        id: '1ecaa0c2-bcaa-4c87-a2db-1f854b4ae643',
        start: "2026-03-27T11:15:00",
        end: "2026-03-27T12:00:00",
        backColor: "#ff973ccc",
        borderColor:'#ff973ccc',
      },




      {
        id: 'eaf5e356-8d07-4c99-b6a2-f784054a4e26',
        start: "2026-03-22T15:45:00",
        end: "2026-03-22T17:15:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: 'a5b6046f-ae83-4330-968b-5a29eda18930',
        start: "2026-03-23T15:45:00",
        end: "2026-03-23T17:15:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: 'eb6a0f93-4b10-4cc6-b1af-59fa16560351',
        start: "2026-03-24T14:00:00",
        end: "2026-03-24T17:00:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: 'f8668472-895f-4b07-91bd-a7f625c1a071',
        start: "2026-03-25T15:45:00",
        end: "2026-03-25T17:15:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: '78440d7c-3890-45a3-9986-3e7bc1021b48',
        start: "2026-03-26T15:45:00",
        end: "2026-03-26T17:15:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: '24c1a92c-2c0d-48dc-908f-0d8dac7178d0',
        start: "2026-03-27T13:05:00",
        end: "2026-03-27T16:00:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
      {
        id: 'a386dbc0-0a34-47cb-99a9-754a50f5f787',
        start: "2026-03-28T22:05:00",
        end: "2026-03-29T00:00:00",
        backColor: "#94949461",
        borderColor:'transparent',
      },
    ];

  useEffect(() => {
  const getUser = async () => {
      setUser(profile);
    if (eventsOfficial.length==0){
        getDataUser(profile.id)
    }
  };

  getUser();
}, []);
const hideBlocked=async()=>{
    if(!blocked){
        setEventsOfficial(eventsOfficial.slice(0, eventsOfficial.length - setupEvents.length))
        //setEventsOfficial([...frees,...tutorings])
    }else{
        setEventsOfficial([...frees,...tutorings,...setupEvents])
    }
    setBlocked(!blocked)
}
const showOrig=async()=>{
  if (orig){
    setEventsOfficial([...eventsOfficial, ...setupEvents])
  }else{
  setEventsOfficial(eventsOfficial.slice(0, eventsOfficial.length - setupEvents.length))  }
  setOrig(!orig)
}
  
const getMoreInfo = async(period_id, color)=>{
            const colorToNature={
                'rgba(0, 255, 225, 1)':'tutoredConfirmed',
                'rgba(0,255,255,0.3)': 'tutoredPending',
                'rgba(0,100,255,1)':'tutorConfirmed',
                'rgba(0,100,255,0.3)':'tutorPending',
                'rgba(255, 0, 0, 0.3)':'tutorRejected'
            }
            let d = []
            if (colorToNature[color].substring(0,7)=='tutored'){
              const {data} = await supabase.from('tutor_match').select(`
                request_id,
                profiles!tutor_match_tutor_id_fkey(name, email),
                periods(start),
                tutoring_requests(teachers(name,email)),
                Classes(name)
                `).eq('period_id',period_id).eq('tutee_id', profile.id).maybeSingle()
                d=data
            }else{
              const {data} = await supabase.from('tutor_match').select(`
                request_id,
                profiles!tutor_match_tutee_id_fkey(name, email,id),
                periods(start),
                tutoring_requests(teachers(name,email,id)),
                Classes(name)
                `).eq('period_id',period_id).eq('tutor_id', profile.id).maybeSingle()
                d=data
            }
            let t = {}
            if (d){
                t = {
                    period_id: period_id,
                    request_id: d.request_id,
                    times: [d.periods.start],
    
                    tutorName: d?.profiles.name ?? null,
                    tutorEmail: d?.profiles.email ?? null,

                    student_id: d?.profiles.id ?? null,
                    studentName: d?.profiles.name ?? null,
                    studentEmail: d?.profiles.email ?? null,

                    teacherName: d.tutoring_requests.teachers.name,
                    teacherEmail: d.tutoring_requests.teachers.email,

                    class_id: d.Classes?.id,
                    className:d.Classes?.name,
                    nature:colorToNature[color]
                }
                for (let i = 1; i<d.length; i++){
                        t.times=[...t.times, d.periods.start]
                    }
                setConfirmReject(t)
                }
                
            
        }
const getTutor=async(user_id)=>{
  const {data, error} = await supabase.from('tutor_match').select('periods(start,end), period_id, confirmed, profiles!tutor_match_tutee_id_fkey(name), Classes(name)').eq('tutor_id',user_id)
  let t = []
  if (data){
    for (const d of data){
    t.push({
      backColor: d.confirmed =='confirmed' ? 'rgba(0,100,255,1)':d.confirmed =='rejected'?'rgba(255, 0, 0, 0.3)':'rgba(0,100,255,0.3)',
      end: d.periods.end,
      start: d.periods.start,
      borderColor:'transparent',
      id: d.period_id, 
      text: d.profiles.name,
      resizeDisabled: true
    })
  }
  }
  return t
}
const getTutored=async(user_id)=>{
  const {data, error} = await supabase.from('tutor_match').select('periods(start,end), period_id, request_id, confirmed, tutoring_requests(teachers(name, email)),Classes(name), tutor_id, profiles!tutor_match_tutor_id_fkey(name,email)').eq('tutee_id',user_id)
  let t = []
  let proposals = []
  if (data){
    for (const d of data){
      if (d.confirmed!='rejected'){
        t.push({
          backColor: d.confirmed =='confirmed' ? 'rgba(0, 255, 225, 1)':'rgba(0,255,255,0.3)',
          end: d.periods.end,
          start: d.periods.start,
          borderColor:'transparent',
          id: d.period_id, 
          text: d.Classes.name,
          resizeDisabled: true
        })
        if (d.confirmed=='pending'){
          proposals.push({
            request_id: d.request_id,
            teacherName: d.tutoring_requests.teachers.name,
            teacherEmail: d.tutoring_requests.teachers.email,
            period_id: d.period_id,
            tutorName: d.profiles.name,
            tutorEmail:d.profiles.email,
            className: d.Classes.name
          })
        }
      }
  }
  }
  setTutorProposals(proposals)
  return t
}
const getTutoringPeriods=async(user_id)=>{
  const a = await getTutor(user_id)
  const b = await getTutored(user_id)
  return [...a,...b]
}
const getFrees=async(user_id)=>{
    const {data,error}=await supabase.from('free').select('rating, periods(*)').eq('person_id', user_id)
    return data
}
    const getDataUser = async(user_id)=>{
        setLoad(true)
    let freesT=await getFrees(user_id)
    if (freesT.length==0){
      navigate('/newCalendar')
    }
    let eventsOrig=[]
    let events1=[]
    
    for (const free of freesT){
        let t = {...free.periods}
        t.backColor=free.rating,
        t.borderColor='transparent',
        events1=[...events1, t]
    }
    let eventsTutor = await getTutoringPeriods(user_id)
    setTutorings(eventsTutor)
    setFrees(events1)
    setEventsOfficial([...events1, ...eventsTutor])
    setOrigEvents(events1.map(item=>({...item})))
    setLoad(false)
}
  // Check URL params on initial render
const getClosestEnd=async(time)=>{

    const timeDate=new Date(time)
    let curClosest=null
    let dif=0
    let curDiff=-99999999999999999999999
        for (const event of [...frees, ...busies,...tutorings,...setupEvents]){
            dif = new Date(event.end)-timeDate
            if (dif<=0 && dif>curDiff){
              curDiff=dif
              curClosest=event.end
            }
        }
        let temp1 = new Date(curClosest)
    temp1.setTime(temp1.getTime()+300000)
    
    return toISOLocal(temp1)
  }

  const getClosestStart=async(time)=>{
    const timeDate=new Date(time)
    let curClosest=null
    let dif=0
    let curDiff=99999999999999999999999
        for (const event of [...frees, ...busies,...tutorings,...setupEvents]){
            dif = new Date(event.end)-timeDate
            if (dif>=0 && dif<curDiff){

              curDiff=dif
              curClosest=event.start
            }
        }
        let temp1 = new Date(curClosest)
    temp1.setTime(temp1.getTime()-300000)

    return toISOLocal(temp1)
  }
  const getClosest=async(period)=>{
    let s = await getClosestEnd(period.start)
      let e = await getClosestStart(period.end)
      if (new Date(e)-new Date(s)>=100000){
      let thisID = await addPeriod(s,e)
      let events = [...frees, {
        start: s,
      end: e,
      backColor:value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})` ,
      borderColor:'transparent',
      id: thisID
      }]
      setFrees(events)
      setEventsOfficial(blocked?[...events, ...tutorings]:[...events, ...tutorings, ...setupEvents])
      }
  }
  
const addPeriod=async(start, end)=>{
        const{data,error}=await supabase.from('periods') .upsert(
    {
      start: start,
      end: end,
    },
    {
      onConflict: 'start,end'
    }
  ).select()
  return data[0].id
}
  function toISOLocal(d) {
  var z  = n =>  ('0' + n).slice(-2);

  return d.getFullYear() + '-'
         + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + 'T' +
         z(d.getHours()) + ':'  + 
         z(d.getMinutes()) + ':' +
         z(d.getSeconds());
}

  
  const handleSlider=async(id)=>{
    let x = eventsOfficial.find(item =>item.id==id)
    if(value==0 && x.backColor!='#f5f5f5'){
        setFrees(prev=>prev.filter(item=>!(item.id==id)))
        x.backColor='#f5f5f5'
        let b = busies
        setBusies([...b, x])
    }else{
        if(x.backColor=='#f5f5f5' && value!=0){
          setBusies(prev=>prev.filter(item=>!(item.id==id)))
            
            x.backColor=value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})`
            x.borderColor='transparent'
            let f=frees
            setFrees([...f, x])
            
            //TODO can't make events in blocked
        }else{
            let fIndex = frees.indexOf(x)
            x.backColor=value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})`
            
            setFrees(prev => {
                const copy = [...prev]
                copy.splice(fIndex, 1, x)
                return copy
            })
        }
        
    }
  }
  const handleResize=async()=>{
    setResize(false)
    if((String(curStart).length!=5 && String(curStart).length!=8) || (String(curEnd).length!=5 && String(curEnd).length!=8)){
      setShowError(true)
    }else{
    let x = eventsOfficial.find(item =>item.id==curID)

    
    if (String(curStart).length==5){
      x.start=String(x.start).substring(0,11)+String(curStart)+':00'
    }else{
      x.start=String(x.start).substring(0,11)+String(curStart)
    }
    if (String(curEnd).length==5){
      x.end=String(x.end).substring(0,11)+String(curEnd)+':00'
    }else{
      x.end=String(x.end).substring(0,11)+String(curEnd)
    }
    const thisId=await addPeriod(x.start, x.end)
    x.id=thisId
    }
  }
  const handleDelete=async()=>{
    let x = eventsOfficial.find(item =>item.id==curID)
    let xIndex = eventsOfficial.indexOf(x)
    setEventsOfficial(prev => {
  const copy = [...prev]
  copy.splice(xIndex, 1, x)
  return copy
})}
const sendAdmin=async(tutor, className, teacherName, teacherEmail)=>{
        const {data, error} = await supabase.from('profiles').select('').eq('role', 'admin')
        let temp = [...data, {name:teacherName, email:teacherEmail}]
        for (const admin of temp){
          sendAdminEmail(tutor, profile.name, className, admin)
        }
}
const sendAdminEmail=async(tutor, tutee, className, admin)=>{
        const templateParams = {
                name : admin.name,
                action: tutee +' has accepted a meeting time for tutoring in '+className+' with '+tutor+'. They are all set to start!',
                email: admin.email,
                note: message?'A note from '+ tutee+" to " +tutor+": "+message:''
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_c1yq7o7',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .then(() => {
                    notifications.show({
                                        title: 'Email sent',
                                    })
                })
                .catch((error) => console.log(error));
}
const sendStatusUpdate=async(tutor, tutee, action, email)=>{
        const templateParams = {
                tutor : tutor,
                tutee : tutee,
                action : action,
                email : email,
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_4i88il2',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .then(() => {
                    notifications.show({
                    title: 'Email sent',
                })
                })
                .catch((error) => console.log(error));
}
const handleConfirmed=async(confirmReject)=>{
  //update stati
  await supabase.from('tutor_match').update({confirmed: 'confirmed'}).eq('request_id', confirmReject.request_id).eq('period_id', confirmReject.period_id)
  const{error}=await supabase.from('tutoring_requests').update({progress: 'confirmed',note:message}).eq('id', confirmReject.request_id)
  //send email to tutor
  sendStatusUpdate(confirmReject.tutorName, profile.name, 'accepted', confirmReject.tutorEmail)

  //send email to admin
  //todo unlock
  //sendAdmin(confirmReject.tutorName,confirmReject.className, confirmReject.teacherName, confirmReject.teacherEmail)
}
const handleRejected=async(confirmReject)=>{
  //update stati
  await supabase.from('tutor_match').update({confirmed: 'rejected'}).eq('request_id', confirmReject.request_id).eq('period_id', confirmReject.period_id)
  //send email to tutor
  sendStatusUpdate(confirmReject.tutorName, profile.name, 'rejected', confirmReject.tutorEmail)

}
  const handleSubmission=async()=>{
    navigate('/Home')
    notifications.show({
      title:'Schedule Updated'
    })
        for (const b of busies){
          await supabase.from('free').delete().eq('period_id',b.id).eq('person_id', user.id)
        }
        const freeKeys = new Set(frees.map(free => `${free.id}_${free.backColor}`));
        const origKeys = new Set(origEvents.map(event=>`${event.id}_${event.backColor}`))
        const origCopy = origEvents.filter(item => !freeKeys.has(`${item.id}_${item.backColor}`));
        let freesCopy = frees.filter(item=>!origKeys.has(`${item.id}_${item.backColor}`))
        for (const item of origCopy){
          await supabase.from('free').delete().eq('period_id',item.id).eq('period_id',item.id)
        }
        for (const item of freesCopy){
          await supabase.from('free').upsert({
                            person_id: user.id,
                            period_id:item.id,
                            rating: item.backColor
                        }, {onConflict:'person_id,period_id'})
        }
        
                }
    
    

  const config = 
        {
          startDate: "2026-03-22",
          headerHeight: 40,
          onBeforeCellRender: (args) => {
    args.cell.backColor = "#f5f5f5";
  },
          onBeforeHeaderRender: (args) => {
    const day = args.header.start.toDate().getDay();

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];

    args.header.html = days[day];
  },
          headerDateFormat: "dddd",
  viewType: "Week",
  cellDuration: 1,
  cellHeight: 1,
  durationBarVisible: false,
  timeRangeSelectedHandling: "Enabled",
  businessBeginsHour: 8,
  businessEndsHour: 22,
  onTimeRangeSelect: async (args) => {
    //RIGHT HERE
        getClosest(args)

  },
  eventMoveHandling: "Disabled",
  eventResizeHandling: "Update",
  onEventResize: (args) => {
    args.preventDefault()
      setCurID(args.e.data.id)
      let x = eventsOfficial.find(item =>item.id==args.e.data.id)
      setCurStart(String(x.start).substring(11))
      setCurEnd(String(x.end).substring(11))

      setResize(true)
  },
  eventClickHandling: "Edit",
  eventEditHandling: "Update",
  dayBeginsHour: 7,
  dayEndsHour: 22,
  onEventClicked: (args) => {
    if ((!args.e.data.text && args.e.data.backColor.substring(0,1)!='#') || args.e.data.backColor=='#f5f5f5'){
      setCurID(args.e.data.id)
      handleSlider(args.e.data.id)
    }else if (args.e.data.text){
        getMoreInfo(args.e.data.id, args.e.data.backColor)
    }else if(args.e.data.backColor.substring(0,1)=='#'&&!frees.some(item=>item.id==args.e.data.id)){
      setCurID(args.e.data.id)
      let events = [...frees, {
        start: args.e.data.start,
      end: args.e.data.end,
      backColor:value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})` ,
      borderColor:'transparent',
      id: args.e.data.id
      }]
      setFrees(events)
      setEventsOfficial(blocked?[...events, ...tutorings]:[...events, ...tutorings, ...setupEvents])
    }
    },
  eventHoverHandling: "Disabled",
};
return (


            <div>
        <div style={{display:'flex',alignItems: 'flex-start', width: '100%', justifyContent:'center', padding:'20px'}}>
                        <Text
                            component="span"
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                            size='10vh'
                            weight={700}
                            style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                            >
                            Schedule
                            </Text>
                            </div>
                            
            <div style={{display:'flex', justifyContent:'center', }}>
       <Button variant = 'light'  onClick={hideBlocked}>{blocked?'Show Blocked':'Hide Blocked'}</Button>
       </div>
       <div style={{display:'flex', justifyContent:'center'}}>
       <div style={{padding:'10px', width:'40%'}}>
        <Slider
      color={value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})` }
      value={value} 
      label={null}
      onChange={setValue}
      
    />
    </div>
    </div>
    <div style={{display:'flex', justifyContent:'center'}}>
    <div style={{width:'75%'}}>
        <DayPilotCalendar {...config} events={eventsOfficial} heightSpec= "BusinessHoursNoScroll" />
        </div>
        </div>
        <Button style={{position:'fixed', bottom:'20px', right:'20px'}} onClick={handleSubmission}>Update <IconChevronRight stroke={2}/></Button>
        
        {resize && (
          <div className="modal-overlay">
    <div className="modal">
      <IconX stroke={2} onClick={()=>{setResize(false)}}/>
      {showError && notifications.show({
                  color: 'red',
                  title: 'Empty Fields',
                  classNames: classes,
                })}
      <TimePicker defaultValue={curStart} value={curStart} format="12h" onChange={(value)=>{
        setCurStart(value) 
        setShowError(false)}}  label="Start:" />
      <TimePicker defaultValue={curEnd} value={curEnd} format="12h" onChange={(value)=>{
        setCurEnd(value) 
        setShowError(false)}} label="End: " />
      <div style={{display:'flex', justifyContent:'center', padding:10, gap:'2px'}}>
        <Button vairant = 'light' onClick={handleResize} style={{padding:10}}>OK</Button>
      </div>
      

    </div>
  </div>
        )}
        {load && (
          <div className="modal-overlay">
      
      <Loader color="blue" />
      
      
      

    </div>

        )}
          {confirmReject&&<Drawer position={'right'} offset={8} radius="md" opened = {confirmReject} onClose={()=>{
                                                  setConfirmReject(false)
                                                  }}>
          <div style={{width:'100%', height:'100%'}}>
              <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size='40px'
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif', }}
              >
                {confirmReject.nature.substring(0,7)=='tutored'?confirmReject.className:confirmReject.studentName}
                                  </Text>
                                   <div style={{width:'60%'}}>
                                  <Divider my="md" size="md"/>
                                  </div>
                {confirmReject.nature.substring(0,7)!='tutored'&&<Button>{confirmReject.className}</Button>}
                {confirmReject.nature.substring(0,7)=='tutored'&&<div>
                  <p><b>Tutor:</b> {confirmReject.tutorName}</p>
                  <p><b>Tutor Contact:</b> {confirmReject.tutorEmail}</p>
                  </div>}
                {confirmReject.nature.substring(0,7)!='tutored'&&<div>
                  <p><b>Student Contact:</b> {confirmReject.studentEmail}</p>
                  <p><b>Teacher:</b> {confirmReject.teacherName}</p>
                  <p><b>Teacher Contact:</b> {confirmReject.teacherName}</p>
                  </div>}
                  <p><b>{confirmReject.nature.substring(7, confirmReject.nature.length)=='pending'?'Proposed Meetings:':'Meetings:'}</b></p>
                  <div style={{paddingLeft:'20px'}}>
                                    {confirmReject.times.map((time)=>(
                                            <div key={time}>
                                                <p>{datesDays[time.substring(8,10)]} {datesTimes[time.substring(11,13)][0]}{time.substring(13,16)}{datesTimes[time.substring(11,13)][1]}</p>
                                            </div>
                                        ))}
                                        </div>
                <div style={{position:'absolute', bottom:'20px', right:'20px'}}>
                  {confirmReject.nature.substring(0,7)!='tutored'&&<Button variant='light'onClick={()=>{
                                        navigate('/adminSchedule', {state:{
                                            request_id: confirmReject.request_id,
                                            name: confirmReject.studentName,
                                            class_id:confirmReject.class_id, 
                                            className: confirmReject.className, 
                                            email: confirmReject.studentEmail,
                                            id: confirmReject.student_id, 
                                            id2: profile.id,
                                            admin:false, 
                                            editable:false}})
                                            }}>Change Schedule</Button>}
                  {confirmReject.nature=='tutoredPending'&&<div style={{display:'flex', gap:'2px'}}>
                    <Button variant = 'light' onClick={()=>{
                      setConfirmReject(false)
                      setEventsOfficial(prev=>prev.map(item=>(item.id==confirmReject.period_id && item.text)?{...item, borderColor:'transparent',confirmed:'confirmed',backColor:'rgba(0, 255, 225, 1)'}:item))
                      setTutorings(prev=>prev.map(item=>item.id==confirmReject.period_id?{...item, confirmed:'confirmed',borderColor:'transparent',backColor:'rgba(0, 255, 225, 1)'}:item))
                      handleConfirmed(confirmReject)
                    }}
                    >Confirm</Button>
                    <Button variant = 'light' color = 'red' onClick={()=>{
                      setConfirmReject(false)
                      setEventsOfficial(prev=>prev.filter(item=>!(item.id==confirmReject.period_id && item.text)))
                      setTutorings(prev=>prev.filter(item=>item.id!=confirmReject.period_id))
                      handleRejected(confirmReject)
                    }}
                    
                    >Reject</Button>
                                  </div>}
                </div>
      </div>
      </Drawer>}
    
        
        
      </div>


      
    )
  }


  
  

    