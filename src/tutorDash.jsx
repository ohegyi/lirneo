import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate } from "react-router-dom";
import { Divider, Loader } from "@mantine/core";
import { Drawer, Button,Text, Scroller, Group} from '@mantine/core';
import ProfileCard from './assets/ProfileCard.jsx'
import ClassCard from "./assets/classCard.jsx";
import { useAuth } from "./lib/useAuth.js";

export default function TutorDash() {
    const {profile, getAvatarUrl} = useAuth()
    const user = profile
    const [mode,setMode]=useState(0)
    const datesDays={'22':'Monday,', '23':'Tuesday,','24':'Wednesday,','25':'Thursday,','26':'Friday,','27':'Saturday,','28':'Sunday,'}
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
    //[confirmed , rejected , pending]
    const [mine,setMine]=useState([{},{},{}])
    //[public, private]
    const [requests,setRequests]=useState([{},{}])
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    const [info, setInfo] = useState(false)
    const [urls, setUrls] = useState({})
    const [curIndex, setCurIndex] = useState(0)
    const [infoShort, setInfoShort] = useState(false)
    useEffect(() => {
      const getUser = async () => {
        setLoad(true)
        getMine(user.id)
        getRequests(user.id)
      };
      getUser()
      
    }, []);
    const getMine=async(id)=>{
       const { data, error } = await supabase
  .from('tutor_match')
  .select(`
    class_id,
    request_id,
    Classes(name),
    profiles!tutor_match_tutee_id_fkey(id, name, email, avatar_url),
    confirmed,
    tutoring_requests(note, updated_at, teachers(name, email))
  `)
  .eq('tutor_id', id)
        let temp = [{},{}, {}]
        let tUrls = []
        if (data){
            for (const d of data){
                tUrls.push(d.profiles.avatar_url)
                let t = {   request_id:d.request_id, 
                            avatar_url:d.profiles.avatar_url,
                            student_id:d.profiles.id, 
                            name:d.profiles.name, 
                            email:d.profiles.email, 
                            className:d.Classes.name, 
                            confirmed:d.confirmed,
                            class_id:d.class_id,
                            confirmed:d.confirmed,
                            updated_at: d.tutoring_requests.updated_at,
                            message: d.tutoring_requests.note || false,
                            teacherName: d.tutoring_requests.teachers.name,
                            teacherEmail: d.tutoring_requests.teachers.email,
                        }
            if(d.confirmed == 'confirmed'){
                if (!temp[0][d.profiles.id]) {
                    temp[0][d.profiles.id] = []
                }
                temp[0][d.profiles.id].push(t)
            }else if(d.confirmed == 'rejected'){
                if (!temp[1][d.profiles.id]) {
                    temp[1][d.profiles.id] = []
                }
                temp[1][d.profiles.id].push(t)
            }else{
                if (!temp[2][d.profiles.id]) {
                    temp[2][d.profiles.id] = []
                }
                temp[2][d.profiles.id].push(t)
            }
        }
        }
        setMine(temp)
        setUrls(await getAvatarUrl(tUrls))
    }
    const getTutorInfo = async(request_id)=>{
        console.log('here')
        console.log('INSIDE', request_id)
        const {data, error} = await supabase.from('tutor_match').select(`
            request_id,
            profiles!tutor_match_tutor_id_fkey(id, name, email),
            periods(start)
            `).eq('request_id',request_id)
        let t = {}
        console.log(data)
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
    const getRequests=async(id)=>{
        const {data,error} = await supabase.from('tutor_match_invites')
        .select(`request_id,
            tutoring_requests(student_id, 
            profiles(email, name,avatar_url), 
            progress, 
            class_id, 
            Classes(name, subject),
            teachers(name),
            updated_at,
            note
            )`)
            .eq('tutor_id', id)
            .eq('rejected',false)
        let temp = [{},{}]
        if (data){
            for (const d of data){
                let t = {request_id:d.request_id, 
                            student_id:d.tutoring_requests.student_id, 
                            name:d.tutoring_requests.profiles.name, 
                            avatar_url:d.tutoring_requests.profiles.avatar_url,
                            className:d.tutoring_requests.Classes.name, 
                            class_id:d.tutoring_requests.class_id,
                            confirmed:d.confirmed,
                            subject:d.tutoring_requests.Classes.subject,
                            email:d.tutoring_requests.profiles.email,
                            updated_at: d.tutoring_requests.updated_at,
                            message: d.tutoring_requests.note || false,
                            teacherName: d.tutoring_requests.teachers.name,
                            teacherEmail: d.tutoring_requests.teachers.email,
                    }
            if(d.tutoring_requests.progress=='single'){
                if (!temp[0][d.tutoring_requests.student_id]) {
                    temp[0][d.tutoring_requests.student_id] = []
                }
                temp[0][d.tutoring_requests.student_id].push(t)
            }else{
                if (!temp[1][d.tutoring_requests.student_id]) {
                    temp[1][d.tutoring_requests.student_id] = []
                }
                temp[1][d.tutoring_requests.student_id].push(t)
            }
        }
        }
        setRequests(temp)
        setLoad(false)
    }
    return(
        <div>
            {load && (
                      <div className="modal-overlay">
                  
                  <Loader color="blue" />
                  
                  
                  
            
                </div>
            
                    )}
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
            <Button variant={(mode == 0 )? "filled":"outline"} onClick={()=>{setMode(0)}}>My Tutees</Button>
            <Button variant={(mode == 1 )? "filled":"outline"} onClick={()=>{setMode(1)}}>Tutoring Requests</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width:'60vw', alignContent:'center'}}>
                    <Divider my="md" size="md"/>
                    </div>
                    </div>
            <div>
            {mode==0 && <div>
                {Object.keys(mine[0]).length>0 && <div>
                    <div style={{justifyContent: 'align-start' }}>
                    <Text c= 'dimmed' fz='4vh' >My Students:</Text>
                    </div>
                    <Scroller draggable>
                        <Group gap="xs" wrap="nowrap">
                    {Object.entries(mine[0]).map(([student_id, tutees]) => (
                            <div
                                key={student_id}
                                onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            extra: await getTutorInfo(t.request_id)
                                        }))
                                    )
                                    console.log(posts)
                                    setInfo(posts)
                                }}
                                
                            >
                                <ProfileCard imageSrc={urls[tutees[0].avatar_url]} name={tutees[0].name} classNames={tutees.map(tutoring => tutoring.className).join(', ')} cardType='Active'/>
                                
                            </div>
                ))}
                </Group>
                </Scroller>
                </div>
                }
            {Object.keys(mine[1]).length>0 && <div>
                    <div style={{justifyContent: 'align-start' }}>
                    <Text c= 'dimmed' fz='4vh'>Action Required:</Text>
                    </div>
                    <Scroller draggable>
                        <Group gap="xs" wrap="nowrap">
                    {Object.entries(mine[1]).map(([student_id, tutees]) => (
                            <div
                                key={student_id}
                                 onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            extra: await getTutorInfo(t.request_id)
                                        }))
                                    )
                                    console.log(posts)
                                    setInfo(posts)
                                }}
                            >
                                <ProfileCard imageSrc={urls[tutees[0].avatar_url]} name={tutees[0].name} classNames={tutees.map(tutoring => tutoring.className).join(', ')} cardType='Rejected'/>
                                
                            </div>
                ))}
                </Group>
                </Scroller>
                </div>
                }
            {Object.keys(mine[2]).length>0 && <div>
                    <Text c= 'dimmed' fz='4vh'>Pending:</Text>
                    <Scroller draggable>
                        <Group gap="xs" wrap="nowrap">
                    {Object.entries(mine[2]).map(([student_id, tutees]) => (
                            <div
                                key={student_id}
                               onClick={async () => {
                                    const posts = await Promise.all(
                                        tutees.map(async (t) => ({
                                            ...t,
                                            extra: await getTutorInfo(t.request_id)
                                        }))
                                    )
                                    console.log(posts)
                                    setInfo(posts)
                                }}
                            >
                                
                                <ProfileCard imageSrc={urls[tutees[0].avatar_url]} name={tutees[0].name} classNames={tutees.map(tutoring => tutoring.className).join(', ')} cardType='Pending'/>
                            </div>
                ))}
                </Group>
                </Scroller>
                </div>
                }
                </div>
            }
             {mode==1 && <div>
                {Object.keys(requests[0]).length>0 &&<div>
                    <Text c= 'dimmed' fz='4vh'>Private:</Text>
                    <Scroller draggable>
                        <Group gap="xs" wrap="nowrap">
               {Object.entries(requests[0]).map(([student_id, tutees]) => (
                            <div
                                key={student_id}
                                onClick={() => setInfoShort(tutees)}
                            >
                                <ClassCard className={tutees.map(tutoring => tutoring.className).join(', ')} subject={tutees.map(tutoring => tutoring.subject).join('|')} nature='private'/>
                                
                            </div>
                ))}
                </Group>
                </Scroller>
                </div>
            }
            {Object.keys(requests[1]).length>0&&<div>
                    <Text c= 'dimmed' fz='4vh'>Public:</Text>
                    <Scroller draggable>
                        <Group gap="xs" wrap="nowrap">
               {Object.entries(requests[1]).map(([student_id, tutees]) => (
                            <div
                                key={student_id}
                                onClick={() => setInfoShort(tutees)}
                                style={{
                                    border: '1px solid black',
                                    margin: '5px',
                                    padding: '5px'
                                }}
                            >
                                
                                {tutees.map(tutoring => tutoring.className).join(', ')}
                            </div>
                ))}
                </Group>
                </Scroller>
                </div>
                
            }
            </div>
            }
            </div>
             {info && (
                <Drawer position={'right'} offset={8} radius="md" opened = {info} onClose={()=>{
                    setInfo(false)
                    setCurIndex(0)
                    }}>
                        
                        {info.map((tutoring, index)=>(<div>
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

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%'}} >
                            {info.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button variant={curIndex==index?"filled":"outline"}  onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                            </div>
                                    <p><b>Student contact: </b>{tutoring.email}</p>
                                    <p><b>Teacher: </b>{tutoring.teacherName}</p>
                                    <p><b>Teacher contact: </b>{tutoring.teacherEmail}</p>
                                    <p><b>Meetings:</b></p>
                                    <div style={{paddingLeft:'20px'}}>
                                    {tutoring.extra.times.map((time)=>(
                                            <div key={time}>
                                                <p>{datesDays[time.substring(8,10)]} {datesTimes[time.substring(11,13)][0]}{time.substring(13,16)}{datesTimes[time.substring(11,13)][1]}</p>
                                            </div>
                                        ))}
                                        </div>
                                    <h3>Status: {tutoring.confirmed=='pending'?'awaiting confirmation':tutoring.confirmed=='rejected'?'action required: proposed time rejected':'active'}</h3>
                                        <p><b>Last action:</b> {tutoring.confirmed=='pending'?'You proposed a meeting time on':tutoring.confirmed=='rejected'?tutoring.name+' rejected the time you propsed on':tutoring.name+' accepted your propsed time on'} {tutoring.updated_at.substring(0,10)}</p>
                                        {tutoring.message&&(<p>{tutoring.confirmed=='pending'?'You wrote to '+tutoring.name:tutoring.confirmed=='rejected'?tutoring.name+' wrote to you':tutoring.name+' wrote to you'}: {tutoring.message}</p>)}
                                    <Button 
                                    style={{position:'absolute',bottom:'20px', right:'20px'}}
                                    variant='light'
                                    onClick={()=>{
                                        navigate('/adminSchedule', {state:{
                                            request_id: tutoring.request_id,
                                            name: tutoring.name,
                                            class_id:tutoring.class_id, 
                                            className: tutoring.className, 
                                            email: tutoring.email,
                                            id: tutoring.student_id, 
                                            id2: user.id,
                                            admin:false, 
                                            editable:false}})
                                            }}>Change Schedule</Button>
                                
                                </div>}
                            </div>)
                            
                        )
                            }
                            
                        </Drawer>
                    )
                }
                {infoShort && (
                    <Drawer position={'right'} offset={8} radius="md" opened = {infoShort} onClose={()=>{
                        setInfoShort(false)
                        setCurIndex(0)
                        }}>
                        {infoShort.map((tutoring, index)=>(<div>
                            {curIndex==index && <div>
                                
                                <Text size='40px'>Tutor requested for</Text>
                                <div paddingTop='100px'>
                                <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {tutoring.className}
                    </Text>
                    </div>
                    <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>
                    <div style={{display:'flex', flexDirection: 'row',paddingBottom:'2%'}} >
                            {
                            infoShort.map((tutoring, index)=>(<div key = {tutoring.class_id}><Button variant={curIndex==index?"filled":"outline"} onClick={()=>{setCurIndex(index)}}
                            >{tutoring.className}</Button>
                            </div>))}
                            </div>
                        <p><b>Teacher: </b>{tutoring.teacherName}</p>
                            <p><b>Requested:</b> {tutoring.updated_at.substring(0,10)}</p>
                            {tutoring.message&&(<p>A message from academic skills: {tutoring.message}</p>)}
                            <div style={{position:'absolute',bottom:'20px', right:'20px'}}>
                                    <Button 
                                    variant='light'
                                    style={{marginRight:'5px'}}
                                    onClick={()=>{
                            navigate('/adminSchedule', {state:{
                                name: tutoring.name,
                                class_id:tutoring.class_id, 
                                className: tutoring.className, 
                                email: tutoring.email,
                                request_id: tutoring.request_id, 
                                id: tutoring.student_id, 
                                id2: user.id,
                                admin:false, 
                                editable:false}})
                        }}>Accept</Button><Button 
                                    variant='light'
                                    onClick={()=>{
                                        supabase.from('tutor_match_invites').update({rejected:true}).eq('request_id', tutoring.request_id).eq('tutor_id',user.id).select()
                                        let r = requests
                                        let r0 = r[0][tutoring.student_id]?.filter(item=>item.request_id!=tutoring.request_id)
                                        let r1 = r[1][tutoring.student_id]?.filter(item=>item.request_id!=tutoring.request_id)
                                        if(r0 && r0.length!=r[0].length){
                                            r[0] = Object.entries(r[0]).filter((student_id,tutoring)=>(student_id==tutoring.student_id))
                                            if (r0.length!=0){
                                                r[0].push({student_id:r0})
                                            }
                                        }else{
                                            r[1]=requests[1].filter((student_id,tutoring)=>(student_id!=tutoring.student_id))
                                            if (r1.length!=0){
                                                r[1].push({student_id:r1})
                                            }
                                        }
                                        setRequests(r)
                                        setInfoShort(false)
                                    }}
                                   >Reject</Button>
                                </div>
                                </div>}
                            </div>)
                            
                        )
                            }
                            
                        </Drawer>
                    )
                }
        </div>
        
    )
}