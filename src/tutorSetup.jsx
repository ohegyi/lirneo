import './index.css'
import { useState, useEffect } from 'react'
import { Button, Card, Drawer, Grid, Input, Loader, Popover, ScrollArea, Slider, Tabs, Text, TextInput } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
import { supabase } from './lib/supabase'
import './index.css'
import { IconInfoCircle } from '@tabler/icons-react';
import { TimePicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import { HugeiconsIcon } from '@hugeicons/react';
import emailjs from '@emailjs/browser';
import { ProfileFreeIcons, RemoveCircleIcon } from '@hugeicons/core-free-icons';
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
import { CornerDownLeft } from 'lucide-react';
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
  
  const [mySubjects, setMySubjects] = useState([
      {subj:'Science',sliderVal:0,backColor:'white',pressed:false,val:[{subject: 'Biology', sliderVal:0, backColor:'white'},{subject: 'Ecology', sliderVal:0, backColor:'white'},{subject: 'Chemistry', sliderVal:0, backColor:'white'},{subject: 'Physics', sliderVal:0, backColor:'white'}]},
      {subj:'Math',sliderVal1:0,backColor:'white',pressed:false,val:[{subject: 'Algebra 1', sliderVal:0, backColor:'white'},{subject: 'Algebra 2', sliderVal:0, backColor:'white'},{subject: 'Geometry', sliderVal:0, backColor:'white'},{subject: 'Precalculus', sliderVal:0, backColor:'white'},{subject: 'Calculus', sliderVal:0, backColor:'white'},{subject: 'Statistics', sliderVal:0, backColor:'white'}]},
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
  const [subjectsMain, setSubjectsMain] = useState([])
  const [ranking, setRanking] = useState(false)
  const [finishSubjects, setFinishSubjects] = useState([])
  const [curClasses, setCurClasses]=useState([])
  const [readyAdmin,setReadyAdmin]=useState(true)
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
      if(profile.role=='admin'||profile.teacher_id!=null){
        await getDataComfort()
      }else{
       getStudentClasses([
  {subj:'Science',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Biology',sliderVal:0,backColor:'white'},
    {subject:'Ecology',sliderVal:0,backColor:'white'},
    {subject:'Chemistry',sliderVal:0,backColor:'white'},
    {subject:'Physics',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Math',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Algebra 1',sliderVal:0,backColor:'white'},
    {subject:'Algebra 2',sliderVal:0,backColor:'white'},
    {subject:'Geometry',sliderVal:0,backColor:'white'},
    {subject:'Precalculus',sliderVal:0,backColor:'white'},
    {subject:'Calculus',sliderVal:0,backColor:'white'},
    {subject:'Statistics',sliderVal:0,backColor:'white'}
  ]},
  {subj:'English',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'English',sliderVal:0,backColor:'white'}
  ]},
  {subj:'History',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Foundations of Global History',sliderVal:0,backColor:'white'},
    {subject:'Modern Global History',sliderVal:0,backColor:'white'},
    {subject:'United States History',sliderVal:0,backColor:'white'}
  ]},
  {subj:'French',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'French 1',sliderVal:0,backColor:'white'},
    {subject:'French 2',sliderVal:0,backColor:'white'},
    {subject:'French 3',sliderVal:0,backColor:'white'},
    {subject:'French 4',sliderVal:0,backColor:'white'},
    {subject:'AP French',sliderVal:0,backColor:'white'},
    {subject:'French 6',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Spanish',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Spanish 1',sliderVal:0,backColor:'white'},
    {subject:'Spanish 2',sliderVal:0,backColor:'white'},
    {subject:'Spanish 3',sliderVal:0,backColor:'white'},
    {subject:'Spanish 4',sliderVal:0,backColor:'white'},
    {subject:'AP Spanish',sliderVal:0,backColor:'white'},
    {subject:'Spanish 6',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Chinese',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Chinese 1',sliderVal:0,backColor:'white'},
    {subject:'Chinese 2',sliderVal:0,backColor:'white'},
    {subject:'Chinese 3',sliderVal:0,backColor:'white'},
    {subject:'Chinese 4',sliderVal:0,backColor:'white'},
    {subject:'AP Chinese',sliderVal:0,backColor:'white'},
    {subject:'Chinese 6',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Latin',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Latin 1',sliderVal:0,backColor:'white'},
    {subject:'Latin 2',sliderVal:0,backColor:'white'},
    {subject:'Latin 3',sliderVal:0,backColor:'white'},
    {subject:'Latin 4',sliderVal:0,backColor:'white'},
    {subject:'AP Latin',sliderVal:0,backColor:'white'},
    {subject:'Latin 5',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Greek',sliderVal:0,pressed:false,classesTaken:[],val:[
    {subject:'Greek 1',sliderVal:0,backColor:'white'},
    {subject:'Greek 2',sliderVal:0,backColor:'white'},
    {subject:'Greek 3',sliderVal:0,backColor:'white'}
  ]},
  {subj:'Computer Science',sliderVal:0,classesTaken:[],pressed:false,val:[
    {subject:'AP Computer Science',sliderVal:0,backColor:'white'},
    {subject:'Data Structures',sliderVal:0,backColor:'white'}
  ]}
])
      }
    }else{
      const {profile} = useAuth()
      setUser(profile);
      await getDataUser(profile.id)
    }
    if (editable){
      await getClasses()
      await getTeachers()
    }
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
      temp={...temp, [val.subject.toLocaleLowerCase()]: subject.sliderVal==0?'0 1':`${val.sliderVal} 1`}
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
  let t ='new'
  navigate('/home')
  if (profile.role=='student'||profile.role=='tutor'){
      await supabase.from('profiles').update({role: 'tutor'}).eq('id', user.id)
  }else if(profile.role=='tutorConfirmed'||profile.role=='tutorUpdated'){
      await supabase.from('profiles').update({role: 'tutorUpdated'}).eq('id', user.id)
      t='update'
  }
  await addStudentInfo()
  console.log(added)
  for (let form=0; form<added.length; form++){
    for (const classItem of added[form]){
      await addStudentClass(classItem.id, form, classItem.teacherName)
    }
  }
  sendEmailsNewTutor(t)
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
        ? class1.some(item=>item.id==classId)?
        class1.map(item =>
            item.id === classId
              ? { ...item, teacherName: e.target.value}:item):[...class1,{id:classId, teacherName: e.target.value}]
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
    console.log('getDataComfort')
    const { data, error } = await supabase.from('tutors_classes_comfort').select().eq('tutor_id', id).maybeSingle()
    if(data){
    const valtoSubj={
      'science':{subj:'Science',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Biology', sliderVal:parseInt(data.biology.split(' ')[0]), backColor:'white'},{subject: 'Ecology', sliderVal:parseInt(data.ecology.split(' ')[0]), backColor:'white'},{subject: 'Chemistry', sliderVal:parseInt(data.chemistry.split(' ')[0]), backColor:'white'},{subject: 'Physics', sliderVal:parseInt(data.physics.split(' ')[0]), backColor:'white'}]},
      'math':{subj:'Math',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Algebra 1', sliderVal:parseInt(data['algebra 1'].split(' ')[0]), backColor:'white'},{subject: 'Algebra 2', sliderVal:parseInt(data['algebra 2'].split(' ')[0]), backColor:'white'},{subject: 'Geometry', sliderVal:parseInt(data.geometry.split(' ')[0]), backColor:'white'},{subject: 'Precalculus', sliderVal:parseInt(data.precalculus.split(' ')[0]), backColor:'white'},{subject: 'Calculus', sliderVal:parseInt(data.calculus.split(' ')[0]), backColor:'white'},{subject: 'Statistics', sliderVal:parseInt(data.statistics.split(' ')[0]), backColor:'white'}]},
      'english':{subj:'English',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'English', sliderVal:parseInt(data.english.split(' ')[0]), backColor:'white'}]},
      'history':{subj:'History',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Foundations of Global History', sliderVal:parseInt(data['foundations of global history'].split(' ')[0]), backColor:'white'},{subject: 'Modern Global History', sliderVal:parseInt(data['modern global history'].split(' ')[0]), backColor:'white'},{subject: 'United States History', sliderVal:parseInt(data['united states history'].split(' ')[0]), backColor:'white'}]},
      'french':{subj:'French',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'French 1', sliderVal:parseInt(data['french 1'].split(' ')[0]), backColor:'white'},{subject: 'French 2', sliderVal:parseInt(data['french 2'].split(' ')[0]), backColor:'white'},{subject: 'French 3', sliderVal:parseInt(data['french 3'].split(' ')[0]), backColor:'white'},{subject: 'French 4', sliderVal:parseInt(data['french 4'].split(' ')[0]), backColor:'white'},{subject: 'AP French', sliderVal:parseInt(data['ap french'].split(' ')[0]), backColor:'white'},{subject: 'French 6', sliderVal:parseInt(data['french 6'].split(' ')[0]), backColor:'white'}]},
      'spanish':{subj:'Spanish',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Spanish 1', sliderVal:parseInt(data['spanish 1'].split(' ')[0]), backColor:'white'},{subject: 'Spanish 2', sliderVal:parseInt(data['spanish 2'].split(' ')[0]), backColor:'white'},{subject: 'Spanish 3', sliderVal:parseInt(data['spanish 3'].split(' ')[0]), backColor:'white'},{subject: 'Spanish 4', sliderVal:parseInt(data['spanish 4'].split(' ')[0]), backColor:'white'},{subject: 'AP Spanish', sliderVal:parseInt(data['ap spanish'].split(' ')[0]), backColor:'white'},{subject: 'Spanish 6', sliderVal:parseInt(data['spanish 6'].split(' ')[0]), backColor:'white'}]},
      'chinese':{subj:'Chinese',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Chinese 1', sliderVal:parseInt(data['chinese 1'].split(' ')[0]), backColor:'white'},{subject: 'Chinese 2', sliderVal:parseInt(data['chinese 2'].split(' ')[0]), backColor:'white'},{subject: 'Chinese 3', sliderVal:parseInt(data['chinese 3'].split(' ')[0]), backColor:'white'},{subject: 'Chinese 4', sliderVal:parseInt(data['chinese 4'].split(' ')[0]), backColor:'white'},{subject: 'AP Chinese', sliderVal:parseInt(data['ap chinese'].split(' ')[0]), backColor:'white'},{subject: 'Chinese 6', sliderVal:parseInt(data['chinese 6'].split(' ')[0]), backColor:'white'}]},
      'latin':{subj:'Latin',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Latin 1', sliderVal:parseInt(data['latin 1'].split(' ')[0]), backColor:'white'},{subject: 'Latin 2', sliderVal:parseInt(data['latin 2'].split(' ')[0]), backColor:'white'},{subject: 'Latin 3', sliderVal:parseInt(data['latin 3'].split(' ')[0]), backColor:'white'},{subject: 'Latin 4', sliderVal:parseInt(data['latin 4'].split(' ')[0]), backColor:'white'},{subject: 'AP Latin', sliderVal:parseInt(data['ap latin'].split(' ')[0]), backColor:'white'},{subject: 'Latin 5', sliderVal:parseInt(data['latin 5'].split(' ')[0]), backColor:'white'}]},
      'greek':{subj:'Greek',sliderVal:0,pressed:false,classesTaken:[],val:[{subject: 'Greek 1', sliderVal:parseInt(data['greek 1'].split(' ')[0]), backColor:'white'},{subject: 'Greek 2', sliderVal:parseInt(data['greek 2'].split(' ')[0]), backColor:'white'},{subject: 'Greek 3', sliderVal:parseInt(data['greek 3'].split(' ')[0]), backColor:'white'}]},
      'computer science':{subj:'Computer Science',sliderVal:0,classesTaken:[],pressed:false,val:[{subject: 'AP Computer Science', sliderVal:parseInt(data['ap computer science'].split(' ')[0]), backColor:'white'},{subject: 'Data Structures', sliderVal:parseInt(data['data structures'].split(' ')[0]), backColor:'white'}]}
    }
      let isHead=profile.teacher_id
      let subjects=[]
      if (isHead&&profile.role.substring(0,4)!='head'){
        const {data} = await supabase.from('department_head_requests').select('subject').eq('tutor_id', id).eq('teacher_id',profile.teacher_id).maybeSingle()
        subjects=[data.subject]
      }else{
        subjects=isHead?profile.role.split('|').slice(1):[]
      }
    let t =isHead?[]:[
      valtoSubj['science'],
      valtoSubj['math'],
      valtoSubj['english'],
      valtoSubj['history'],
    ]
    let f=[]
     if (parseInt(data['algebra 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('math')))){
      if (isHead){
        t=[...t, valtoSubj['math']]
      }
      f.push({subj:'Math',classesTaken:[],sliderVal:data['algebra 1'].split(' ')[1],pressed:false})
      if (data['algebra 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='math')
    }
    if (parseInt(data['english'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('english')))){
      f.push({subj:'English',classesTaken:[],sliderVal:data['english'].split(' ')[1],pressed:false})
      if (isHead){
        t=[...t, valtoSubj['english']]
      }
      if (data['english'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='english')
    }
    if (parseInt(data['foundations of global history'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('history')))){
      f.push({subj:'History',classesTaken:[],sliderVal:data['foundations of global history'].split(' ')[1],pressed:false})
      if (isHead){
        t=[...t, valtoSubj['history']]
      }
      if (data['foundations of global history'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='history')
    }
    if (!isHead||(isHead&& subjects.includes('science'))){
      let q = false
      if (parseInt(data.chemistry.split(' ')[0])!=0){
        q=true
      f.push({subj:'Chemistry',classesTaken:[],sliderVal:data.chemistry.split(' ')[1],pressed:false})
      subjects.push('chemistry')
      if (data['chemistry'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }
    if (parseInt(data.physics.split(' ')[0])!=0){
      q=true
      f.push({subj:'Physics',classesTaken:[],sliderVal:data.physics.split(' ')[1],pressed:false})
      subjects.push('physics')
      if (data['physics'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }
    if (parseInt(data.biology.split(' ')[0])!=0){
      q=true
      f.push({subj:'Biology',classesTaken:[],sliderVal:data.biology.split(' ')[1],pressed:false})
      subjects.push('biology')
      if (data['biology'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }
    if (parseInt(data.ecology.split(' ')[0])!=0){
      q=true
      f.push({subj:'Ecology',classesTaken:[],sliderVal:data.ecology.split(' ')[1],pressed:false})
      subjects.push('ecology')
      if (data['ecology'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }
    if(q && isHead){
      console.log('added Science')
      t=[...t, valtoSubj['science']]}
  }
      subjects.filter(item=>item=='science')
    if (parseInt(data['french 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('french')))){
      t=[...t, valtoSubj['french']]
      f.push({subj:'French',classesTaken:[],sliderVal:data['french 1'].split(' ')[1],pressed:false})
      if (data['french 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='french')
    }if (parseInt(data['spanish 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('spanish')))){
      t=[...t, valtoSubj['spanish']]
      f.push({subj:'Spanish',sliderVal:data['spanish 1'].split(' ')[1],pressed:false})
      if (data['spanish 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='spanish')
    }if (parseInt(data['chinese 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('chinese')))){
      t=[...t, valtoSubj['chinese']]
      f.push({subj:'Chinese',sliderVal:data['chinese 1'].split(' ')[1],pressed:false})
      if (data['chinese 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='chinese')
    }if (parseInt(data['latin 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('latin')))){
      t=[...t, valtoSubj['latin']]
      f.push({subj:'Latin',sliderVal:data['latin 1'].split(' ')[1],pressed:false})
      if (data['latin 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='latin')
    }if (parseInt(data['greek 1'].split(' ')[0])!=0&&(!isHead||(isHead&& subjects.includes('greek')))){
      t=[...t, valtoSubj['greek']]
      f.push({subj:'Greek',sliderVal:data['greek 1'].split(' ')[1],pressed:false})
      if (data['greek 1'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='greek')
    }if (parseInt(data['ap computer science'].split(' ')[0])!=0 && parseInt(data['data structures'].split(' ')[0])!=0 &&(!isHead||(isHead&& subjects.includes('computer science')))){
      t=[...t, valtoSubj['computer science']]
      f.push({subj:'Computer Science',sliderVal:data['data structures'].split(' ')[1],pressed:false})
      if (data['data structures'].split(' ')[1]==1){
        setReadyAdmin(false)
      }
    }else{
      subjects.filter(item=>item=='computer science')
    }
    setFinishSubjects(f)
    setSubjectsMain(subjects)
    getStudentClasses(t)
}
}
const getTeacherToEmail=async()=>{
  //here
  let nameEmails={}
  let errorSubjects=[]
  console.log(finishSubjects)
  for (const subject of finishSubjects){
    let q = false
    outerLoop:for (let form =4; form>=0; form--){
      if (myClasses[form].length!=0){
        for (const class1 of myClasses[form]){
          if (class1.subject==subject.subj.toLocaleLowerCase()){
            const {data, error}=await supabase.from('teachers').select('email,id').eq('name',class1.teacherName).maybeSingle()
            if (class1.teacherName){
              q=true
              nameEmails[class1.teacherName]=[data.email,data.teacher_id, subject.subj]
            }
            break outerLoop;
          }
        }
      }
    }
    if (!q){
        errorSubjects.push(subject.subj)
      }
}
navigate('/home')
notifications.show({
    title:'Application updated'
  })
  console.log(errorSubjects, nameEmails)
  const {data} = await supabase.from('profiles').select('name, email').eq('role', 'admin')
    for (const subject of errorSubjects){
      for (const admin1 of data){
          sendEmailError(admin1.name,admin1.email, subject)
        }
    }
for (const [name, info] of Object.entries(nameEmails)){
    sendEmailHead(name, info[0])
    await supabase.from('department_head_requests').upsert({teacher_id:info[1], tutor_id:id, typeRequest:'new', subject:info[2]}
    )}
     await supabase.from('department_head_requests').delete().eq('tutor_id', id).eq('teacher_id',profile.teacher_id)


  
}
const sendEmailError = (name1, email,subject) => {
        const templateParams = {
            name : name1,
            email: email,
            student:name,
            subject:subject
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            'template_uly6q6q',
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .catch((error) => console.log(error));
    };
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
            if (subj =='biology' || subj =='chemistry'|| subj =='physics'||subj =='ecology'){
              return {...subject,classesTaken: [
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
const sendEmailsNewTutor=async(t)=>{
  const subjToHead={
    'Science':'head|science',
    'Chemistry':'head|science',
    'Biology':'head|science',
    'Physics':'head|science',
    'Ecology':'head|science',

    'Spanish':'head|french|spanish|chinese',
    'French':'head|french|spanish|chinese',
    'Chinese':'head|french|spanish|chinese',

    'Latin':'head|latin|greek',
    'Greek':'head|latin|greek',

    'History':'head|history',

    'English':'head|english',

    'Math':'head|math|computer science',
    'Computer Science':'head|math|computer science',
  }
  let nameEmails={}
  for (const subj of mySubjects){
    if(subj.sliderVal!=0){
      const {data}=await supabase.from('profiles').select('name,email,teacher_id').eq('role',subjToHead[subj.subj]).maybeSingle()
      nameEmails[data.name]=[data.email,data.teacher_id]
    }
  }
  
  for (const [name, info] of Object.entries(nameEmails)){
    sendEmailHead(name, info[0])
    await supabase.from('department_head_requests').upsert({teacher_id:info[1], tutor_id:id, typeRequest:t})}
  const {data} = await supabase.from('profiles').select('name, email').eq('role', 'admin')
        for (const admin1 of data){
          sendOrigAdmin(admin1.name,admin1.email)
        }
}
const handleHeadUpdate=async()=>{
  const subjtodb={
    'Chemistry':'chemistry',
    'Biology':'biology',
    'Physics':'physics',
    'Ecology':'ecology',

    'French':'french 1',
    'Spanish':'spanish 1',
    'Chinese':'chinese 1',

    'Latin':'latin 1',
    'Greek':'greek 1',

    'Math':'algebra 1',
    'Computer Science':'data structures',

    'English':'english',

    'History':'foundations of global history',
  }
  navigate('/home')
  for (const subj of finishSubjects){
    const {data} = await supabase.from('tutors_classes_comfort').select(`*`).eq('tutor_id', id).maybeSingle()
    const{error} = await supabase.from('tutors_classes_comfort').update({[subjtodb[subj.subj]]:`${data[subjtodb[subj.subj]].split(' ')[0]} ${subj.sliderVal==1?0:subj.sliderVal}`}).eq('tutor_id', id)
  }
  await supabase.from('department_head_requests').delete().eq('tutor_id', id).eq('teacher_id',profile.teacher_id)
  const {data} = await supabase.from('profiles').select('name, email').eq('role', 'admin')
        for (const admin1 of data){
          sendSubjectAdmin(admin1.name,admin1.email)
        }
  notifications.show({
    title:'Application updated'
  })

}
const sendSubjectAdmin=async(adminName, adminEmail)=>{
  const templateParams = {
                email : adminEmail,
                name : adminName,
                teacher : profile.name,
                student: name
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_3ur1gki',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .catch((error) => console.log(error));
}
const sendEmailHead=async(teacherName, teacherEmail)=>{
  const templateParams = {
                email : teacherEmail,
                name : name ?? profile.name,
                teacher : teacherName,
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_o8ngjt6',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .catch((error) => console.log(error));
}
const sendOrigAdmin=async(adminName, adminEmail)=>{
  const templateParams = {
                email : adminEmail,
                name : profile.name,
                admin : adminName,
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_htqv07a',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .catch((error) => console.log(error));
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
  navigate('/home')
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
  navigate('/home')
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
                    {editable?'Class History': 'Tutor Profile: '+name}
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
              label={null}
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
          <p style={{color:(subject.sliderVal==1&&profile.role=='admin')?'grey':'black'}} onClick={()=>{
            
          }}>{subject.subj}</p>
          <Slider
          label={null}
          color={subject.sliderVal<=50?`rgba(255,${(subject.sliderVal)*(255/50)},0,${(50-subject.sliderVal)/50+0.5})`:`rgba(${(100-subject.sliderVal)*(255/50)},255, 0,${(subject.sliderVal-50)/100+0.5})`}
                style={{width:'200px'}}
                value={subject.sliderVal}
                onChange={(newValue) => {if(profile.teacher_id){handleSliderChangeBig(newValue, subject.subj)}}}
          />
        
        </div>
      ))}
      
      {(!profile.teacher_id&& readyAdmin)&&<div stle={{paddingBottom:'20px'}}>
      <TextInput label={"Message to " +name} style={{height:'30px'}}value={message} onChange={(e) => setMessage(e.target.value)}/>
        </div>}
      {(!profile.teacher_id&& readyAdmin)&&
      <div style={{display:'flex', gap:'10px',justifyContent:'flex-end', paddingTop:'50px'}}>
      <Button variant='light' onClick={handleUploadDataAdmin}>Approve</Button>
      <Button variant='light' color='red' onClick={handleRejectAdmin}>Reject</Button>
      </div>}
      {profile.teacher_id&&
      <div>
      <div style={{position:'absolute', bottom:profile.role.substring(0,4)=='head'?'60px':'10px', right:'10px'}}>
      <Button variant='light' onClick={handleHeadUpdate}>Next<IconChevronRight stroke={2}/></Button>
      </div>
      {profile.role.substring(0,4)=='head'&&<div style={{position:'absolute', bottom:'10px', right:'10px'}}>
        <Button variant='white' style={{color:'black',fontSize: '10px'}}onClick={()=>{
          getTeacherToEmail()
          
        }}>I cannot attest to this student's ability to tutor. Push request to most recent teacher.</Button>
  
      </div>}
      </div>}

      
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
    <Grid.Col span={{ base: 12, md: 4, lg: 3 }} key={o.id} style={{
  display: 'flex',
  justifyContent: 'center',
}}>
    {(!profile.teacher_id||(profile.teacher_id&&subjectsMain.includes(o.subject)))&&<Card key = {o.id} miw = '200px' maw='250px' padding="0" style={{ miw:'250px', containerType: 'inline-size',width: '100%', aspectRatio: '16 / 9', backgroundColor:'white', color:'black', borderColor:'#cbcbcbff'}} withBorder orientation="horizontal">
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
    </Card>}
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


  
  

    