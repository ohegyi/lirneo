import { useAuth } from "./lib/useAuth"
import { Box, Divider, Image, Marquee, Text } from "@mantine/core"
import biologyImg from '../assets/biology.jpg'
import chemistryImg from '../assets/chemistry.jpg'
import chineseImg from '../assets/chinese.jpg'
import csImg from '../assets/computer science.jpg'
import englishImg from '../assets/english.png'
import frenchImg from '../assets/french.jpg'
import greekImg from '../assets/greek.jpg'
import historyImg from '../assets/history.jpg'
import latinImg from '../assets/latin.jpg'
import mathImg from '../assets/math.jpg'
import physicsImg from '../assets/physics.jpg'
import spanishImg from '../assets/spanish.jpg'
import { useNavigate } from "react-router-dom"
export default function MyProfile(){
    const navigate=useNavigate()
    const {profile} = useAuth()
    return(
        <div style={{
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  }}>
        <div style={{display:'flex', paddingTop:'10vh', paddingLeft:'2%'}}>
            <div style={{paddingRight:'2vw'}}>
    <img src={profile.avatar_url} style={{
            width: '10vw',
            height:'10vw',
            aspectRatio: '1',
            borderRadius: '50%',
            objectFit: 'cover',
            }}/>
            </div>
            <div>
                <div style={{display:'flex',alignItems: 'flex-start', width: '100%'}}>
                <Text
                    component="span"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size='10vh'
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                    >
                    {profile.name}
                    </Text>
                    </div>
                    <div style={{width:'40vw'}}>
                                        <Divider my="md" size="md"/>
                                        </div>
                                        <div style={{display:'flex',alignItems: 'flex-start', width: '100%'}}>
                <Text c='dimmed'>{(profile.role=='tutorConfirmed' || profile.role=='tutorUpdated')?'tutor':profile.role=='tutor'?'student':profile.role}</Text>
                </div>
                                        
            </div>
            </div>
            <div style={{position:'absolute', bottom:'2vh',width: '100%'}}>
         <div style={{height: '20vh'}}>     
    <div style={{
        paddingLeft:'2vw',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  }}>
        <Text size='sm'>{profile.role=='student'?'Want to join the team?':(profile.role=='admin'|| profile.role=='teacher')?'One website,':'Changes?'}</Text>
        </div>
        <div style={{
            paddingLeft:'7vw',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  }}>
        <Text onClick={()=>{
                  if(profile.role=='student' || profile.role =='tutor' || profile.role=='tutorConfirmed' || profile.role=='tutorUpdated'){
                    console.log('jhere')
                    navigate('/tutorSetup', {state:{id:profile.id, editable:true}})
                  }
        }} size='10vh' fw={700} component="span" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>{profile.role=='student'?'Become a tutor':(profile.role=='admin'|| profile.role=='teacher')?'A lot of tutoring':'Update your tutoring profile'}</Text>
                    </div>
                    </div>  
    <Marquee reverse pauseOnHover gap="lg" fadeEdgeSize="15%">
      <Image radius="md" h='20vh' w="auto" fit="contain" src={biologyImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={chemistryImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={chineseImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={csImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={englishImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={frenchImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={greekImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={historyImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={latinImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={mathImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={physicsImg}  />
      <Image radius="md" h='20vh' w="auto" fit="contain" src={spanishImg}  />
    </Marquee>
    </div>
            </div>
)
}