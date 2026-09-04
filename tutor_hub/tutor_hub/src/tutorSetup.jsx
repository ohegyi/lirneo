import './index.css'
import { useState, useEffect } from 'react'
import { Button, Card, Drawer, Grid, Input, Loader, Popover, ScrollArea, Slider, Tabs, Text, TextInput } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
import { supabase } from './lib/supabase'
import './index.css'
//TODO: check CS works w/ highlighting
import { IconInfoCircle } from '@tabler/icons-react';
import { TimePicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import { HugeiconsIcon } from '@hugeicons/react';
import emailjs from '@emailjs/browser';
import { RemoveCircleIcon } from '@hugeicons/core-free-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const icon = <IconInfoCircle />

import biologyImg from './assets/biology.jpg'
import chemistryImg from './assets/chemistry.jpg'
import chineseImg from './assets/chinese.jpg'
import csImg from './assets/computer science.jpg'
import englishImg from './assets/english.png'
import frenchImg from './assets/french.jpg'
import greekImg from './assets/greek.jpg'
import historyImg from './assets/history.jpg'
import latinImg from './assets/latin.jpg'
import mathImg from './assets/math.jpg'
import physicsImg from './assets/physics.jpg'
import spanishImg from './assets/spanish.jpg'
import { notifications } from '@mantine/notifications';
import { useAuth } from './lib/useAuth';
export default function TutorSetup() {
  const navigate=useNavigate()
  const images={
          'biology':biologyImg,
          'ecology':biologyImg,
          'chemistry': chemistryImg,
          'chinese': chineseImg,
          'computer science': csImg,
          'english': englishImg,
          'french':frenchImg,
          'greek':greekImg,
          'history':historyImg,
          'latin':latinImg,
          'math':mathImg,
          'physics':physicsImg,
          'spanish':spanishImg
      }
  const { state } = useLocation();
  const {profile}=useAuth()
  const id = state?.id;
  const name = state?.name;
  const email=state?.email
  const target = state?.target ?? null
  const editable = state?.editable ?? true
  console.log(id,name,email,target)
  const [mySubjects, setMySubjects] = useState([
      {subj:'Science',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Biology', sliderVal:0, backColor:'white'},{subject: 'Ecology', sliderVal:0, backColor:'white'},{subject: 'Chemistry', sliderVal:0, backColor:'white'},{subject: 'Physics', sliderVal:0, backColor:'white'}]},
      {subj:'Math',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Algebra 1', sliderVal:0, backColor:'white'},{subject: 'Algebra 2', sliderVal:0, backColor:'white'},{subject: 'Geometry', sliderVal:0, backColor:'white'},{subject: 'Precalculus', sliderVal:0, backColor:'white'},{subject: 'Calculus', sliderVal:0, backColor:'white'},{subject: 'Statistics', sliderVal:0, backColor:'white'}]},
      {subj:'English',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'English', sliderVal:0, backColor:'white'}]},
      {subj:'History',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Foundations of Global History', sliderVal:0, backColor:'white'},{subject: 'Modern Global History', sliderVal:0, backColor:'white'},{subject: 'United States History', sliderVal:0, backColor:'white'}]},
      {subj:'French',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'French 1', sliderVal:0, backColor:'white'},{subject: 'French 2', sliderVal:0, backColor:'white'},{subject: 'French 3', sliderVal:0, backColor:'white'},{subject: 'French 4', sliderVal:0, backColor:'white'},{subject: 'AP French', sliderVal:0, backColor:'white'},{subject: 'French 6', sliderVal:0, backColor:'white'}]},
      {subj:'Spanish',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Spanish 1', sliderVal:0, backColor:'white'},{subject: 'Spanish 2', sliderVal:0, backColor:'white'},{subject: 'Spanish 3', sliderVal:0, backColor:'white'},{subject: 'Spanish 4', sliderVal:0, backColor:'white'},{subject: 'AP Spanish', sliderVal:0, backColor:'white'},{subject: 'Spanish 6', sliderVal:0, backColor:'white'}]},
      {subj:'Chinese',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Chinese 1', sliderVal:0, backColor:'white'},{subject: 'Chinese 2', sliderVal:0, backColor:'white'},{subject: 'Chinese 3', sliderVal:0, backColor:'white'},{subject: 'Chinese 4', sliderVal:0, backColor:'white'},{subject: 'AP Chinese', sliderVal:0, backColor:'white'},{subject: 'Chinese 6', sliderVal:0, backColor:'white'}]},
      {subj:'Latin',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Latin 1', sliderVal:0, backColor:'white'},{subject: 'Latin 2', sliderVal:0, backColor:'white'},{subject: 'Latin 3', sliderVal:0, backColor:'white'},{subject: 'Latin 4', sliderVal:0, backColor:'white'},{subject: 'AP Latin', sliderVal:0, backColor:'white'},{subject: 'Latin 5', sliderVal:0, backColor:'white'}]},
      {subj:'Greek',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Greek 1', sliderVal:0, backColor:'white'},{subject: 'Greek 2', sliderVal:0, backColor:'white'},{subject: 'Greek 3', sliderVal:0, backColor:'white'}]},
      {subj:'Computer Science',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'AP Computer Science', sliderVal:0, backColor:'white'},{subject: 'Data Structures', sliderVal:0, backColor:'white'}]}
    ])
    
    const heretoThere={
      chemistry:'Science',
      biology:'Science',
      ecology:'Science',
      physics:'Science',

      english:'English',

      french:'French',
      chinese:'Chinese',
      spanish:'Spanish',
      latin:'Latin',
      greek:'Greek',

      history:'History',

      math:'Math',
      'computer science':'Computer Science'

    }
  const [curForm, setCurForm] = useState('0')
  const [curSubject, setCurSubject] = useState('0')
  const [allSet, setAllSet] = useState(0)
  const [ranking, setRanking] = useState(false)
  const [finishSubjects, setFinishSubjects] = useState([])
  const [curClasses, setCurClasses]=useState([])
  const [added, setAdded]=useState([[],[],[],[],[]])
  const [deleted, setDeleted]=useState([])
  const [message, setMessage] = useState('')
  const [myClasses, setMyClasses] = useState([[],[],[],[],[]])
  const [mode, setMode] = useState(!editable?1:0)
  const [curClassId, setCurClassId] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const[menuUp, setMenuUp]=useState(false)
  const [searchItemTeacher, setSearchItemTeacher] = useState('')
  const [filteredItems, setfilteredItems]=useState([])
  const [filteredTeachers, setFilteredTeachers]=useState([])
  const [levelClasses, setLevelClasses] = useState([])
  const [load, setLoad] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [classes,setClasses]=useState([])
  const [user, setUser] = useState(null);
  useEffect(() => {
  const getUser = async () => {
    setLoad(true)
    if (id){
      setUser({'id':id, 'name':name})
      await getDataComfort()
      //await getDataUser(id)
    }else{
      const {profile} = useAuth()
      setUser(profile);
      await getDataUser(profile.id)
    }
    await getClasses()
    await getTeachers()
    setLoad(false)
  };

  getUser();
}, []);

const getClasses=async()=>{
    const {data,error}=await supabase.from('Classes').select()
    let t=[]
    for (const p of data){
        t=[...t, {'id':p.id, 'name':p.name, 'subject':p.subject}]
    }
    setClasses(t)
    return true
}
const getTeachers=async()=>{
    const {data,error}=await supabase.from('teachers').select()
    let t=[]
    for (const p of data){
        t=[...t, {'id':p.id, 'name':p.name, 'email':p.email}]
    }
    setTeachers(t)
    return true
}
const handleClick = async(classItem)=>{
  if (myClasses[parseInt(curForm)].filter(item=>classItem.id==item.id).length==0){
    setMyClasses(prev =>
  prev.map((class1, form) =>
    form === parseInt(curForm)
      ? [...class1, { ...classItem, teacherName: '', teacherID: '', backColor:'white'}]
      : class1
  )
  
)
setAdded(prev =>
  prev.map((class1, form) =>
    form === parseInt(curForm)
      ? [...class1, { ...classItem, teacherName: '', teacherID: '', backColor:'white'}]
      : class1
  )
  
)
  }else{
    notifications.show({
      title:'You already added this class'
    })
  }
  
  setSearchItem('')
}

const makeSupabaseReady=()=>{
  let temp={'tutor_id': user.id}
  for (const subject of mySubjects){
    for (const val of subject.val){
      temp={...temp, [val.subject.toLocaleLowerCase()]: val.sliderVal}
    }
  }
  return temp
}
const addStudentInfo = async()=>{
  const d = makeSupabaseReady()
      const {data, error}=await supabase.from('tutors_classes_comfort').upsert(d)
      for (const d of deleted){
        deleteStudentClass(d)
      }
    return 
}
const deleteStudentClass=async(classid)=>{
  await supabase.from('tutor_class').delete().eq('tutor_id', profile.id).eq('class_id', classid)
}
const addStudentClass = async(classid,index,teacher)=>{
        const {data,error}=await supabase.from('tutor_class').upsert({
            tutor_id: profile.id,
            class_id:classid,
            years_ago: index,
            teacher_name:teacher
          }, {onConflict:'tutor_id,class_id'})
          return
}
const handleUploadData=async()=>{
  setAllSet(true)
  if (profile.role=='student'){
      await supabase.from('profiles').update({role: 'tutor'}).eq('id', user.id)
  }else if(profile.role=='tutor'){
          await supabase.from('profiles').update({role: 'tutorUpdated'}).eq('id', user.id)
  }
  await addStudentInfo()
  for (let form=0; form<added.length; form++){
    for (const classItem of added[form]){
      await addStudentClass(classItem.id, form, classItem.teacherName)
    }
  }
  navigate('/Home')
  notifications.show({
      title: 'Tutor Application Submitted',
  })
}
const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    setfilteredItems(classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || classItem.subject.toLowerCase().includes(searchTerm.toLowerCase())
    ));


  }
  const handleInputChangeTeacher = (e, classId) => { 
    setMyClasses(prev =>
    prev.map((class1, form) =>
      form === parseInt(curForm)
        ? class1.map(item =>
            item.id === classId
              ? { ...item, teacherName: e.target.value, teacherID: '',backColor:'white'}
              : item
          )
        : class1
    )
  );
  setAdded(prev =>
    prev.map((class1, form) =>
      form === parseInt(curForm)
        ? class1.map(item =>
            item.id === classId
              ? { ...item, teacherName: e.target.value, teacherID: '',backColor:'white'}
              : item
          )
        : class1
    )
  );
  
    const searchTerm = e.target.value;
    setSearchItemTeacher(searchTerm)

    setFilteredTeachers(teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));


  }
  const getDataUser=async(id1)=>{
    let l = [[],[],[],[],[]]
    const { data, error } = await supabase
  .from('tutor_class')
  .select('*,Classes(*)')
  .eq('tutor_id', id1)
    for (const d of data){
      let t = d.Classes.subject.split(' ')
     l[d.years_ago].push(
       {
      'id': d.class_id,
      'teacherName': d.teacher_name,
      'name': d.Classes.name,
      'subject': t[t.length-1]=='science' ? t[t.length-2]+' '+t[t.length-1]: t[t.length-1],
      'level': d.Classes.level
    }
     )
}
    setMyClasses(l)
    }
