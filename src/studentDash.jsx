import { Button, Card, Divider, Drawer, Grid, Text } from "@mantine/core"
import { useAuth } from "./lib/useAuth"
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

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
import { useNavigate } from "react-router-dom"

export default function StudentDash(){
    const {profile} = useAuth()
    const [requests, setRequests] = useState([])
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
    const [info, setInfo] = useState(false)
    const navigate = useNavigate()
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
    const getRequests=async()=>{
        const {data} = await supabase.from('tutoring_requests').select('id, progress, Classes(subject,name)').eq('student_id', profile.id)
        setRequests(data)
    }
    useEffect(()=>{
        getRequests()
    })
    //todo button to confirm for proposed
    const getMoreInfo = async(request_id, progress, className)=>{
        if(progress=='proposed'||progress=='confirmed'){
            const {data, error} = await supabase.from('tutor_match').select(`
                profiles!tutor_match_tutor_id_fkey(name, email),
                periods(start)
                `).eq('request_id',request_id)
            let t = {}
            if (data){
                t = {
                    request_id: request_id,
                    times: [data[0].periods.start],
    
                    tutorName: data[0].profiles.name,
                    tutorEmail: data[0].profiles.email,

                    className:className,
                    progress:progress
                }
                for (let i = 1; i<data.length; i++){
                        t.times=[...t.times, d.periods.start]
                    }
                }
                setInfo(t)
            }else{
                setInfo({
                    className:className,
                    progress:progress
                })
            }
        }
    return(
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
                                Dashboard
                                </Text>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                <div style={{width:'60vw', alignContent:'center'}}>
                                                    <Divider my="md" size="md"/>
                                                    </div>
                                </div>
                                </div>
        <Grid align="stretch" style={{width:'100%'}}>
                        {requests.map(request => 
                                    <Grid.Col key = {request.id} span={{ base: 12, md: 4, lg: 3 }} style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    }} >
                                        <Card onClick={()=>{getMoreInfo(request.id, request.progress, request.Classes.name)}} miw = '200px' maw='250px' padding="0" style={{ miw:'250px', containerType: 'inline-size',width: '100%', aspectRatio: '16 / 9', backgroundColor:'white', color:'black', borderColor:'#cbcbcbff'}} withBorder orientation="horizontal">
    <img src={images[request.Classes.subject]}
    style={{width:'100cqw', aspectRatio: '1',height:'auto', objectFit: 'cover',position:'absolute', bottom:'40%'}}
    />
    <div style={{position:'absolute', bottom:0, width: '100cqw'}}>
      <div style={{display:'flex', alignItems:'flex-start', paddingLeft:'3cqw'}}>
        <div>
        <Text
        component="span"
        align="center"
        variant="gradient"
        weight={700}
        size='lg'
        truncate="end"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >{request.Classes.name}</Text>
        </div>

        </div>
        <div style={{display:'flex', alignItems:'flex-start', paddingLeft:'3cqw'}}>
        <Text c = 'dimmed'>Status: {request.progress=='single' || request.progress=='group'?'posted':request.progress}</Text>
        </div>
        </div>
        <div style={{width:'100px'}}>
       
    </div>
    </Card>
                                    </Grid.Col>
                        )
                                }
                                    </Grid>

                    <Drawer position={'right'} offset={8} radius="md" opened = {info} onClose={()=>{
                                        setInfo(false)
                                        }}>
                            
                         <div>
                                <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='40px'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif', }}
                    >
                    {info.className}
                    </Text>
                     <div style={{width:'60%'}}>
                    <Divider my="md" size="md"/>
                    </div>

                                <div style={{display:'flex', flexDirection: 'row', paddingBottom:'2%'}} >
                            </div>
                            {info.tutorName&&<div>
                                    <p><b>Tutor: </b>{info.tutorName}</p>
                                    <p><b>Tutor contact: </b>{info.tutorEmail}</p>
                                    <p><b>{info.progress=='proposed'?'Proposed Meetings:':'Meetings:'}</b></p>
                                    <div style={{paddingLeft:'20px'}}>
                                    {info.times.map((time)=>(
                                            <div key={time}>
                                                <p>{datesDays[time.substring(8,10)]} {datesTimes[time.substring(11,13)][0]}{time.substring(13,16)}{datesTimes[time.substring(11,13)][1]}</p>
                                            </div>
                                        ))}
                                        </div>
                                    {info.progress=='proposed'&& <Button style={{position:'absolute', bottom:'20px',right:'20px'}}variant='light' onClick={()=>{navigate('/calendar')}}>Confirm these times</Button>}

                                </div>}
                                </div>
                            
                        </Drawer>
                                    </div>
    )
}