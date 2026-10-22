import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Input, Loader, Text, TextInput } from "@mantine/core";
import emailjs from '@emailjs/browser';
import ProfileCard from "./assets/ProfileCard";
import { useAuth } from "./lib/useAuth";
import { notifications } from "@mantine/notifications";
import { IconChevronRight } from "@tabler/icons-react";

export default function ListSchedule() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [users, setUsers]=useState([])
  const {getAvatarUrl} = useAuth()
  const [load, setLoad]=useState(false)
  const [emailModal,setEmailModal] = useState(false)
  const id = state?.id;
  const name = state?.name;
  const className= state?.className
  const requestId = state?.requestId;
  const level = state?.level;
  const email = state?.email;
  const target = state?.target;
  const handleNext=async()=>{
    setEmailModal(true)
  }
  useEffect(()=>{
    getUsers()
  },[])
  const getUsers=async()=>{
    const{data, error}= await supabase.from('tutors').select('*, profiles(*)')
    
    if (data){
      let avs = data.map(item=>item.profiles.avatar_url) 
      let t1 = await getAvatarUrl(avs)
      
      let t = data.filter(item=>item.profiles.id!=id)
    let r=[]
    if (t.length>1){
      for (let i=1; i<t.length; i++){
        let p = t[i]
        console.log(t[i])
          let temp = {'id':p.profiles.id, 'email':p.profiles.email, 'name': p.profiles.name,'avatar_url': t1[p.profiles.avatar_url],'chemistry':p.chemistry,'physics':p.physics,'ecology':p.ecology,'biology':p.biology,'math':p.math,'english':p.english,'history':p.history,'french':p.french,'spanish':p.spanish,'chinese':p.chinese,'latin':p.latin,'greek':p.greek,'computer science':p['computer science']}
          console.log(temp[target])
          if(parseInt(temp[target].split(' ')[0])>=level){
            if (r.length==0){
              console.log('here')
              r.push(temp)
            }else{
              let lowBound = 0;
let highBound = r.length;

while (lowBound < highBound) {
  let mid = Math.floor((lowBound + highBound) / 2);

  if (
    temp[target].split(' ')[1] >
    r[mid][target].split(' ')[1]
  ) {
    lowBound = mid + 1;
  } else {
    highBound = mid;
  }
}

r.splice(lowBound, 0, temp);
            }
          }
      }
    }
    console.log(r)
    setUsers(r)
    }

    return true
}
return (
    <div>
      <div style={{display:'flex',alignItems: 'flex-start', justifyContent:'center', width: '100%', padding:'20px'}}>
                      <Text
                          component="span"
                          variant="gradient"
                          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                          size='10vh'
                          weight={700}
                          style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                          >
                          Send request to all {target} tutors:
                          </Text>
                          </div>
                          <div style={{display:'flex', justifyContent:'center'}}>
                          <div style={{width:'40vw'}}>
                              <Divider my="md" size="md"/>
                          </div>
                          </div>
        <div style={{paddingBottom:'20px', display:'flex', justifyContent:'center'}}>
          <div style={{paddingRight:'2px'}}>
        </div>
        <Button variant = 'light' onClick={()=>{
            navigate('/adminSchedule', {state:{request_id: requestId,id: id, admin:true, editable:false, name: name, className: className, target:target, level:level}})
        }}>or select a tutor personally</Button>
        
        </div>
        {load && (
                            <div className="modal-overlay">
                                <Loader color="blue" />
                            </div>
                            )
                        }
                        <Button style={{position:'fixed', bottom:'20px', right:'20px'}} onClick={handleNext}>Email <IconChevronRight stroke={2}/></Button>
    <Grid align="stretch" style={{width:'100%'}}>
    {users.map((request)=>(
                <Grid.Col key = {request.id} span={{ base: 12, md: 4, lg: 3 }} style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                }} >
      
                   <ProfileCard onPress={()=>{
                          navigate('/tutorSetup', {state:{id:request.id, editable:false, name: name, target:target}})
                   }}cardType='list' onDelete={()=>{
                    setUsers(prev=>prev.filter(item=>item.id!=request.id))
                   }} imageSrc = {request.avatar_url} name={request.name}/>
                    
                   </Grid.Col>
                )
                )}
                {emailModal && (
    <EmailModal target={target} request_id={requestId} recipients={users} className={className}/>
)}
</Grid>
                </div>
                
)
}
function EmailModal({target, request_id, recipients, className}) {
  const [message, setMessage] = useState("");
  const uploadRequestsSetup=async()=>{
    await supabase.from('tutoring_requests').update({ progress: 'group',note:message }).eq('id', request_id)
    for (const item of recipients){
      uploadRequests(item.id)
      sendEmailSchedule(item.email, item.name)
    }
    navigate('/tutorRequestNotifications')
    notifications.show({
      title:'Emails sent'
    })
  }
  const uploadRequests=async(tutor_id)=>{
    const {data, error}=await supabase.from('tutor_match_invites').upsert({
          request_id: request_id,
          tutor_id:tutor_id,
  }, {onConflict:'request_id,tutor_id'})
console.log(error)}
  
  const sendEmailSchedule =  (email, name) => {
        const templateParams = {
          email:email,
            tutor :name,
            className: className,
            message: message? 'A note from the Acedemic Skills Department: '+message:null
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            'template_gv0va9n',
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
    };
  return (
    <div className="modal-overlay">
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
  );
}