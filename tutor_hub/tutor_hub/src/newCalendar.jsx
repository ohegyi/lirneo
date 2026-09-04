import './index.css'
import { useState, useEffect } from 'react'
import { Alert, Button, Divider, Loader, Slider, Text } from '@mantine/core';
import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
import { supabase } from './lib/supabase'
import './index.css'
import { IconChevronRight, IconInfoCircle, IconX } from '@tabler/icons-react';
import { TimePicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import './lib/notifications.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './lib/useAuth';
const icon = <IconInfoCircle />
let events = [
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
        borderColor:'#ff3c3ccc',
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
export default function NewCalendar() {
  const [eventsOfficial, setEventsOfficial] = useState(events)
  const[showError,setShowError]=useState(false)
  const [resize, setResize] = useState(false)
  const [allSet, setAllSet] = useState(false)
  const [lastRound1, setLastRound1] = useState(false)
  const [load, setLoad] = useState(true)
  const [ok, setok] = useState(false)
  const [finalPhase, setFinalPhase] = useState(false)
  const [curID,setCurID]=useState('')
  const [curStart,setCurStart]=useState('')
  const [curEnd,setCurEnd]=useState('')
  const [value, setValue] = useState(100);
  const [valueStart, setValueStart] = useState();
  const [valueEnd, setValueEnd] = useState();
  const [menu, setMenu] = useState(true)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fourth, setFourth] = useState(false)
  const [frees, setFrees] = useState([])
  const navigate=useNavigate()
  const [thirdModal, setThirdModal] = useState(false)
  const [claims, setClaims] = useState(null)
  const {profile}=useAuth()
  const user = profile;

  // Check URL params on initial render
const getClosestEnd=async(time)=>{

  //for (const period of events){
    //const{data,error}= await supabase.from('periods').upsert({
          //start: period.start,
          //end:period.end,
          //backColor:period.backColor
  //})
  //}
    const timeDate=new Date(time)
    let curClosest=null
    let dif=0
    let curDiff=-99999999999999999999999
        for (const event of eventsOfficial){
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
        for (const event of eventsOfficial){
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

    let events=eventsOfficial
    let s = await getClosestEnd(period.start)
      let e = await getClosestStart(period.end)
      let thisID = await addPeriod(s,e)
      events=[...events, {
        start: s,
      end: e,
      backColor:'white',
      borderColor:'transparent',
      id: thisID
      }]
      setEventsOfficial(events)
  }
  //fix registering put in blocks even if I adjust
  const getClosestLoop=async()=>{
    let events=eventsOfficial
    for (const period of eventsOfficial){
      let s = await getClosestEnd(period.start)
      let e = await getClosestStart(period.end)
      if(new Date(e)-new Date(s)>=900000){
        let thisID = await addPeriod(s,e)
      events=[...events, {
        start: s,
      end: e,
      backColor:'white',
      borderColor:'transparent',
      id: thisID
      }]
      }
    }
    setEventsOfficial(events)
    setLoad(false)
    setLastRound1(false) 
    setok(true)
  }
  
  const [busies, setBusies] = useState([])
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
    let t = []
    for(const period of eventsOfficial){
      if (period.backColor!='white' ){
        period.borderColor= period.backColor=='94949461'? 'black':period.backColor
        period.backColor= period.backColor=='94949461'? '94949461':'#f5f5f5'
        t.push(period)
      }
    }
    setBusies(t)
  }


  
  const handleSlider=async(id)=>{
    setEventsOfficial(prev=>prev.map(event=>{
      if(event.id!==id)return event
      if(value==0){
        return { ...event, backColor: '#f5f5f5', borderColor:event.title??'#94949461' }
      }
      const color=value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})`
      return { ...event, backColor: color }
    }))
  }
  const handleResize=async()=>{
    if((String(curStart).length!=5 && String(curStart).length!=8) || (String(curEnd).length!=5 && String(curEnd).length!=8)){
      setShowError(true)
    }else{
    let x = eventsOfficial.find(item =>item.id==curID)
    let xIndex = eventsOfficial.indexOf(x)
    
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
    let xIndex = eventsOfficial.indexOf(x)
    setEventsOfficial(prev => {
  const copy = [...prev]
  copy.splice(xIndex, 1, x)
  return copy
})}
  const handleSubmission=async()=>{
  if(fourth && !ok){
        setLastRound1(true)
        getClosestLoop()
      }
    if (ok){
      setAllSet(true)
        for (const period of eventsOfficial){
          
        if (!(period.backColor=='#f5f5f5' || period.backColor=='#94949461')){
      await supabase.from('free').upsert({
          person_id: user.id,
          period_id:period.id,
          rating: period.backColor=='white'? `rgba(0,255,0,1)`:period.backColor
  }, {onConflict:'person_id,period_id'})
        }
      
      }
    }else if(!fourth){
      setSecond(true)
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
  businessBeginsHour: 8,
  businessEndsHour: 22,
  timeRangeSelectedHandling: "Enabled",
  onTimeRangeSelected: async (args) => {
    if (new Date(args.start)-new Date(args.end)>=-100000){
      getClosest(args)
    }else{
    let events=eventsOfficial
    let thisID=await addPeriod(args.start,args.end)
    events=[...events,{
      start: args.start,
      end: args.end,
      backColor:'white',
      borderColor:'transparent',
      id: thisID,
    }];
    setEventsOfficial(events)
    

    setCurID(thisID)
    setCurStart(String(args.start).substring(11))
    setCurEnd(String(args.end).substring(11))
    setResize(true)
    }
    
  },
  eventMoveHandling: "Disabled",
  eventResizeHandling: "Update",
  onEventResize: (args) => {
    args.preventDefault()
    setCurID(args.e.data.id)
    let x = eventsOfficial.find(item =>item.id==args.e.data.id)
    //.substring(11)
    setCurStart(String(x.start).substring(11))
    setCurEnd(String(x.end).substring(11))
    setResize(true)
  },
  eventClickHandling: "Edit",
  eventEditHandling: "Update",
  dayBeginsHour: 7,
  dayEndsHour: 22,
  onEventClicked: (args) => {
    setCurID(args.e.data.id)

    if(fourth && args.e.data.backColor!='#f5f5f5' && args.e.data.backColor!='#94949461'){
      handleSlider(args.e.data.id)
    }
    else{
      let x = eventsOfficial.find(item =>item.id==args.e.data.id)

    if(x.backColor=='#f5f5f5'&&value!=0){
      setFrees([...frees, x])
      console.log(x)
      x.title=x.borderColor
      x.backColor=value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})`
      x.borderColor='transparent'
    }else if(value!=0){
      setFrees([...frees, x])
      console.log(x)
      x.title=x.borderColor
      x.backColor='white'
      x.borderColor='transparent'
    } else if (!fourth && x.backColor!='#94949461'){
      setFrees(frees.splice(frees.indexOf(frees.find(item =>item.id==args.e.data.id))),1)
      x.backColor=x.title
      x.title=''
    }

  }
    },
  eventHoverHandling: "Disabled",
};
return (


            <div>
        <div style={{padding:'20px'}}>
                    <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                        size='10vh'
                                        weight={700}
                                        style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                        >
                                        Schedule: {profile.name}
                                        </Text>
                                        <div style={{display:'flex', justifyContent:'center'}}>
                                        <div style={{width:'60vw', alignContent:'center'}}>
                                                            <Divider my="md" size="md"/>
                                                            </div>
                                        </div>
                                        </div>
        {(!menu && !second && !lastRound1&& !allSet)&&<Button style={{position:'fixed', bottom:'20px', right:'20px', zIndex:100000}} onClick={handleSubmission}>Next<IconChevronRight stroke={2}/></Button>}
        {fourth && (
          <div style={{display:'flex', justifyContent:'center'}}>
          <div style={{width:'40%'}}>
          <Slider
          label={null}
      color={value<=50?`rgba(255,${(value)*(255/50)},0,${(50-value)/50+0.5})`:`rgba(${(100-value)*(255/50)},255, 0,${(value-50)/100+0.5})` }
      value={value} 
      onChange={setValue}
      
    /></div></div>)}
    <div style={{display:'flex', justifyContent:'center'}}>
    <div style={{width:'75%'}}>
        <DayPilotCalendar {...config} events={eventsOfficial} heightSpec= "BusinessHoursNoScroll"/>
    </div>
    </div>
        {menu && (
          <div className="modal-overlay">
    <div className="modal" style={{width:'300px', height:'150px', alignItems:'center', justifyContent:'center'}}>
      <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                        fz='lg'
                                        weight={700}
                                        style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                        >
                                        Welcome to lirneo
                                        </Text>
                                         <div style={{display:'flex', justifyContent:'center'}}>
                                        <div style={{width:'60%', alignContent:'center'}}>
                                                            <Divider size="md"/>
                                                            </div>
                                        </div>
                                        <div style={{padding:'15px'}}>
                                      <Text c='dimmed' fz='small'>Let's start by having you pick your free periods.</Text>
                                        </div>

      <Button variant='light'onClick={()=>setMenu(false)}>OK</Button>

    </div>
  </div>
        )}
        {second && (
          <div className="modal-overlay">
    <div className="modal" style={{width:'400px', height:'200px', alignItems:'center', justifyContent:'center'}}>
      <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                        fz='lg'
                                        weight={700}
                                        style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                        >
                                        Step 2...
                                        </Text>
                                         <div style={{display:'flex', justifyContent:'center'}}>
                                        <div style={{width:'60%', alignContent:'center'}}>
                                                            <Divider my="md" size="md"/>
                                                            </div>
                                        </div>
                                        <div style={{paddingBottom:'10px'}}>
                                      <Text c='dimmed' fz='sm'>Now we're going to give you a slider so you can assign varying levels of availability to the rest of your time. Feel free to add and edit time blocks. </Text>
                                        </div>

      <Button variant='light'onClick={hitOK}>OK</Button>

    </div>
  </div>
        )}
        
        {resize && (
          <div className="modal-overlay">
    <div className="modal">
      {showError && notifications.show({
                  color: 'red',
                  title: 'Empty Fields',
                  classNames: classes,
                })}
        <IconX stroke={2} onClick={()=>{setResize(false)}}/>
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
        {lastRound1 && (
          <div className="modal-overlay">
            <div className="modal" style={{width:'400px', height:'200px', alignItems:'center', justifyContent:'center'}}>
      <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                        fz='lg'
                                        weight={700}
                                        style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                        >
                                        Hold on...
                                        </Text>
                                         <div style={{display:'flex', justifyContent:'center'}}>
                                        <div style={{width:'60%', alignContent:'center'}}>
                                                            <Divider my="md" size="md"/>
                                                            </div>
                                        </div>
                                        <div style={{paddingBottom:'10px'}}>
                                      <Text fz='small' c='dimmed'>We some unaccounted-for time in your schedule, and we're paritioning it out for you now. Give us one second...</Text>
                                        </div>

                                    <div>
                                      {load && (<Loader color="blue" />)}
                            {ok && (<Button variant ='light' onClick={hitOK1}>OK</Button>)}
                                    </div>

    </div>
      

    </div>

        )}
        {allSet && (
          <div className="modal-overlay">
   <div className="modal" style={{width:'200px', height:'120px', alignItems:'center', justifyContent:'center'}}>
      <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                        fz='lg'
                                        weight={700}
                                        style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                        >
                                        All set
                                        </Text>
                                         <div style={{display:'flex', justifyContent:'center'}}>
                                        <div style={{width:'60%', alignContent:'center'}}>
                                                            <Divider my="md" size="md"/>
                                                            </div>
                                        </div>

      <Button variant='light'onClick={()=>navigate('/Home')}>Go back home</Button>

    </div>
    </div>

        )}
        
      </div>


      
    )
  }


  
  

    