import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Input, Loader, Text, TextInput } from "@mantine/core";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import emailjs from '@emailjs/browser';
import ProfileCard from "./assets/ProfileCard";
import { useAuth } from "./lib/useAuth";

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
    let g = t[0]
    let r = [{'id':g.profiles.id, 'email':g.profiles.email, 'name': g.profiles.name,'avatar_url': t1[g.profiles.avatar_url],'chemistry':g.chemistry,'physics':g.physics, 'biology': g.biology, 'ecology':g.ecology,'math':g.math,'english':g.english,'history':g.history,'french':g.french,'spanish':g.spanish,'chinese':g.chinese,'latin':g.latin,'greek':g.greek,'computer science':g['computer science']}]
    if (t.length>1){
      for (let i=1; i<t.length; i++){
        let p = t[i]
          let temp = {'id':p.profiles.id, 'email':p.profiles.email, 'name': p.profiles.name,'avatar_url': t1[p.profiles.avatar_url],'science':p.science,'math':p.math,'english':p.english,'history':p.history,'french':p.french,'spanish':p.spanish,'chinese':p.chinese,'latin':p.latin,'greek':p.greek,'computer science':p['computer science']}
          if(parseInt(p[target].split(' ')[0])>=level){
            let lowBound = 0
          let highBound = r.length-1
          let mid = Math.floor((r.length-1)/2)
          while (lowBound!=highBound){
            if (p[target].split(' ')[1]>r[mid][target].split(' ')[1]){
              lowBound=mid
            }else{
              highBound=mid
            }
            mid=Math.floor((lowBound+highBound)/2)
          }
          r.splice(lowBound,0, temp)
          }
      }
    }
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
          <Button onClick={()=>{
          handleNext()
        }}>email</Button>
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