const handleSliderChangeBig=(newValue, bigName)=>{
  if(!editable){
    setFinishSubjects(prev =>
    prev.map(subject =>
      subject.subj === bigName
        ? { ...subject, pressed:true, sliderVal:newValue}
        : { ...subject, pressed:false}
    )
  );
  }else{
      setMySubjects(prev =>
    prev.map(subject =>
      subject.subj === bigName
        ? { ...subject, pressed:true, sliderVal:newValue, val: subject.val.map(val1 =>

              ({ ...val1, sliderVal: newValue,backColor:newValue<=50?`rgba(255,${(newValue)*(255/50)},0,${(50-newValue)/50+0.5})`:`rgba(${(100-newValue)*(255/50)},255, 0,${(newValue-50)/100+0.5})` })
        
          )}
        : { ...subject, pressed:false}
    )
  );
  }
}

const handleSliderChange=(newValue, bigName, littleName)=>{
  setMySubjects(prev =>
    prev.map(subject =>
      subject.subj === bigName
        ? { ...subject, val: subject.val.map(val1 =>
            val1.subject ==littleName
              ? { ...val1, sliderVal: newValue,backColor:newValue<=50?`rgba(255,${(newValue)*(255/50)},0,${(50-newValue)/50+0.5})`:`rgba(${(100-newValue)*(255/50)},255, 0,${(newValue-50)/100+0.5})` }
              : val1
          )}
        : subject
    )
  );
}

  const handleFinished=async()=>{
    setRanking(true)
  }



  const getDataComfort=async()=>{
    const { data, error } = await supabase.from('tutors_classes_comfort').select().eq('tutor_id', id)
    if(data){

    let t =[
      {subj:'Science',pressed:false,classesTaken:[],val:[{subject: 'Biology', sliderVal:data[0].biology, backColor:'white'},{subject: 'Ecology', sliderVal:data[0].ecology, backColor:'white'},{subject: 'Chemistry', sliderVal:data[0].chemistry, backColor:'white'},{subject: 'Physics', sliderVal:data[0].physics, backColor:'white'}]},
      {subj:'Math',pressed:false,classesTaken:[],val:[{subject: 'Algebra 1', sliderVal:data[0]['algebra 1'], backColor:'white'},{subject: 'Algebra 2', sliderVal:data[0]['algebra 2'], backColor:'white'},{subject: 'Geometry', sliderVal:data[0].geometry, backColor:'white'},{subject: 'Precalculus', sliderVal:data[0].precalculus, backColor:'white'},{subject: 'Calculus', sliderVal:data[0].calculus, backColor:'white'},{subject: 'Statistics', sliderVal:data[0].statistics, backColor:'white'}]},
      {subj:'English',pressed:false,classesTaken:[],val:[{subject: 'English', sliderVal:data[0].english, backColor:'white'}]},
      {subj:'History',pressed:false,classesTaken:[],val:[{subject: 'Foundations of Global History', sliderVal:data[0]['foundations of global history'], backColor:'white'},{subject: 'Modern Global History', sliderVal:data[0]['modern global history'], backColor:'white'},{subject: 'United States History', sliderVal:data[0]['united states history'], backColor:'white'}]},
    ]
    setFinishSubjects([
      {subj:'English',sliderVal:0,pressed:false},
      {subj:'Math',sliderVal:0,pressed:false},
      {subj:'History',sliderVal:0,pressed:false}
      ])    
    if (data[0]['chemistry']!=0){
      setFinishSubjects(prev=>[...prev, {subj:'Chemistry',classesTaken:[],sliderVal:0,pressed:false}])
    }
    if (data[0]['physics']!=0){
      setFinishSubjects(prev=>[...prev, {subj:'Physics',classesTaken:[],sliderVal:0,pressed:false}])
    }
    if (data[0]['biology']!=0){
      setFinishSubjects(prev=>[...prev, {subj:'Biology',classesTaken:[],sliderVal:0,pressed:false}])
    }
    if (data[0]['ecology']!=0){
      setFinishSubjects(prev=>[...prev, {subj:'Ecology',classesTaken:[],sliderVal:0,pressed:false}])
    }
    if (data[0]['french 1']!=0){
      t=[...t, {subj:'French',pressed:false,classesTaken:[],val:[{subject: 'French 1', sliderVal:data[0]['french 1'], backColor:'white'},{subject: 'French 2', sliderVal:data[0]['french 2'], backColor:'white'},{subject: 'French 3', sliderVal:data[0]['french 3'], backColor:'white'},{subject: 'French 4', sliderVal:data[0]['french 4'], backColor:'white'},{subject: 'AP French', sliderVal:data[0]['ap french'], backColor:'white'},{subject: 'French 6', sliderVal:data[0]['french 6'], backColor:'white'}]}]
      setFinishSubjects(prev=>[...prev, {subj:'French',classesTaken:[],sliderVal:0,pressed:false}])
    }if (data[0]['spanish 1']!=0){
      t=[...t, {subj:'Spanish',pressed:false,classesTaken:[],val:[{subject: 'Spanish 1', sliderVal:data[0]['spanish 1'], backColor:'white'},{subject: 'Spanish 2', sliderVal:data[0]['spanish 2'], backColor:'white'},{subject: 'Spanish 3', sliderVal:data[0]['spanish 3'], backColor:'white'},{subject: 'Spanish 4', sliderVal:data[0]['spanish 4'], backColor:'white'},{subject: 'AP Spanish', sliderVal:data[0]['ap spanish'], backColor:'white'},{subject: 'Spanish 6', sliderVal:data[0]['spanish 6'], backColor:'white'}]},]
      setFinishSubjects(prev=>[...prev,{subj:'Spanish',sliderVal:0,pressed:false}])
    }if (data[0]['chinese 1']!=0){
      t=[...t, {subj:'Chinese',pressed:false,classesTaken:[],val:[{subject: 'Chinese 1', sliderVal:data[0]['chinese 1'], backColor:'white'},{subject: 'Chinese 2', sliderVal:data[0]['chinese 2'], backColor:'white'},{subject: 'Chinese 3', sliderVal:data[0]['chinese 3'], backColor:'white'},{subject: 'Chinese 4', sliderVal:data[0]['chinese 4'], backColor:'white'},{subject: 'AP Chinese', sliderVal:data[0]['ap chinese'], backColor:'white'},{subject: 'Chinese 6', sliderVal:data[0]['chinese 6'], backColor:'white'}]}]
      setFinishSubjects(prev=>[...prev,{subj:'Chinese',sliderVal:0,pressed:false}])
    }if (data[0]['latin 1']!=0){
      t=[...t, {subj:'Latin',pressed:false,classesTaken:[],val:[{subject: 'Latin 1', sliderVal:data[0]['latin 1'], backColor:'white'},{subject: 'Latin 2', sliderVal:data[0]['latin 2'], backColor:'white'},{subject: 'Latin 3', sliderVal:data[0]['latin 3'], backColor:'white'},{subject: 'Latin 4', sliderVal:data[0]['latin 4'], backColor:'white'},{subject: 'AP Latin', sliderVal:data[0]['ap latin'], backColor:'white'},{subject: 'Latin 5', sliderVal:data[0]['latin 5'], backColor:'white'}]}]
      setFinishSubjects(prev=>[...prev,{subj:'Latin',sliderVal:0,pressed:false}])
    }if (data[0]['greek 1']!=0){
      t=[...t, {subj:'Greek',pressed:false,classesTaken:[],val:[{subject: 'Greek 1', sliderVal:data[0]['greek 1'], backColor:'white'},{subject: 'Greek 2', sliderVal:data[0]['greek 2'], backColor:'white'},{subject: 'Greek 3', sliderVal:data[0]['greek 3'], backColor:'white'}]}]
      setFinishSubjects(prev=>[...prev,{subj:'Greek',sliderVal:0,pressed:false}])
    }if (data[0]['ap computer science']!=0 && data[0]['data structures']!=0){
      t=[...t, {subj:'Computer Science',classesTaken:[],pressed:false,val:[{subject: 'AP Computer Science', sliderVal:data[0]['ap computer science'], backColor:'white'},{subject: 'Data Structures', sliderVal:data[0]['data structures'], backColor:'white'}]}]
      setFinishSubjects(prev=>[...prev,{subj:'Computer Science',sliderVal:0,pressed:false}])
    }
    getStudentClasses(t)

  }
}
const getStudentClasses=async(x)=>{
    const {data,error}=await supabase.from('tutor_class').select(('Classes(*), years_ago, teacher_name')).eq('tutor_id',id)
    let t=[[],[],[],[],[]]
    let levels={'science':0,'math':0,'english':0,'history':0,'french':0,'mandarin':0,'spanish':0,'latin':0,'greek':0,'cs':0}
    let subj=''
    let j=x
    for (const p of data){
      subj = p.Classes.subject
      j=j.map(subject =>{
          if (subject.subj.toLowerCase() === 'science'){
            if (subj =='biology' || subj =='chemsitry'|| subj =='physics'||subj =='ecology'){
              return {...subject, classesTaken: [
                      ...subject.classesTaken,
                      {
                        id: p.Classes.id,
                        name: p.Classes.name,
                        subject: p.Classes.subject,
                        teacherName: p.teacher_name,
                        backColor: 'white'
                      }
                    ]
                  }
            }
          }
          if (subject.subj.toLowerCase() === subj){
            return {...subject, classesTaken: [
                      ...subject.classesTaken,
                      {
                        id: p.Classes.id,
                        name: p.Classes.name,
                        subject: p.Classes.subject,
                        teacherName: p.teacher_name,
                        backColor: 'white'
                      }
                    ]
                  }
          }else{
              return subject
          }
        }
      );
      levels[subj] = levels[subj] < p.Classes.level ? p.Classes.level : levels[subj]
      t[p.years_ago]=[...t[p.years_ago], { 'id':p.Classes.id, 'name':p.Classes.name, 'subject':p.Classes.subject, teacherName: p.teacher_name, backColor:'white'}]

      }
    setLevelClasses(levels)
     if (target){
      setCurSubject(heretoThere[target])
      j=j.map((item)=>{
        if (item.subj == heretoThere[target]){
          console.log('SUBJECT',item)
          setCurClasses(item.classesTaken)
          return {...item, pressed:true}
        }else{
          return item
        }
      })
    }
    setMySubjects(j)
    setMyClasses(t)
    return true
  }
