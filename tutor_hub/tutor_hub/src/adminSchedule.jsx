import './index.css'
  import { useState, useEffect } from 'react'
  import { Alert, Badge, Button, Card, Divider, Input, Loader, Notification, Select, Slider, Text, TextInput } from '@mantine/core';
  import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
  import { supabase } from './lib/supabase'
import './lib/notifications.css';
  import './App.css'
  import './index.css'
import '@mantine/dates/styles.css';
import { IconX ,IconChevronRight} from '@tabler/icons-react';
  import { IconInfoCircle } from '@tabler/icons-react';
  import emailjs from '@emailjs/browser';
  import '@mantine/core/styles.css';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TimePicker } from '@mantine/dates';
  import 'react-time-picker/dist/TimePicker.css';
import { useAuth } from './lib/useAuth';
import { notifications } from '@mantine/notifications';
  const icon = <IconInfoCircle />
  export default function AdminSchedule() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const id = state?.id;
    const id2 = state?.id2;
    const name = state?.name;
    const email = state?.email;
    const class_id = state?.class_id;
    const target = state?.target;
    const level = state?.level;
    const request_id=state?.request_id
    const className = state?.className;
    const admin = state?.admin;
    const [curPerson, setCurPerson] = useState('')
    const [valSelect,setValSelect] = useState('')
    const [adminName, setAdminName] = useState('')
    const [previews, setPreviews] = useState([{start:'', end:'', error:false,day:'',edited:[], confirmed:false}])
    const [curIndex, setCurIndex] = useState(0)
    const[emailPrep, setEmailPrep]=useState(false)
    const [selected, setSelected] = useState([])
    const [recomended, setRecomended] = useState([])
    const [eventsOfficial, setEventsOfficial] = useState([])
    const [averageOrig, setAverageOrig] = useState([])
    const [breakdownOrig, setBreakdownOrig] = useState([])
    const [selectedCopy, setSelectedCopy] = useState([])
    
    
    const [active, setActive]=useState(false)
    const [eventsUser1, setEventsUser1] = useState([])
    const [eventsUser2, setEventsUser2] = useState([])
    const [activeUsers, setActiveUsers] = id?(id2?useState([{id:id, email:email, name:admin?name:'student'},{id:id2, name:'you'}]):useState([{id:id, email:email, name:name}])):useState([])
    //const [activeUsers, setActiveUsers] = id?useState([{id:id, email:email, name:name}]):useState([])
    const [users, setUsers] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [origEvents, setOrigEvents] = useState([])

    const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchItem.toLowerCase()) || user.name.toLowerCase().includes(searchItem.toLowerCase()))
    const[showError,setShowError]=useState(false)
    console.log(users)
    const [resize, setResize] = useState(false)
    const [warning, setWarning] = useState(false)
    const [load, setLoad] = useState(true)
    const [avatars, setAvatars]=useState({})
    const [mode, setMode] = useState(false)
    const[blocked,setBlocked]=useState(false)
    const [frees, setFrees] = useState([])
    const [ok, setok] = useState(false)
    const [average, setAverage] = useState([])
    const [breakdown, setBreakdown] = useState([])
    const [finalPhase, setFinalPhase] = useState(false)
    const [curID,setCurID]=useState('')
    const [curStart,setCurStart]=useState('')
    const [curEnd,setCurEnd]=useState('')
    const [previewsOrig, setPreviewsOrig] = useState([]);
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [fourth, setFourth] = useState(false)
    const [user, setUser] = useState(null);
    const {profile, getAvatarUrl}=useAuth()
    useEffect(() => {
    const getUser = async () => {
      setLoad(true)
      setUser(profile);
      setAdminName(profile.name)
      setLoad(false)
      if (id){
       let t = await getDataUser(id, true)
      if(id2){
        await getDataUser(id2,false, t)
      }
    }
    };
    if (admin)
      {
        getUsers()
      }
    getUser();
  
  }, []);
  const getTutor=async(user_id)=>{
    const {data, error} = await supabase.from('tutor_match').select('periods(start,end), tutee_id, period_id, request_id,confirmed').eq('tutor_id',user_id)
    return data
  }
  const getTutored=async(user_id)=>{
    const {data, error} = await supabase.from('tutor_match').select('periods(start,end), tutor_id, period_id, confirmed').eq('tutee_id',user_id)
    return data
  }
  const handleClick = async(user)=>{
      setSearchItem('')
      let first = false
      if(activeUsers.length<2){
          first = activeUsers.length === 0;
          setActiveUsers(prev=>[...prev, user])
          getDataUser(user.id,first)
      }
  }
  const handleClick1 = async(user)=>{
      setSearchItem('')
      setActiveUsers(prev=>[prev[0], user])
      getDataUser(user.id,false)
  }
  const handleClickActive = async(user)=>{
      setAverage([])
      setBreakdown([])
      setSelected([])
      setSelectedCopy([])
          if(activeUsers.length==1){
              setEventsUser1([])
              setEventsOfficial([])
          }else if(activeUsers[0]==user){
              setEventsUser1(eventsUser2)
              setEventsUser2([])
              setEventsOfficial(eventsUser2)
              setActiveUsers(prev => [prev[1]]);
          }else{
              setEventsOfficial(eventsUser1)
              setEventsUser2([])
              setActiveUsers(prev => [prev[0]]);
          }
  
  }
  const previewFullHandling=(previewsUse, indexCur = curIndex,av=averageOrig,br = breakdownOrig)=>{
    let newPreviews = []
    let newAvOr = []
    let newBrOr = []
    if (previewsUse[indexCur].day && previewsUse[indexCur].start && previewsUse[indexCur].end){
      let t = false
      let st = new DayPilot.Date(previewsUse[indexCur].day+previewsUse[indexCur].start+':00')
      let en = new DayPilot.Date(previewsUse[indexCur].day+previewsUse[indexCur].end+':00')
    if (st<en){
      let [a,b,c] = addPreview(av, 1, indexCur,previewsUse)
      let newPreviews1=c
      
      newAvOr=a
      setAverage(a)
      let ta = addPreview(br,2,indexCur,previewsUse)
      let bror = ta[0]
      
      let newPreviews2=ta[2]

      let tempPreviews1=[]
      for (let g = 0; g<newPreviews1.length;g++){
        tempPreviews1.push({...newPreviews1[g], edited:[...newPreviews1[g].edited,...newPreviews2[g].edited]})
      }
      newPreviews=tempPreviews1
      setBreakdown(bror)
      newBrOr=bror
      const checkBeginning = av.findIndex(event=> {
      const s = new DayPilot.Date(event.start);
      const e = new DayPilot.Date(event.end);
      const checkB = st.addMinutes(6);
      return checkB >= s && checkB < e;
      });
      if (checkBeginning==-1){
        t = true
      }else{
        const checkEnd = av.findIndex(event=> {
        const s = new DayPilot.Date(event.start);
        const e = new DayPilot.Date(event.end);
        const checkE = en.addMinutes(-6);
        return checkE <= e && checkE > s;
      });
      if (checkEnd==-1){
        t = true
      }else{
        let x = false
        for(let i = 1; i<b.length-1;i++){
          if (new DayPilot.Date(b[i-1].end).addMinutes(6)<new DayPilot.Date(b[i].start)){
            x = true
            break
          }
        }
        if (x){
          t = true
        }
        
      }
    }
    } else{
      t = true
    }
    newPreviews = newPreviews.map((item,index) =>
    index == indexCur ? {...item, error:t} : item
  ) 
    setPreviews(newPreviews)
    //need seperate previews for two modes
  }
  return [newPreviews, newAvOr, newBrOr]
  }
  useEffect(()=>{
      if (mode==0){
        setEventsOfficial(average)
      }else{
        setEventsOfficial(breakdown)
      }
  }, [average,breakdown])
  useEffect(()=>{
      if(!mode){
          setEventsOfficial(average)
      }else{
          setEventsOfficial(breakdown)
      }
  },[mode])
  useEffect(()=>{
      if(activeUsers.length>0){
          setActive(true)
      }else{
          setActive(false)
      }
  },[activeUsers])
    const getUsers=async()=>{
      const{data, error}=id? await supabase.from('tutors').select('*, profiles(*)'): await supabase.from('profiles').select()
      let g = data[0]
      let allUsers=[]
      let avs=[g.profiles.avatar_url]
      let r = [{'id':g.profiles.id, 'avatar_url':g.profiles.avatar_url,'email':g.profiles.email, 'name': g.profiles.name,'chemistry':g.chemistry,'physics':g.physics, 'biology': g.biology, 'ecology':g.ecology,'math':g.math,'english':g.english,'history':g.history,'french':g.french,'spanish':g.spanish,'chinese':g.chinese,'latin':g.latin,'greek':g.greek,'computer science':g['computer science']}]
      for (let i=0; i<data.length; i++){
        let p = data[i]
        allUsers.push({'id':p.profiles.id, 'avatar_url':p.profiles.avatar_url,'email':p.profiles.email, 'name': p.profiles.name})
        avs.push(p.profiles.avatar_url)
          let temp = {'id':p.profiles.id, 'avatar_url':p.profiles.avatar_url,'email':p.profiles.email, 'name': p.profiles.name,'science':p.science,'math':p.math,'english':p.english,'history':p.history,'french':p.french,'spanish':p.spanish,'chinese':p.chinese,'latin':p.latin,'greek':p.greek,'computer science':p['computer science']}
          if(parseInt(p[target].split(' ')[0])>=level && parseInt(p[target].split(' ')[1]!='0')){
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
      setAvatars(await getAvatarUrl(avs))
      console.log(r)
      setRecomended(r)
      setUsers(allUsers)
      return true
  }
  const handleInputChange = (e) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)
  
      const filteredItems = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
  
  
    }
  const getFrees=async(u)=>{
      const {data,error}=await supabase.from('free').select('rating, periods(*)').eq('person_id', u)
      return data
  }
  const isOverlapping=(eventsUser1,eventsUser2)=>{
      let overlap1=[]
      let average1=[]
      for (let a=0; a<eventsUser1.length;a++){
          let e1=eventsUser1[a]
          for (let b=0; b<eventsUser2.length;b++){
              let e2=eventsUser2[b]
              if(e2.start>=e1.start && e2.end<=e1.end){
                  overlap1=[...overlap1,{
                      id: crypto.randomUUID(),
                      start:e2.start,
                      end:e2.end,
                      backColor:`rgba(${parseFloat(e2.backColor.split(',')[0].split('(')[1])},${parseFloat(e2.backColor.split(',')[1])},${parseFloat(e2.backColor.split(',')[2])},0.75`,
                      borderColor: '#ff8080ff',      
                      borderWidth:'10px'
                  }]
                  overlap1=[...overlap1,{
                     id: crypto.randomUUID(),
                      start:e2.start,
                      end:e2.end,
                      backColor:`rgba(${parseFloat(e1.backColor.split(',')[0].split('(')[1])},${parseFloat(e1.backColor.split(',')[1])},${parseFloat(e1.backColor.split(',')[2])},0.75`,
                      borderColor: '#80c8ffff',
                      borderWidth:'10px'
                  }]
                  average1=[...average1,{
                      id: crypto.randomUUID(),
                      start:e2.start,
                      end:e2.end,
                      borderColor:'transparent',
                      backColor:`rgba(${(parseFloat(e1.backColor.split(',')[0].split('(')[1])+parseFloat(e2.backColor.split(',')[0].split('(')[1]))/2},${(parseFloat(e1.backColor.split(',')[1])+parseFloat(e2.backColor.split(',')[1]))/2},${(parseFloat(e1.backColor.split(',')[2])+parseFloat(e2.backColor.split(',')[2]))/2},0.75`
                      
                  }]
              }else if(e1.start>=e2.start && e1.end<=e2.end){
                  overlap1=[...overlap1,{
                      id: crypto.randomUUID(),
                      start:e1.start,
                      end:e1.end,
                      backColor:`rgba(${parseFloat(e2.backColor.split(',')[0].split('(')[1])},${parseFloat(e2.backColor.split(',')[1])},${parseFloat(e2.backColor.split(',')[2])},0.75`,
                      borderColor: '#ff8080ff',
                      borderWidth:'10px'
                    }]
                  overlap1=[...overlap1,{
                      id: crypto.randomUUID(),
                      start:e1.start,
                      end:e1.end,
                      backColor:`rgba(${parseFloat(e1.backColor.split(',')[0].split('(')[1])},${parseFloat(e1.backColor.split(',')[1])},${parseFloat(e1.backColor.split(',')[2])},0.75`,
                      borderColor: '#80c8ffff',
                      borderWidth:'10px'
                  }]
                  average1=[...average1,{
                      id: crypto.randomUUID(),
                      start:e1.start,
                      borderColor:'transparent',
                      end:e1.end,
                      backColor:`rgba(${(parseFloat(e1.backColor.split(',')[0].split('(')[1])+parseFloat(e2.backColor.split(',')[0].split('(')[1]))/2},${(parseFloat(e1.backColor.split(',')[1])+parseFloat(e2.backColor.split(',')[1]))/2},${(parseFloat(e1.backColor.split(',')[2])+parseFloat(e2.backColor.split(',')[2]))/2},0.75`
                  }]
              }
          }
      }
      setAverage(average1)
      setAverageOrig(average1)
      setBreakdown(overlap1)
      setBreakdownOrig(overlap1)
      if(!mode){
          setEventsOfficial(average1)
      }else{
          setEventsOfficial(overlap1)
      }
      return [average1,overlap1]
  }
      const getDataUser = async(u,first, e)=>{
      setLoad(true)
      let events1=[]
      let eventsOrig1=[]
      let freesT=await getFrees(u)
      for (const free of freesT){
          let t = {...free.periods}
          t.backColor=free.rating
          t.borderColor='transparent'
          events1=[...events1, t]
          eventsOrig1=[...eventsOrig1, {...t}]
      }
      if(first){
          setEventsUser1(events1)
          setEventsOfficial(events1)
      }else if(e){
          setEventsUser2(...events1)
          const [av, br]= isOverlapping(e,events1)
          let blockOutTutorings = []
          let adjustableTutorings = []
          const tuterings=await getTutor(u)
          const tutoredings=await getTutored(id)
          if (tutoredings){
            for (const d of tutoredings){
                if (d.tutor_id!=u){
                  blockOutTutorings.push({
                    start:d.periods.start.substring(11,16), 
                    end:d.periods.end.substring(11,16),
                    day:d.periods.start.substring(0,11), 
                    error:false,
                    edited:[],
                    confirmed: false,
                    hidden:true
                })
                }
          }}
          if (tuterings){
            for (const d of tuterings){
              if (d.request_id!=request_id){
                blockOutTutorings.push({
                start:d.periods.start.substring(11,16), 
                  end:d.periods.end.substring(11,16),
                  day:d.periods.start.substring(0,11), 
                  error:false,
                  edited:[],
                  confirmed: false,
                  hidden:true
                })
              }else{
                adjustableTutorings=[...adjustableTutorings,{
                  id:d.period_id,
                  start:d.periods.start.substring(11,16), 
                  end:d.periods.end.substring(11,16),
                  day:d.periods.start.substring(0,11), 
                  error:false,
                  edited:[],
                  confirmed: d.confirmed,
                  hidden:false
                }]
              }
            }
            let a = blockOutTutorings
            let results = []
            let curAv = av
            let curBr = br
            for (let i = 0;i<a.length;i++){
              setCurID(i)
              results = previewFullHandling(a,i,av,br)
              curAv= results[1]
              curBr= results[2]
            }
            let cur = adjustableTutorings
            for (let i = 0;i<cur.length;i++){
              setCurID(i)
              cur = previewFullHandling(cur,i,curAv,curBr)[0]
            }
            if (adjustableTutorings.length>0){
              setPreviews(cur)
              setPreviewsOrig(cur)
            }else{
              setPreviews([{id:crypto.randomUUID(), start:'', end:'', error:false,day:'',edited:[], confirmed:false}])
            }
            setCurID(0)
          }
      }
      else{
          setEventsUser2(events1)
          isOverlapping(eventsUser1,events1)
      }
      setLoad(false)
      return events1
  }
    // Check URL params on initial render
  const handleClickPeriod=async(id)=>{
    if (!admin){
      let x = eventsOfficial.find(item =>item.id==id)
      previewFullHandling(previews.map((item,index)=> index==curIndex?{...item, start:x.start.substring(11,16), end:x.end.substring(11,16), confirmed:null,day:x.start.substring(0,11)}:item))
    }
  }
    
    const clickTimeout = useState(null);
    const handleSingleClick = (user1, isActive)=>{
      setCurPerson(user1.id)
      clickTimeout.current=setTimeout(()=>{
        if (isActive){
          handleClickActive(user1)
        }else{
          handleClick1(user1)
        }
      },250)
    }
    const handleDoubleClick = (user1)=>{
      clearTimeout(clickTimeout.current)
      navigate('/tutorSetup', {state:{id:curPerson, editable:false, name: name, target:target}})
  
    }
  const addPeriod=async(s, e)=>{
      if(!blocked){
          const{data,error}=await supabase.from('periods') .upsert(
      {
        start: s,
        end: e,
      },
      {
        onConflict: 'start,end'
      }
    ).select()
    return data[0].id
      }
  }
    const hitOK=async()=>{
      setSecond(false) 
      setThird(true)
      setFourth(true)
    }
    const hitOK1=async()=>{
      setFinalPhase(true)
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
    
    if (third){
      setThird(false)
      for(const period of eventsOfficial){
        if (period.backColor!='#94949461' && period.backColor!='black' ){
          period.backColor='white'
        }
      }
    }
    const handleResize=async()=>{
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
      setResize(false)
      }
    }
    const handleDelete=async()=>{
      let x = eventsOfficial.find(item =>item.id==curID)
      let xIndex = activeUsers.findIndex(u => u.id === user.id)
      setEventsOfficial(prev => {
    const copy = [...prev]
    copy.splice(xIndex, 1, x)
    return copy
  })}
      const sendAdminEmail=async(name, admin1)=>{
        const templateParams = {
                name : admin1.name,
                action: adminName+ ' has proposed a meeting time to '+name+'.',
                email: admin1.email,
                note: message?'A note from '+ adminName+" to " +name+": "+message:''
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
      const sendAdmin=async(name)=>{
        const {data, error} = await supabase.from('profiles').select('').eq('role', 'admin')
        for (const admin1 of data){
          sendAdminEmail(name,admin1)
        }
            }
  const handleConfirmation = async()=>{
    for (let i = 0; i<previews.length;i++){
      //make block
      const block = await addPeriod(previews[i].day+previews[i].start+':00', previews[i].day+previews[i].end+':00')
      //add to proposed tutor blocks
      await supabase.from('tutor_match').upsert({
        tutor_id: id2,
        tutee_id: id,
        period_id: block,
        confirmed: 'pending',
        class_id: class_id,
        request_id: request_id
      })
      //remove from bulletins
      await supabase
        .from('tutor_match_invites')
        .delete()
        .eq('request_id', request_id)
      //update admin view
      await supabase.from('tutoring_requests').update({ progress: 'proposed',note: message}).eq('id', request_id)
      //TODO activate
      //sendAdmin(name)
  
      //send email
      const templateParams = {
              email: activeUsers[0].email,
              tutor :adminName,
              tutee : name,
              className: className,
              message: message? 'A note from '+adminName+': '+message:null
          };
          emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              'template_e954omp',
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
      
  }
  const handleConfirmationUpdate=async()=>{

    for (let i = 0; i<previewsOrig.length;i++){
      if (!previews.some(p => 
          p.start === previewsOrig[i].start &&
          p.end === previewsOrig[i].end &&
          p.day === previewsOrig[i].day
        )){
          const {error} = await supabase.from('tutor_match').delete().eq('request_id',request_id).eq('period_id', previewsOrig[i].id)
        }
    }
    for (let i = 0; i<previews.length;i++){
      if (!previewsOrig.some(p => 
          p.start === previews[i].start &&
          p.end === previews[i].end &&
          p.day === previews[i].day
        )){
        //make block
        const block = await addPeriod(previews[i].day+previews[i].start+':00', previews[i].day+previews[i].end+':00')
        //add to proposed tutor blocks
        
        await supabase.from('tutor_match').upsert({
          tutor_id: id2,
          tutee_id: id,
          period_id: block,
          confirmed: 'pending',
          class_id: class_id,
          request_id: request_id
        })
          
         }
      }
       //update admin view
        await supabase.from('tutoring_requests').update({ progress: 'proposed',note: message}).eq('id', request_id)
        //send email
        navigate('/Calendar')
        const templateParams = {
                email: email,
                tutor :adminName,
                tutee : name,
                className: className,
                message: message? 'A note from '+adminName+': '+message:null
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                'template_u2f2f6g',
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
  const addPreview=(events1, num, indexCur, pu)=>{
    let previewsUse=structuredClone(pu)
    if(!admin){
    let removes = []
    let events=events1.filter(event => {
    const s = new DayPilot.Date(event.start);
    const e = new DayPilot.Date(event.end);
    const checkStart = new DayPilot.Date(previewsUse[indexCur].day + previewsUse[indexCur].start + ':00');
    const checkEnd= new DayPilot.Date(previewsUse[indexCur].day+ previewsUse[indexCur].end + ':00');
    if (checkStart <= s && e<=checkEnd){
      removes.push({...event, pos:'mid'})
    }
    return !(checkStart <= s && e<=checkEnd);
  }).map(event => ({ ...event }));;
  
    for (let i = 0; i<num;i++){
    const first = events.findIndex(event=> {
      const s = new DayPilot.Date(event.start);
      const e = new DayPilot.Date(event.end);
      const check = new DayPilot.Date(previewsUse[indexCur].day+previewsUse[indexCur].start+':00');
      return check >= s && check < e;
    });
    removes = removes.toSorted((a, b) =>
      new DayPilot.Date(a.start).ticks - new DayPilot.Date(b.start).ticks
    )
    if (first!=-1){
      events[first].end = previewsUse[indexCur].day+previewsUse[indexCur].start+':00';
      if(true){
        removes.splice(0, 0, {...events[first], pos:'first'})
      }
    }
    if (first!=-1 && new DayPilot.Date(events1[first].end)>new DayPilot.Date(previewsUse[indexCur].day+previewsUse[indexCur].end+':00')){
      events.push({
        id: previewsUse[indexCur].id || crypto.randomUUID(),
        start: previewsUse[indexCur].day+previewsUse[indexCur].end+':00',
        end: events1[first].end,
        backColor: events1[first].backColor
      })
    }else{
      const second = events.findIndex(event=> {
        const s = new DayPilot.Date(event.start);
        const e = new DayPilot.Date(event.end);
        const check = new DayPilot.Date(previewsUse[indexCur].day+previewsUse[indexCur].end+':00');
        return check >= s && check < e;
      });
      if (second!=-1){
        events[second].start = previewsUse[indexCur].day+previewsUse[indexCur].end+':00';
        if(num==2){
        removes.push({...events[second], pos:'last'})
      }
      }
    }
    }
    previewsUse[indexCur].edited = removes
    for (let i = 0; i<num;i++){
      for (let p = 0; p<previewsUse.length; p++){
        if (p!=indexCur){
          for (const changed of previewsUse[p].edited){
            if (changed.pos=='mid'){
              events = events.filter(item=>item.id !=changed.id)
            }else{
              let x = events.findIndex(item=>item.id==changed.id)
              events[x] = changed
            }
          }
        }
      }
    }
    return [events, removes, previewsUse]
  }
  }
    const config = 
          {
            startDate: "2026-03-22",
            scrollHours: false,
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
    viewType: "Week",
    cellDuration: 1,
    cellHeight: 1,
  
    eventArrangement: "Full",
    durationBarVisible: false,
    businessBeginsHour: 8,
    businessEndsHour: 22,
    timeRangeSelectedHandling: "Enabled",
    
    eventMoveHandling: "Disabled",
    eventResizeHandling: "Update",
    eventClickHandling: "Edit",
    eventEditHandling: "Update",
    dayBeginsHour: 7,
    dayEndsHour: 22,
    onEventClicked: (args) => {
      if (!args.e.data.hidden){
        setCurID(args.e.data.id)
        handleClickPeriod(args.e.data.id)
      }
      },
    eventHoverHandling: "Disabled",
  };
  const [message, setMessage] = useState("");
    const sendEmailSchedule = async(email, tutorName) => {
      const {error} = await supabase.from('tutor_match_invites').upsert({
            request_id: request_id,
            tutor_id:activeUsers[1].id,
    }, {onConflict:'request_id'})
          await supabase.from('tutoring_requests').update({ progress: 'single', note:message}).eq('id', request_id)
          const templateParams = {
              email: activeUsers[1].email,
              tutor :activeUsers[1].name,
              tutee : activeUsers[0].name,
              className: className,
              message: message? 'A note from the Acedemic Skills Department: '+message:null
          };
          emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              'template_v8txwnu',
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
  return (
  
  <div style={{display:'flex'}}>
              <div style={{width:admin?'80%':'100%'}}>
                <div style={{padding:'20px'}}>
          {admin &&<Text
                              component="span"
                              variant="gradient"
                              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                              size='10vh'
                              weight={700}
                              style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                              >
                              Schedule Tutoring {className}
                              </Text>}
          {!admin && <Text
                              component="span"
                              variant="gradient"
                              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                              size='10vh'
                              weight={700}
                              style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                              >
                              Schedule Tutoring
                              </Text>}
                              <div style={{display: 'flex', justifyContent: 'center'}}>
                                          <div style={{width:'60vw', alignContent:'center'}}>
                                                  <Divider my="md" size="md"/>
                                                  </div>
                                                  </div>
            </div>
            <div style={{paddingBottom:'5px'}}>
          {activeUsers.length==2&&<Button variant='outline'onClick={()=>{setMode(!mode)}}>{mode?'Conglomerate':'Breakdown'}</Button>}
          </div>
          {(activeUsers.length==2)&&(<Button style={{position:'fixed', bottom:'20px', right:'20px', zIndex:100000}} onClick={()=>{
                let t = false
                for (const item of previews){
                  if (item.error == true){
                    t = true
                    break
                  }
                }
                if (!t){
                  if(previewsOrig.length>0 && previewsOrig!=previews){
                  setWarning(true)
                }else{
                  setEmailPrep(true)
                }
                }else{
                  notifications.show({
            color: 'red',
            title: 'Invalid Time Proposed',
            classNames: classes,
          })
                }
            }}>Next <IconChevronRight stroke={2}/></Button>)}
          {(mode|| admin)&&(<div style={{paddingBottom:'5px'}}>{
            activeUsers.map(user1 => (
    <Badge py='2px' h = '25px'key={user1.id} style={{backgroundColor: id==user1.id?'#80c8ffff':'#ff8080ff', borderWidth:'1px', borderStyle: "solid"}} onClick={() => {if(id!=user1.id){handleSingleClick(user1)}}}>
      {user1.name}
    </Badge>
  ))
  
          }</div>)}
          <DayPilotCalendar {...config} heightSpec= "BusinessHoursNoScroll" 
          events={[
    ...eventsOfficial.filter(item => item.start != item.end).map((item)=>({...item, resizeDisabled: true, hidden:false})),
    ...previews.map((preview, index) =>
            preview.start && preview.end && preview.day
              ? {
                  id: `preview-${index}`,
                  start: preview.day + preview.start + ":00",
                  end: preview.day + preview.end + ":00",
                  text: "",
                  borderColor: preview.confirmed =='confirmed' ? 'rgba(0,100,255,0.5)':preview.confirmed =='rejected' ?'rgba(255, 0, 0, 0.5)':'rgba(0,100,255,0.5)',
                  backColor: preview.confirmed =='confirmed' ? 'rgba(0,100,255,0.5)':preview.confirmed =='rejected' ?'rgba(255, 0, 0, 0.3)':'rgba(0,100,255,0.3)'
                }
              : null
          )
          .filter(Boolean)
  ]} />
          
                {!admin && (<div className="modal-menu">
      <div className="modalmenu">
        
          {previews.map((item, index)=>(
                      <Card key = {index} style={{ display: "flex", flexDirection: "row" ,color:curIndex==index?'black':'grey',backgroundColor:previews[index].error?'#ea8989ff':'#ffffff'}} onClick={()=>{setCurIndex(index) }}>
                        <div style = {{paddingTop:'20px'}} onClick={()=>{
              if (previews.length>1){
                setCurIndex(0)
                let q = previewFullHandling(previews.filter((_,index1)=> index1!=index), 0)
                if (q[0].length==0){
                  setPreviews(prev=>prev.filter((_,index1)=> index1!=index))
                }
              }
                          }}><IconX style={{position:'absolute',top:'10px', right:'10px'}} /></div>
        <div style={{width:'35%'}} onClick={()=>{
          setCurIndex(index)
          
          }}>
        <TimePicker label='Start:' style={{width:'110px'}} format="12h" value={previews[index].start} onChange={(event)=>{
          previewFullHandling(previews.map((item,index)=> index==curIndex?{...item, start:event}:item))
        }}/>
        </div>
        <div style={{width:'35%'}}>
        <TimePicker label='End:'style={{width:'110px'}} format="12h" value={previews[index].end} onChange={(event)=>{
          previewFullHandling(previews.map)
        }}/>
        </div>
        <div style={{width:'35%'}}>
  <Select label='Day:' w='75px'comboboxProps={{
    zIndex: 100000,
  }}  
  data={[
    { value: '2026-03-22T', label: 'Mon' },
    { value: '2026-03-23T', label: 'Tue' },
    { value: '2026-03-24T', label: 'Wed' },
    { value: '2026-03-25T', label: 'Thu' },
    { value: '2026-03-26T', label: 'Fri' },
    { value: '2026-03-27T', label: 'Sat' },
    { value: '2026-03-28T', label: 'Sun' },
  ]}
  value={previews[index].day}
    
      onChange={(value)=>{
        const updated = previews.map((item, i) =>
      i === curIndex
        ? { ...item, day: value }
        : item
    );
          previewFullHandling(updated)
          setPreviews(updated)
        }} />
        </div>
        <p></p>
        </Card>
          ))}
        <Button variant='outline'style={{marginTop:'10px'}} onClick={()=>{
          setPreviews(prev=>[...prev,{start:'', end:'', error:false,day:'',edited:[]}])
          setCurIndex(previews.length)
        }}>Add</Button>
        </div>
        
        </div>)}
  
          
          
          
          {emailPrep && (
            <div className="modal-overlay">
    <div className="modal">
        <h2>Email to {admin?activeUsers[1].name:'student'}</h2>
  
        <TextInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message'
        />
        <div style={{paddingTop:'10px'}}>
              <Button variant = 'outline' onClick={()=>{
          if (admin){
            sendEmailSchedule()
          }else{
            if (previewsOrig.length==0){
              handleConfirmation()
            }else{
              handleConfirmationUpdate()
            }
          }
            
            }}>Send</Button>
                  </div>
      </div>
      </div>
  )}
  
        
          {load && (
            <div className="modal-overlay">
        
        <Loader color="blue" />
        
        
        
  
      </div>
  
          )}
          {warning && (
            <div className="modal-overlay">
      <div className="modal" style={{width:'30%'}}>
             <div style={{display:'flex', justifyContent:'center',paddingTop:'10px'}}>
<Text fz="xl">Confirmation</Text>
            </div>
            <div>
        </div>
        <div style={{display:'flex', justifyContent:'center',paddingTop:'10px'}}>
          <div style={{paddingRight:'2px'}}>
            <Button color='red' variant= 'light' onClick={()=>{
          setWarning(false)
        }}>Actually, no</Button>
        
        </div>
        <Button variant = 'light' onClick={()=>{
          setWarning(false)
          setEmailPrep(true)
        }}>Yes</Button>
        
        </div>
        </div>
        
  
      </div>
  
          )}
  
          
  
          
          
        </div>
        {admin&&
        <div style={{display:'flex', justifyContent:'center'}}>
          <div>
          <>
          <div style={{paddingTop:'40px'}}>
        <TextInput
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Type to search'
        />
        </div>
        {searchItem &&<div style={{paddingTop:'10px'}}>{filteredUsers
    .filter(u => activeUsers.every(a => a.id !== u.id))
    .map(user1 => (
        <div style={{display: 'flex',gap:'4px', alignContent:'center', justifyContent:'center'}} key={user1.id} onDoubleClick={() => handleDoubleClick()} onClick={() => {if(id!=user1.id){handleSingleClick(user1)}}}>
        <img src={avatars[user1.avatar_url]}style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    aspectRatio: '1',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    
                                                }}/>{user1.name}
      </div>
  ))}</div>}
      </>
      <div style={{paddingTop:'10px'}}>
          {!searchItem && recomended
          .filter(u => activeUsers.every(a => a.id !== u.id))
          .map(user1 => (
    <div style={{display: 'flex',gap:'4px', alignContent:'center', justifyContent:'center'}} key={user1.id} onDoubleClick={() => handleDoubleClick()} onClick={() => {if(id!=user1.id){handleSingleClick(user1)}}}>
       <img src={avatars[user1.avatar_url]}style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    aspectRatio: '1',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    
                                                }}/>
      {user1.name}
    </div>
  ))}</div>
        </div></div>}
  </div>
  
        
      )
      
    }
  