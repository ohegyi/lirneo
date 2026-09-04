import './index.css'
import { useState, useEffect } from 'react'
import { Button, Divider, Drawer, Grid, Group, Input, Notification, Scroller, SegmentedControl, Text, TextInput } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { supabase } from './lib/supabase'
import emailjs from '@emailjs/browser';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { Link } from 'react-router-dom';
import { useAuth } from './lib/useAuth';
import ClassCard from './assets/classCard';
import ProfileCard from './assets/ProfileCard';
const icon = <IconInfoCircle />
export default function TutorRequestNotifications() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState({})
    const [tutorBeRequests, setTutorBeRequests] = useState([])
    const [avsTutors, setAvsTutors]=useState({})
    const [mode1, setMode1]=useState(0)
    //[posted, pending]
    const [pending, setPending] = useState([{},{}])
    const [confirmed, setConfirmed] = useState({})
    const [emailModal, setEmailModal]=useState(false)
    const [mainMode, setMainMode] = useState(0)
    const [infoShort, setInfoShort] = useState(false)
    const [curIndex, setCurIndex]=useState(0)
    const [role, setRole] = useState('')
    const [infoPost, setInfoPost] = useState(false)
    const [infoMatch, setInfoMatch] = useState(false)
    const [infoConfirmed, setInfoConfirmed] = useState(false)
    const [load, setLoad] = useState(false)
    const [mode, setMode]  = useState(0)
    const [avatarListings, setAvatarListings] = useState({})
    const [urls, setUrls] = useState({})
    const {profile,getAvatarUrl} = useAuth()
    const user = profile;
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
    const [avsTutorsUpdated, setAvsTutorsUpdated] = useState({})
    const [tutorBeRequestsUpdated, setTutorBeRequestsUpdated] = useState([])
    useEffect(() => {
  const getUser = async () => {
        setLoad(true)
                setRole(profile.role)
                getDataRequests(profile.role,profile.teacher_id)
                getData()
                getTutorApplications()
                getUpdatedTutorApplications()
        };
        getUser();
        
    }, [])
    const [message, setMessage] = useState("");
  const uploadRequestsSetup=async()=>{
       await supabase.from('tutoring_requests').update({note:message}).eq('id',emailModal.request_id)
       let t = emailModal.recipients
       setEmailModal(false)
    for (const item of t){
      sendEmailSchedule(item.profiles.email, item.profiles.name)
    }
  }
  
  const sendEmailSchedule = async(email, name) => {
        const templateParams = {
            email:email,
            tutor :name,
            className: emailModal.className,
            message: message? 'A note from the Acedemic Skills Department: '+message:null
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            'template_gv0va9n',
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            ).then(()=>{
                notifications.show({
                    title: 'Email sent',
                })
            })
    };
    const sendEmailRegister = (email) => {
        const templateParams = {
            email: email,
            sender: user.email
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            'template_na9heeq',
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                notifications.show({
          title: 'Email sent',
        })
            })
            .catch((error) => console.log(error));
    };
    const getTutorApplications=async()=>{
        //        // navigate('/tutorSetup', {state:{id:request.id, editable:false, name: request.name, target:target}})
        const { data, error } = await supabase.from('profiles').select('avatar_url, name,email,id').eq('role','tutor')
        //imageSrc,name,classNames, cardType
        if(data){
            let avs=data.map(item=>item.avatar_url)
        setAvsTutors(await getAvatarUrl(avs))
        setTutorBeRequests(data)
        }
    }
    const getUpdatedTutorApplications=async()=>{
        const { data, error } = await supabase.from('profiles').select('avatar_url, name,email,id').eq('role','tutorUpdated')
        if (data){
            let avs=data.map(item=>item.avatar_url)
        setAvsTutorsUpdated(await getAvatarUrl(avs))
        setTutorBeRequestsUpdated(data)
        }
    }
    const getTutorInfo = async(request_id)=>{
        const {data, error} = await supabase.from('tutor_match').select(`
            request_id,
            profiles!tutor_match_tutor_id_fkey(id, name, email),
            periods(start)
            `).eq('request_id',request_id)
        let t = {}
        if (data){
            t = {
                request_id: request_id,
                times: [data[0].periods.start],

                tutorId: data[0].profiles.id,
                tutorName: data[0].profiles.name,
                tutorEmail: data[0].profiles.email,
            }
            for (let i = 1; i<data.length; i++){
                    t.times=[...t.times, d.periods.start]
                }
            }
            return t
        }
    const getDataRequests=async(role1, teacher_id1)=>{
        let data1 = []
        if (role1=='teacher'){
            const { data } = await supabase.from('tutoring_requests').select(
            `
            id,
            student_id,
            progress,
            note,
            updated_at,
            profiles(name, email), 
            teachers(name, email),
            class_id,
            Classes(name, subject, level)`).eq('teacher_id', teacher_id1)
            data1=data
        }else{
            const { data } = await supabase.from('tutoring_requests').select(
            `
            id,
            student_id,
            progress,
            note,
            updated_at,
            profiles(name, email, avatar_url), 
            teachers(name, email),
            class_id,
            Classes(name, subject, level)`)
            data1=data
        }
        if (data1) {
            let r = {}
            let p = [{},{}]
            let c = {}
            let avs = []
            for (const d of data1){
                avs.push(d.profiles.avatar_url)
                let t={
                    request_id: d.id,
                    progress:d.progress,
                    message:d.note || false,
                    updated_at: d.updated_at,

                    student_id: d.student_id,
                    name: d.profiles.name,
                    email: d.profiles.email,
                    avatar_url: d.profiles.avatar_url,

                    teacherName: d.teachers.name,
                    teacherEmail: d.teachers.email,

                    class_id: d.class_id,
                    className: d.Classes.name,
                    subject: d.Classes.subject,
                    level: d.Classes.level,

                }
                if (d.progress=='requested'){
                    if (!r[d.student_id]) {
                        r[d.student_id] = []
                    }
                    r[d.student_id].push(t)
                }else if (d.progress =='group' || d.progress == 'single'){
                    if (!p[0][d.student_id]) {
                        p[0][d.student_id] = []
                    }

                    p[0][d.student_id].push(t)
                }else if (d.progress =='proposed'){
                    if (!p[1][d.student_id]) {
                        p[1][d.student_id] = []
                    }
                    p[1][d.student_id].push(t)
                }else{
                    if (!c[d.student_id]) {
                        c[d.student_id] = []
                    }
                    c[d.student_id].push(t)
                }
            }
            setRequests(r)
            setPending(p)
            setConfirmed(c)
            let avList = await getAvatarUrl(avs)
            setAvatarListings(avList)
        }
    }
    const getRecipients=async(id)=>{
        setLoad(true)
        const {data, error} = await supabase.from('tutor_match_invites').select('*, profiles(name, email, id, avatar_url), tutoring_requests(updated_at)').eq('request_id',id )
        let urlList = await getAvatarUrl(data.map(item=>item.profiles.avatar_url))
        setUrls(urlList)
        setLoad(false)
        return data
    }
    const getData=async()=>{
        
        const { data, error } = await supabase.from('tutoring_requests').select('*')
        if (data) {
            setUsers(data)
        }
        setLoad(false)
    }
    return (
            <div>
                 <div style={{paddingTop:'2%'}}>
                                    <Text
                                    component="span"
                                    align="center"
                                    variant="gradient"
                                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                    size='10vh'
                                    weight={700}
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                                    >
                                    {user.name}: Dashboard
                                    </Text>
                                    </div>
<div style={{display:'flex', justifyContent:'center',paddingTop:'4%', gap:'2px'}}>
            <Button variant={(mainMode == 0 )? "filled":"outline"} onClick={()=>{setMainMode(0)}}>Request for tutoring</Button>
            <Button variant={(mainMode == 1 )? "filled":"outline"} onClick={()=>{setMainMode(1)}}>Requests to become a tutor </Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width:'60vw', alignContent:'center'}}>
                    <Divider my="md" size="md"/>
                    </div>
                    </div>
                
               
        {mainMode==0&&<div>
            <div style={{paddingBottom:'20px'}}> 

                    <SegmentedControl
      value={mode}
      onChange={setMode}
      data={[
        { label: 'Requests', value: 0 },
        { label: 'Posted', value: 1 },
        { label: 'Matched', value: 2 },
        { label: 'Active', value: 3 },
      ]}
    />
        </div>
        
            {mode ==0 && <div>
                {(Object.keys(requests).length>0) && <div>
                 <Grid align="stretch" style={{width:'100%'}}>
                {Object.entries(requests).map(([student_id, tutees]) => (
                            <Grid.Col key = {student_id} span={{ base: 12, md: 4, lg: 3 }} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            }}
                                
                                onClick={() => {
                                    setInfoShort(tutees)}}
                                
                            >
                               <ClassCard className={tutees[0].name} avatar_url={avatarListings[tutees[0].avatar_url]} subject={tutees.map(tutoring => tutoring.subject).join('|')}/>
                            </Grid.Col>
                ))}
                </Grid>
                </div>
                }
             </div>}
             {mode ==1 && <div>
                {(Object.keys(pending[0]).length>0) && <div>
                                 <Grid align="stretch" style={{width:'100%'}}>
                {Object.entries(pending[0]).map(([student_id, tutees]) => (
                            <Grid.Col span={{ base: 12, md: 4, lg: 3 }} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            }}
                                key={student_id}
                                
                                onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            recipients: await getRecipients(t.request_id)
                                        }))
                                    )
                                    setInfoPost(posts)
                                }}
                                
                            >
                               <ClassCard className={tutees[0].name} avatar_url={avatarListings[tutees[0].avatar_url]} subject={tutees.map(tutoring => tutoring.subject).join('|')}/>
                            </Grid.Col>
                ))}
                </Grid>
                </div>
                }
                </div>}
                {mode ==2 && <div>
                {(Object.keys(pending[1]).length>0) && <div>
                 <Grid align="stretch" style={{width:'100%'}}>

                {Object.entries(pending[1]).map(([student_id, tutees]) => (
                            <Grid.Col span={{ base: 12, md: 4, lg: 3 }} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            }}
                                key={student_id}
                                onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            extra: await getTutorInfo(t.request_id)
                                        }))
                                    )
                                    setInfoMatch(posts)
                                }}
                                
                            >
                               <ClassCard className={tutees[0].name} avatar_url={avatarListings[tutees[0].avatar_url]} subject={tutees.map(tutoring => tutoring.subject).join('|')}/>
                            </Grid.Col>
                ))}
                </Grid>
                </div>
                }
                </div>}
                {mode ==3 && <div>
                {(Object.keys(confirmed).length>0) && <div>
                 <Grid align="stretch" style={{width:'100%'}}>

                {Object.entries(confirmed).map(([student_id, tutees]) => (
                            <Grid.Col span={{ base: 12, md: 4, lg: 3 }} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            }}
                                key={student_id}
                                
                               onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            extra: await getTutorInfo(t.request_id)
                                        }))
                                    )
                                    setInfoConfirmed(posts)
                                }}
                                
                            >
                               <ClassCard className={tutees[0].name} avatar_url={avatarListings[tutees[0].avatar_url]} subject={tutees.map(tutoring => tutoring.subject).join('|')}/>
                            </Grid.Col>
                ))}
                </Grid>
                </div>
                }
                </div>}
                    
    </div>}
    {mainMode==1&&<div>
        <SegmentedControl
      value={mode1}
      onChange={setMode1}
      data={[
        { label: 'New', value: 0 },
        { label: 'Updates', value: 1 }
      ]}
    />
        {(tutorBeRequests.length>0 && mode1==0) && tutorBeRequests.map(item=>
            (<ProfileCard key ={item.id} onPress={()=>{
                navigate('/tutorSetup',{state:{
                    id:item.id,
                    name:item.name,
                    email:item.email,
                    editable:false
            }})
            }}imageSrc={avsTutors[item.avatar_url]} name={item.name} cardType ='Active'/>))}
             {(tutorBeRequestsUpdated.length>0 && mode1==1) && tutorBeRequestsUpdated.map(item=>
            (<ProfileCard key ={item.id} onPress={()=>{
                navigate('/tutorSetup',{state:{
                    id:item.id,
                    name:item.name,
                    email:item.email,
                    editable:false
            }})
            }}imageSrc={avsTutorsUpdated[item.avatar_url]} name={item.name} cardType ='Active'/>))}
        </div>}
                {infoShort && (
                    <Drawer position={'right'} offset={8} radius="md" opened = {infoShort} onClose={()=>{
                                        setInfoShort(false)
                                        setCurIndex(0)
                                        }}>
                            
                        {infoShort.map((tutoring, index)=>(<div>
                            {curIndex==index && <div key ={index}>
                                
                    <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {tutoring.name}
                    </Text>
                     <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%', gap:'2px'}} >
                            {
                            infoShort.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button variant={curIndex==index?"filled":"outline"} onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                            </div>
                        <p><b>Teacher: </b>{tutoring.teacherName}</p>
                            <p><b>Requested:</b> {tutoring.updated_at.substring(0,10)}</p>
                            {tutoring.message&&(<p>A message from {tutoring.name}: {tutoring.message}</p>)}
                                    {role=='admin'&&<Button 
                                    style={{position:'absolute',bottom:'20px', right:'20px'}}
                                    variant='light'
                                    onClick={()=>{
                                        navigate('/listSchedule', 
                                            {state:{
                                                id: tutoring.student_id, 
                                                editable:false, 
                                                name: tutoring.name, 
                                                className: tutoring.className, 
                                                target:tutoring.subject, 
                                                level:tutoring.level,
                                                requestId:tutoring.request_id
                                            }})

                        }}>Find a tutor</Button>}
                                
                                </div>}
                            </div>)
                            
                        )
                            }
                            
                        </Drawer>
                    )
                }
                {infoPost && (
                   <Drawer position={'right'} offset={8} radius="md" opened = {infoPost} onClose={()=>{
                                        setInfoPost(false)
                                        setCurIndex(0)
                                        }}>         
                        {infoPost.map((tutoring, index)=>(<div>
                            {curIndex==index && <div>
                                <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {tutoring.name}
                    </Text>
                     <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%', gap:'2px'}} >
                            {
                            infoPost.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button variant={curIndex==index?"filled":"outline"} onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                            </div>
                                    <p><b>Student contact: </b>{tutoring.email}</p>
                                    <p><b>Teacher: </b>{tutoring.teacherName}</p>
                                    <p><b>Teacher contact: </b>{tutoring.teacherEmail}</p>
                                    <h3>Status: Posted</h3>
                                        <p><b>Posted:</b> {tutoring.updated_at.substring(0,10)}</p>
                                        {tutoring.message&&(<p><b>Message:</b> {tutoring.message}</p>)}
                                        <p><b>Request sent to:</b></p>
                                        <div style={{position:'absolute', left:'10%'}}>
                                        {tutoring.recipients.map((request)=>(
                                            <div key={request.id} style={{display:'flex',}}>
                                                <div style={{width: '30px',
                                                    height: '30px',
                                                    border: request.rejected?'1.5px solid #ff5733':'1.5px solid #ffffffff',
                                                    borderRadius: '50%',
                                                    overflow:'hidden',
                                                    display:'flex',
                                                    }}>
                                                <img
                                                src={urls[request.profiles.avatar_url]}
                                                style={{
                                                    aspectRatio: '1',
                                                    width: '30px',
                                                    height: '30px',
                                                    objectFit: 'cover',
                                                    
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTArGzhAn3l3PtNH4bz8Lqbo4YkC1FHrm5szTMeHydiY5d3YFcYcdgdt9E&s=10";
                                                }}
                                                />
                                                </div>
                                                <p style={{color: request.rejected?'#ff5733':'black', paddingLeft:'2px'}}>{request.profiles.name}</p>
                                            </div>
                                        ))}
                                        </div>
                                     {role=='admin'&&<Button 
                                     style={{position:'absolute',bottom:'20px', right:'20px'}}
                                    variant='light'
                                     onClick={async()=>{
                                const {error}=await supabase.from('tutor_match_invites').update({rejected:false}).eq('request_id', infoPost[curIndex].request_id)
                                setEmailModal({request_id:infoPost[curIndex].request_id, recipients:infoPost[curIndex].recipients, className:infoPost[curIndex].className})
                                setInfoPost(false)
                            }}>Resend</Button>}
                                
                                </div>}
                            </div>)
                            
                        )
                            }
                            
                        </Drawer>
                    )
                }
                {infoMatch && (
                    <Drawer position={'right'} offset={8} radius="md" opened = {infoMatch} onClose={()=>{
                                        setInfoMatch(false)
                                        setCurIndex(0)
                                        }}>
                            
                        {infoMatch.map((tutoring, index)=>(<div>
                            {curIndex==index && <div>
                                 <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {tutoring.name} - {tutoring.extra.tutorName}
                    </Text>
                     <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%',gap:'2px'}} >
                                     {
                            infoMatch.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button  variant={curIndex==index?"filled":"outline"} onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                                    </div>
                                    <p><b>Student contact: </b>{tutoring.email}</p>
                                    <p><b>Tutor contact: </b>{tutoring.extra.tutorEmail}</p>
                                    <p><b>Teacher: </b>{tutoring.teacherName}</p>
                                    <p><b>Teacher contact: </b>{tutoring.teacherEmail}</p>
                                        <p><b>Matched:</b> {tutoring.updated_at.substring(0,10)}</p>
                                
                                </div>}
                            </div>)
                            
                        )
                            }
                        </Drawer>
                    )
                }
                {infoConfirmed && (
                    <Drawer position={'right'} offset={8} radius="md" opened = {infoConfirmed} onClose={()=>{
                                        setInfoConfirmed(false)
                                        setCurIndex(0)
                                        }}>
                            
                        {infoConfirmed.map((tutoring, index)=>(<div>
                            {curIndex==index && <div>
                                <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {tutoring.name} - {tutoring.extra.tutorName}
                    </Text>
                     <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%',gap:'2px'}} >
                               {
                            infoConfirmed.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button variant={curIndex==index?"filled":"outline"} onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                            </div>
                                    <p><b>Student contact: </b>{tutoring.email}</p>
                                    <p><b>Tutor contact: </b>{tutoring.extra.tutorEmail}</p>
                                    <p><b>Teacher: </b>{tutoring.teacherName}</p>
                                    <p><b>Teacher contact: </b>{tutoring.teacherEmail}</p>
                                    <p><b>Meetings:</b></p>
                                    {tutoring.extra.times.map((time)=>(
                                            <div key={time}>
                                                <p>{datesDays[time.substring(8,10)]} {datesTimes[time.substring(11,13)][0]}{time.substring(13,16)}{datesTimes[time.substring(11,13)][1]}</p>
                                            </div>
                                        ))}
                                
                                </div>}
                            </div>)
                            
                        )
                            }
                            
                        </Drawer>
                    )
                }
                {emailModal && (<div className="modal-overlay">
  <div className="modal">
      <h2>Message to {target} tutors:</h2>

      <TextInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message'
      />
      <div style={{paddingTop:'10px'}}>
      <Button variant = 'outline' onClick={()=>{
          uploadRequestsSetup()
          }}>Send</Button>
          </div>
    </div>
    </div>
)}
        </div>
    )}