const sendAdminEmail=async(action)=>{
        const templateParams = {
                name : name,
                action: action,
                email: email,
                note: message?'A note from '+ profile.name+": "+message:''
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_za9ykla',
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
const handleUploadDataAdmin=async()=>{
  let t={tutor_id: id}
  for (const sub of finishSubjects){
    t[sub.subj.toLowerCase()]=String(levelClasses[sub.subj.toLowerCase()]||0)+' '+String(finishSubjects.find(f=>f.subj==sub.subj).sliderVal)
  }
  await supabase.from('tutors').upsert(t)
  await supabase.from('profiles').update({ role: 'tutorConfirmed' }).eq('id', id)
  navigate('/Home')
  notifications.show({
      title: 'Tutor Application Closed',
   })
   sendAdminEmail('approved')
  return
}
const handleRejectAdmin=async()=>{
  await supabase.from('profiles').update({ role: 'student' }).eq('id', id)
  await supabase.from('tutors').delete().eq('id', tutor_id)
  await supabase.from('tutors').delete().eq('id', tutor_id)
  navigate('/Home')
  notifications.show({
      title: 'Tutor Application Closed',
   })
   sendAdminEmail('rejected')
  return
}
return (


            <div>
              <div style={{paddingTop:'40px',paddingBottom:'40px'}}>
        <Text
                    component="span"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='10vh'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                    >
                    {editable?'Class Registration': 'Tutor Profile: '+name}
                    </Text>
        {editable && <Button variant = 'light' style={{position:'absolute', bottom:'20px', right:'20px'}} onClick={handleFinished}>All set</Button>}
        {!editable && <Button variant = 'outline' onClick={()=>{setMenuUp(true)}} style={{position:'absolute', bottom:'20px', right:'20px'}}><IconChevronLeft stroke={2} /></Button>}
        </div>
        <div>
          {!editable&&<div style={{display:'flex', gap:'2px',justifyContent:'center'}}>
            <Button onClick={()=>{
          setMode(1)
          }} variant={(mode == 1 )? "filled":"outline"}>By Subject</Button>
        <Button onClick={()=>{setMode(0)
        }} variant={(mode == 0 )? "filled":"outline"}>By Form</Button>
        </div>}
          {(mode==1 && !editable)&&<div>
       
            <Tabs defaultValue="gallery" value={curSubject} onChange={setCurSubject}>
      <Tabs.List>
        
      {mySubjects.map(subject => (
          <Tabs.Tab key = {subject.subj} onClick={()=>{
          if (subject.pressed==false){
            setCurClasses(subject.classesTaken)
            setMySubjects(prev =>
              prev.map(a =>
                a === subject
                  ? 
                  { ...a, pressed: true}
                  : { ...a, pressed: false }
              )
            );
          }else{
            setCurClasses([])
            setMySubjects(prev =>
              
              prev.map(a =>
                a === subject
                  ? 
                  { ...a, pressed: false}
                  : a
              )
            );
          }
          //subject.pressed=true
          //subject.backColor='#c9e9f6'
          }} value={subject.subj}>{subject.subj}</Tabs.Tab>
          
      ))}
      </Tabs.List>
        </Tabs>
        
<div style={{display:'flex', justifyContent:'center', padding:'10px'}}>
  <Card style={{width:'40%', height:'20%', backgroundColor:'#d0fff6ff'}}>
        {mySubjects.map(subject=>(
          <div key = {subject.subj}>
          {subject.pressed && subject.val.map(s => (
            <div key={s.subject} style={{display:'flex', flexDirection:'row', alignItems:'center', marginRight:'20px'}}>
             <div style={{marginRight:'10px', width:'55%'}}> <Text truncate="end">{s.subject}</Text></div>
              <Slider
                color={s.sliderVal <= 50 ? `rgba(255,${(s.sliderVal)*(255/50)},0,${(50-s.sliderVal)/50+0.5})`:`rgba(${(100-s.sliderVal)*(255/50)},255, 0,${(s.sliderVal-50)/100+0.5})`}
                style={{width:'40%', position:'absolute', right:'5%'}}
                value={s.sliderVal}
                onChange={(newValue) => {if(editable)handleSliderChange(newValue, subject.subj, s.subject)}}
              />
            </div>
          ))}
        </div>))}
        </Card>
        </div>
        <Grid align="stretch" style={{width:'100%'}}>
        
    {curClasses
  .map(o => (
     <Grid.Col key = {o.id} span={{ base: 12, md: 4, lg: 3 }} style={{
  display: 'flex',
  justifyContent: 'center',
}}>
    <Card  miw = '200px' maw='250px' padding="0" style={{ miw:'250px', containerType: 'inline-size',width: '100%', aspectRatio: '16 / 9', backgroundColor:'white', color:'black', borderColor:'#cbcbcbff'}} withBorder orientation="horizontal">
    <img src={images[o.subject]}
    style={{width:'100cqw', height:'auto', position:'absolute', bottom:'40%'}}
    />
    <div style={{position:'absolute', bottom:0, width: '100cqw'}}>
      <div style={{display:'flex', alignItems:'flex-start', paddingLeft:'3cqw'}}>
        <Text
        component="span"
        align="center"
        variant="gradient"
        weight={700}
        size='md'
        truncate="end"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >{o.name}</Text>
        </div>
        {(!editable && o.teacherName)&&<div style={{display:'flex', alignItems:'center', paddingLeft:'3cqw', gap:'2px'}}>
          <Text c='dimmed' size='sm'>Teacher:</Text>
          <div style={{width:'70cqw'}}>
        <TextInput
        styles={{input: {
      backgroundColor: o.backColor,
      height: '12%',
      minHeight: '10px',
    }}}
        type="text"
        value={o.teacherName}
        readOnly
        />
        </div>
        </div>}
        </div>
        <div style={{width:'100px'}}>
       
    </div>
    </Card>
    </Grid.Col>
))}
</Grid>
<Drawer opened = {menuUp} position={'right'} offset={8} radius="md" onClose={setMenuUp}>
  <div style={{height:'100%'}}>
      
       <Text
        component="span"
        align="center"
        variant="gradient"
        weight={700}
        size='5vh'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >Approve {name} to be a tutor in...</Text>
      {finishSubjects.map(subject => (
        <div key={subject.subj}style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'10px'}}>
          <p onClick={()=>{
            
          }}>{subject.subj}</p>
          <Slider
          color={subject.sliderVal<=50?`rgba(255,${(subject.sliderVal)*(255/50)},0,${(50-subject.sliderVal)/50+0.5})`:`rgba(${(100-subject.sliderVal)*(255/50)},255, 0,${(subject.sliderVal-50)/100+0.5})`}
                style={{width:'200px'}}
                value={subject.sliderVal}
                onChange={(newValue) => handleSliderChangeBig(newValue, subject.subj)}
          />
        
        </div>
      ))}
      <div stle={{paddingBottom:'20px'}}>
      <TextInput label={"Message to " +name} style={{height:'30px'}}value={message} onChange={(e) => setMessage(e.target.value)}/>
        </div>
      <div style={{display:'flex', gap:'10px',justifyContent:'flex-end', paddingTop:'50px'}}>
      <Button variant='light' onClick={handleUploadDataAdmin}>Approve</Button>
      <Button variant='light' color='red' onClick={handleRejectAdmin}>Reject</Button>
      </div>
      </div>
      </Drawer>

</div>}

{mode==0&&<div>
 <div>
          <Tabs defaultValue="gallery" value={curForm} onChange={setCurForm}>
      <Tabs.List>
        {(editable || myClasses[0].length!=0)&&<Tabs.Tab value={'0'}>Second Form</Tabs.Tab>}
        {(editable || myClasses[1].length!=0)&&<Tabs.Tab value={'1'}>Third Form</Tabs.Tab>}
        {(editable || myClasses[2].length!=0)&&<Tabs.Tab value={'2'}>Fourth Form</Tabs.Tab>}
        {(editable || myClasses[3].length!=0)&&<Tabs.Tab value={'3'}>Fifth Form</Tabs.Tab>}
        {(editable || myClasses[4].length!=0)&&<Tabs.Tab value={'4'}>Sixth Form</Tabs.Tab>}
        </Tabs.List>
        </Tabs>
        </div>
        <>
        <div style={{display:'flex',justifyContent:'center', width:'100%', paddingTop:'20px'}}>
        {editable && <form style={{width:'30vw'}}>
          <Popover opened={searchItem} onChange={(opened)=>{
              if(!opened){
               setSearchItem('')
              }
            }}>
      <Popover.Target>
          <TextInput
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
    </Popover.Target>
     {filteredItems.length>0 && <Popover.Dropdown>
      <ScrollArea mih = '40px'mah ='200px' h={`${filteredItems.length*35}px`} width="target" p="xs">
            {filteredItems
  .map(o => (
    <div key={o.id} onClick={() => handleClick(o)} >
        <Text truncate="end">{o.name}</Text>
    </div>
))}
</ScrollArea>
     </Popover.Dropdown>}
    </Popover>
      </form>}
      </div>

    </>
        
        
        
        
        {load && (
          <div className="modal-overlay">
      
      <Loader color="blue" />
      
      

    </div>

        )}
          <Drawer opened = {ranking} position={'right'} offset={8} radius="md" onClose={setRanking}>
            <div style={{height:'100%'}}>
      <Text
        component="span"
        align="center"
        variant="gradient"
        weight={700}
        size='5vh'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >Here's how willing I'd be to tutor in...</Text>

      {mySubjects.map(subject => (
        <div key={subject.subj}style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'10px'}}>
          <p onClick={()=>{
          if (!subject.pressed){
            setMySubjects(prev =>
              prev.map(a =>
                a === subject
                  ? 
                  { ...a, pressed: true}
                  : { ...a, pressed: false}
              )
            );
          }else{
            setMySubjects(prev =>
              prev.map(a =>
                a === subject
                  ? 
                  { ...a, pressed: false}
                  : a
              )
            );
          }
            
          }}>{subject.subj}</p>
          <Popover withArrow position='right' opened={subject.pressed && subject.subj!='English'}  onChange={(opened)=>{
              if(!opened){
                setMySubjects(prev =>
              prev.map(a =>
                a === subject
                  ? 
                  { ...a, pressed: false}
                  : a
              )
            );
              }
            }}
          >
            <Popover.Target>
          <Slider
          color={'black'}
            label={null}
                style={{width:'200px'}}
                value={subject.sliderVal}
                onChange={(newValue) => handleSliderChangeBig(newValue, subject.subj)}
          />
          </Popover.Target>
          <Popover.Dropdown>
          {
            subject.val.map(s => (
            <div key={s.subject} style={{display:'flex', flexDirection:'row', alignItems:'center', marginRight:'20px'}}>
              <p style={{marginRight:'10px'}}>{s.subject}</p>
              <Slider
              label={null}
                color={s.backColor}
                style={{width:'200px'}}
                value={s.sliderVal}
                onChange={(newValue) => handleSliderChange(newValue, subject.subj, s.subject)}
              />
            </div>
          ))}
          </Popover.Dropdown>
          </Popover>
        </div>
      ))}
      <div style={{display:'flex', justifyContent:'flex-end', paddingTop:'10px'}}>
                    <Button variant = 'light' onClick={handleUploadData} >All Set</Button>
      </div>
      </div>
      </Drawer>
        <div style={{width:'100%', display:'flex', justifyContent:'center', paddingTop:'20px'}}>
        <div style={{width: '96%'}}>
        <Grid align="stretch" style={{width:'100%'}}>
        {myClasses[parseInt(curForm)]
  .map(o => (
    <Grid.Col span={{ base: 12, md: 4, lg: 3 }} style={{
  display: 'flex',
  justifyContent: 'center',
}}>
  
    <Card key = {o.id} miw = '200px' maw='250px' padding="0" style={{ miw:'250px', containerType: 'inline-size',width: '100%', aspectRatio: '16 / 9', backgroundColor:'white', color:'black', borderColor:'#cbcbcbff'}} withBorder orientation="horizontal">
    <img src={images[o.subject]}
    style={{width:'100cqw', height:'auto', position:'absolute', bottom:'40%'}}
    />
     {editable && <HugeiconsIcon style={{color:'white', position:'absolute', top:'5%', right:'5cqw'}} icon={RemoveCircleIcon} onClick={()=>{
        setDeleted(prev=>[...prev, o.id])
        setAdded(prev =>
              prev.map((form,i) =>
                i == parseInt(curForm)
                  ? 
                  form.filter(item => item.id!== o.id)
                  : form
              )
        );
        setMyClasses(prev =>
              prev.map((form,i) =>
                i == parseInt(curForm)
                  ? 
                  form.filter(item => item.id!== o.id)
                  : form
              )
            );

      }}/>}
    <div style={{position:'absolute', bottom:0, width: '100cqw'}}>
      <div style={{display:'flex', alignItems:'flex-start', paddingLeft:'3cqw'}}>
        <Text
        component="span"
        align="center"
        variant="gradient"
        weight={700}
        size='md'
        truncate="end"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >{o.name}</Text>
        </div>
        <div style={{display:'flex', alignItems:'center',paddingLeft:'3cqw', gap:'2px'}}>
          <Text c='dimmed' size='sm'>Teacher:</Text>
          <div style={{width:'70cqw'}}>
            <Popover opened={searchItemTeacher && curClassId==o.id} onChange={(opened)=>{
              if(!opened){
                setSearchItemTeacher('')
              }
            }}>
      <Popover.Target>
        <TextInput
        styles={{input: {
      backgroundColor: o.backColor,
      height: '12%',
      minHeight: '10px',
    }}}
        type="text"
        value={myClasses[parseInt(curForm)].find(item => item.id === o.id).teacherName}
        onChange={(e)=>{
          if(editable){
            setCurClassId(o.id)
          handleInputChangeTeacher(e, o.id)
          }
      }}
        />
        </Popover.Target>
        {filteredTeachers.length>0 &&<Popover.Dropdown>
            <ScrollArea mih = '40px' mah ='200px' h={`${filteredTeachers.length*35}px`} width="target" p="xs">
          {filteredTeachers
  .map(p => (
    <div key={p.id} onClick={() => {
      setMyClasses(prev =>
    prev.map((class1, form) =>
      form === parseInt(curForm)
        ? class1.map(item =>
            item.id === curClassId
              ? { ...item, teacherID: p.id, teacherName: p.name }
              : item
          )
        : class1
    )
  );
      setAdded(prev =>
        prev.map((class1, form) =>
          form === parseInt(curForm)
            ? class1.map(item =>
                item.id === curClassId
                  ? { ...item, teacherName: p.name, teacherID:p.id}
                  : item
              )
            : class1
        )
      );
      setSearchItemTeacher('')
    }}>
        <Text truncate="end">{p.name}</Text>
    </div>
))}
</ScrollArea>
        </Popover.Dropdown>}
        </Popover>
        </div>
        </div>
        </div>
        <div style={{width:'100px'}}>
       
    </div>
    </Card>
    </Grid.Col>
))}
</Grid>
</div>
</div>
</div>}

        
        
        </div>
      </div>


      
    )
    
  
  }


  
  

    