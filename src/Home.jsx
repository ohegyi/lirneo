import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabase";
import { Button, Loader } from "@mantine/core";
import { useAuth } from "./lib/useAuth";
import VariableProximity from "./assets/VariableProximity";
import SplitText from "./assets/SplitText";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate=useNavigate()
  const containerRef = useRef(null);
  const {profile}=useAuth()
  return (
    <div
  style={{
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%'
  }}
>
      <div style={{position:'absolute',zIndex: 10, top:0, left:300}}>
        <div style={{position:'absolute', top:0,left:0}}>
        <div
ref={containerRef}
style={{position: 'relative'}}
>
        <VariableProximity
            label={`Hey,${profile.name.split(' ')[0]}`}
            className={'variable-proximity-demo'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={200}
            style={{fontSize:'140px'}}
            falloff="linear"
          />
          {profile.role=='student'&&<Button variant='white' onClick={()=>{
      navigate('/tutorSetup', {state:{id:profile.id, editable:true}})
      }}>
    <div style={{color:'black',display:'flex', alignItems:'center',justifyContent:'center'}}>
  <SplitText
  text='Apply to be a tutor'
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={1}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  showCallback
/>
</div>
</Button>}

                </div>
                </div>
                </div>
    </div>
  )
}