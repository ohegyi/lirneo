import './index.css'
import { useState, useEffect } from 'react'
import { Input, Loader, Slider, TextInput } from '@mantine/core';
import { supabase } from './lib/supabase'
import './index.css'
import '@mantine/core/styles.css';
import { HugeiconsIcon } from '@hugeicons/react';
import { RemoveCircleIcon } from '@hugeicons/core-free-icons';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './lib/useAuth';
export default function Profile() {
  const { state } = useLocation();
  const id = state?.id;
  const editable = state?.editable;
  const name = state?.name;
  const [mySubjects, setMySubjects] = useState([])
  const [curForm, setCurForm] = useState(0)
  const [curClasses, setCurClasses]=useState([])
  const [ranking, setRanking] = useState(false)
  const [myClasses, setMyClasses] = useState([[],[],[],[],[]])
  const [curClassId, setCurClassId] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [searchItemTeacher, setSearchItemTeacher] = useState('')
  const [filteredItems, setfilteredItems]=useState([])
  const [filteredTeachers, setFilteredTeachers]=useState([])
  const [load, setLoad] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [levelClasses, setLevelClasses] = useState([])
  const [classes,setClasses]=useState([])
  const {profile}= useAuth()
  const user = profile;
  const [finishSubjects, setFinishSubjects] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
  const getUser = async () => {
    setLoad(true)
    getDataComfort()
    if (editable){
        await getClasses()
        await getTeachers()
    }
    setLoad(false)
  };

  getUser();
}, []);
const getDataComfort=async()=>{
    const { data, error } = await supabase.from('tutors_classes_comfort').select().eq('tutor_id', id)
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
      setFinishSubjects(prev=>[...prev, {subj:'Biology',classesTaken:[],sliderVal:0,pressed:false}])
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
    setMySubjects(j)
    setMyClasses(t)
    return true
  }
