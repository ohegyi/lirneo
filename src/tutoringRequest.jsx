import './index.css'
import { useState, useEffect } from 'react'
import { Button, Divider, Input, Loader, Notification, Popover, ScrollArea, Text, TextInput} from '@mantine/core';
import { supabase } from './lib/supabase'
import './index.css'
import emailjs from '@emailjs/browser';
import { IconInfoCircle } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { useAuth } from './lib/useAuth';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
export default function TutoringRequest() {
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState('')
  const [message, setMessage] = useState('')
  const [allSet, setAllSet] = useState(false)
  const [searchItemTeacher, setSearchItemTeacher] = useState('')
  const [classId, setClassId]=useState()
  const [teacherId, setTeacherId]=useState()
  const [filteredItems, setfilteredItems]=useState([])
  const [filteredTeachers, setFilteredTeachers]=useState([])
  const [load, setLoad] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [classes,setClasses]=useState([])
  const {profile} = useAuth()
  const user = profile;
  useEffect(() => {
  const getUser = async () => {
    setLoad(true)
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
  setfilteredItems([])
  setClassId(classItem.id)
  setSearchItem(classItem.name)
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
      return 
}
const addStudentClass = async(id,index,teacher)=>{
        const {data,error}=await supabase.from('tutor_class').upsert({
            tutor_id: user.id,
            class_id:id,
            years_ago: index,
            teacher_name:teacher
          }, {onConflict:'tutor_id,class_id'})
          return
}
const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    setfilteredItems(classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || classItem.subject.toLowerCase().includes(searchTerm.toLowerCase())
    ));


  }
  const submit =async()=>{
    if (classId && teacherId){
      const {data, error}=await supabase.from('tutoring_requests').insert({ student_id: user.id, class_id: classId, teacher_id:teacherId,note:message})
    notifications.show(
      {
        title:'Request Submitted'
      }
    )
    navigate('/Home')
    sendEmails()
    }else{
      alert("Fields left blank");
    }
  }
  const sendEmails = async()=>{
    //TODO activate emails
    const {data, error} = await supabase.from('profiles').select('').eq('role', 'admin')
    for (const admin of data){
      //sendEmailRegister(admin.name, admin.email)
    }
    const t = teachers.find(teacher=> teacher.id==teacherId)
    //sendEmailRegister(t.name, t.email)
  }
  const sendEmailRegister = (name, email) => {
        const templateParams = {
            name : name,
            action: user.name+ ' has requested tutoring in '+class1+'.',
            email: email,
            note: message?'A note from '+ user.name+": "+message:''
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
    };
  const handleInputChangeTeacher = (e) => { 
    const searchTerm = e.target.value;
    setSearchItemTeacher(searchTerm)
    setFilteredTeachers(teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));


  }
    
return (


            <div style={{width:'100%', height:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{padding:'20px'}}>
        <Text
                                    component="span"
                                    align="center"
                                    variant="gradient"
                                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                    size='10vh'
                                    weight={700}
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                                    >
                                    Tutoring Request
                                    </Text>
                                    </div>
        <div style={{width:'60%', paddingBottom:'40px'}}>
                            <Divider my="md" size="md"/>
                            </div>
       
          <div style={{display: 'flex', flexDirection: 'column', gap: '40px', width:'40%'}}>
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
        placeholder='search classes'
      />
      </Popover.Target>
      {filteredItems.length>0 && <Popover.Dropdown width="target">
            <ScrollArea w='100%'  mih = '40px'mah ='200px' h={`${filteredItems.length*35}px`}  p="xs">
                  {filteredItems
        .map(o => (
          <div key={o.id} onClick={() => handleClick(o)} >
              <Text truncate="end">{o.name}</Text>
          </div>
      ))}
      </ScrollArea>
           </Popover.Dropdown>}
      </Popover>
        {load && (
          <div className="modal-overlay">
      
      <Loader color="blue" />
      
    
      

    </div>

        )}
        <div style={{width:'100%'}}>
           <Popover opened={searchItemTeacher} onChange={(opened)=>{
                        if(!opened){
                         setSearchItemTeacher('')
                        }
                      }}>
                <Popover.Target>
        <TextInput
        placeholder='search teachers'
        value={searchItemTeacher}
        styles={{input: {
      backgroundColor: 'white',
    }}}
        type="text"
        //value={}
        onChange={(e)=>{
          //setCurClassId(o.id)
          handleInputChangeTeacher(e)
      }}
        />
        </Popover.Target>
        {filteredTeachers.length>0 && <Popover.Dropdown width="target">
            <ScrollArea w='100%' mih = '40px'mah ='200px' h={`${filteredItems.length*35}px`} p="xs">
                  {filteredTeachers
        .map(o => (
          <div key={o.id} onClick={() => {
      setTeacherId(o.id)
      setFilteredTeachers([])
      setSearchItemTeacher(o.name)
    }} >
              <Text truncate="end">{o.name}</Text>
          </div>
      ))}
      </ScrollArea>
           </Popover.Dropdown>}
        
        </Popover>
        </div>
        
          <Popover opened={message} onChange={(opened)=>{
                        if(!opened){
                         setMessage('')
                        }
                      }}>
                <Popover.Target>
        <TextInput
        placeholder='message to admin'
        value={message}
        styles={{input: {
      backgroundColor: 'white',
    }}}
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        />
        </Popover.Target>
        
        </Popover>
        </div>
        <div>
                        
                    </div>
                    
  
        <div style={{paddingTop:'60px'}}>
<Button  variant='light' onClick={submit}>Submit</Button>
</div>
      </div>
    )
  }


  
  

    