const getClasses=async()=>{
    const {data,error}=await supabase.from('Classes').select()
    let t=[]
    for (const p of data){
        t=[...t, {'id':p.id, 'name':p.name, 'subject':p.subject}]
    }
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
  setMyClasses(prev =>
  prev.map((class1, form) =>
    form === curForm
      ? [...class1, { ...classItem, teacherName: '', teacherID: '', backColor:'white'}]
      : class1
  )
)
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
  await supabase.from('tutors_classes_comfort').upsert(d)
  return 
}
const addStudentClass = async(id,index)=>{
        const {data,error}=await supabase.from('tutor_class').upsert({
            tutor_id: user.id,
            class_id:id,
            years_ago: index
          }, {onConflict:'tutor_id,class_id'})
          return
}
const handleUploadData=async()=>{
  let t={tutor_id: id}
  for (const sub of finishSubjects){
    t[sub.subj.toLowerCase()]=String(levelClasses[sub.subj.toLowerCase()]||0)+' '+String(finishSubjects.find(f=>f.subj==sub.subj).sliderVal)
  }
  await supabase.from('tutors').upsert(t)
  await supabase.from('profiles').update({ role: 'tutorConfirmed' }).eq('id', id)
  return
}
const handleSliderChangeBig=(newValue, bigName)=>{
  setFinishSubjects(prev =>
    prev.map(subject =>
      subject.subj === bigName
        ? { ...subject, pressed:true, sliderVal:newValue}
        : { ...subject, pressed:false}
    )
  );
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
      form === curForm
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
  // Check URL params on initial render


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
    
return (


            <div>
        <h1>{name}</h1>
        <button onClick={handleFinished}>Update</button>
        
        <button onClick={()=>{navigate('/tutorInvite')}}>Back</button>
        {load && (
          <div className="modal-overlay">
    <div className="modal">
      
      <Loader color="blue" />
      
      
      </div>
      

    </div>

        )}
          <div style={{display:'flex',justifyContent: 'center', flexDirection:'row', width:'100%'}}>
      {mySubjects.map(subject => (
        <div key={subject.subj}style={{display: 'flex',backgroundColor: subject.pressed ? '#c9e9f6':'white', paddingRight:'10%',flexDirection:'column', alignItems:'center', marginBottom:'10px'}}>
          <p onClick={()=>{
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
          }}>{subject.subj}</p>
          {subject.pressed && subject.val.map(s => (
            <div key={s.subject} style={{display:'flex', flexDirection:'row', alignItems:'center', marginRight:'20px'}}>
              <p style={{marginRight:'10px'}}>{s.subject}</p>
              <Slider
                color={s.backColor <= 50 ? `rgba(255,${(s.sliderVal)*(255/50)},0,${(50-s.sliderVal)/50+0.5})`:`rgba(${(100-s.sliderVal)*(255/50)},255, 0,${(s.sliderVal-50)/100+0.5})`}
                style={{width:'200px'}}
                value={s.sliderVal}
                onChange={(newValue) => {if(editable)handleSliderChange(newValue, subject.subj, s.subject)}}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    {curClasses
  .map(o => (
    <div  key={o.id}>
      
    <li style={{display:'flex', flexDirection:'row', marginRight: '100px',alignItems:'start'}}>
      {editable && (<HugeiconsIcon icon={RemoveCircleIcon} onClick={()=>{
  
        setMyClasses(prev =>
              prev.map((form,i) =>
                i == curForm
                  ? 
                  form.filter(item => item.id!== o.id)
                  : form
              )
            );

      }}/>)}
      
        {o.name} --
        {editable && (<div>
        <TextInput
        styles={{input: {
      backgroundColor: o.backColor,
    }}}
        type="text"
        value={myClasses[curForm].find(item => item.id === o.id).teacherName}
        onChange={(e)=>{
          setCurClassId(o.id)
          handleInputChangeTeacher(e, o.id)
      }}
        />
    </div>)}
    {!editable && (<div>
        <p>{o.teacherName}</p>
        </div>
    )}
        <div style={{width:'100px'}}>
       
    </div>
    </li>
    </div>
))}
    <div>
          {(myClasses[4].length>0 || editable) && <button style={{backgroundColor: curForm === 4 ? '#c9e9f6' : 'white'}} onClick={()=>{setCurForm(4)}}>Sixth Form</button>}
          {(myClasses[3].length>0 || editable) && <button style={{backgroundColor: curForm === 3 ? '#c9e9f6' : 'white'}} onClick={()=>{setCurForm(3)}}>Fifth Form</button>}
          {(myClasses[2].length>0 || editable) && <button style={{backgroundColor: curForm === 2 ? '#c9e9f6' : 'white'}} onClick={()=>{setCurForm(2)}}>Fourth Form</button>}
          {(myClasses[1].length>0 || editable) && <button style={{backgroundColor: curForm === 1 ? '#c9e9f6' : 'white'}} onClick={()=>{setCurForm(1)}}>Third Form</button>}
          {(myClasses[0].length>0 || editable) && <button style={{backgroundColor: curForm === 0 ? '#c9e9f6' : 'white'}} onClick={()=>{setCurForm(0)}}>Second Form</button>}
        </div>
    {editable &&(
<form>
      <TextInput
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
    
      </form>)}
      {searchItem &&filteredItems
  .map(o => (
    <li key={o.id} onClick={() => handleClick(o)}>
        {o.name}
    </li>
))}
        {myClasses[curForm]
  .map(o => (
    <div  key={o.id}>
      
    <li style={{display:'flex', flexDirection:'row', marginRight: '100px',alignItems:'start'}}>
      {editable && (<HugeiconsIcon icon={RemoveCircleIcon} onClick={()=>{
  
        setMyClasses(prev =>
              prev.map((form,i) =>
                i == curForm
                  ? 
                  form.filter(item => item.id!== o.id)
                  : form
              )
            );

      }}/>)}
      
        {o.name} --
        {editable && (<div>
        <TextInput
        styles={{input: {
      backgroundColor: o.backColor,
    }}}
        type="text"
        value={myClasses[curForm].find(item => item.id === o.id).teacherName}
        onChange={(e)=>{
          setCurClassId(o.id)
          handleInputChangeTeacher(e, o.id)
      }}
        />
    </div>)}
    {!editable && (<div>
        <p>{o.teacherName}</p>
        </div>
    )}
        <div style={{width:'100px'}}>
       
    </div>
    </li>
    </div>
))}
{ranking && (
          <div className="modal-overlay">
    <div className="modal">
      
      <h2>Approve {name} to be a tutor in</h2>
      {finishSubjects.map(subject => (
        <div key={subject.subj}style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'10px'}}>
          <p onClick={()=>{
          if (subject.pressed==false){
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
            
          //subject.pressed=true
          //subject.backColor='#c9e9f6'
          }}>{subject.subj}</p>
          <Slider
          color={subject.sliderVal<=50?`rgba(255,${(subject.sliderVal)*(255/50)},0,${(50-subject.sliderVal)/50+0.5})`:`rgba(${(100-subject.sliderVal)*(255/50)},255, 0,${(subject.sliderVal-50)/100+0.5})`}
                style={{width:'200px'}}
                value={subject.sliderVal}
                onChange={(newValue) => handleSliderChangeBig(newValue, subject.subj)}
          />
        
        </div>
      ))}
      <button onClick={handleUploadData}>all set</button>
      </div>
      

    </div>

        )}
{searchItemTeacher &&filteredTeachers
  .map(o => (
    <li key={o.id} onClick={() => {
      setMyClasses(prev =>
    prev.map((class1, form) =>
      form === curForm
        ? class1.map(item =>
            item.id === curClassId
              ? { ...item, teacherID: o.id, teacherName: o.name }
              : item
          )
        : class1
    )
  );
      setMyClasses(prev =>
        prev.map((class1, form) =>
          form === curForm
            ? class1.map(item =>
                item.id === curClassId
                  ? { ...item, teacherName: o.name, teacherID:o.id, backColor:'#c9e9f6'}
                  : item
              )
            : class1
        )
      );
      setSearchItemTeacher('')
    }}>
        {o.name}
    </li>
))}
      </div>
      
    )
  }


  
  

    