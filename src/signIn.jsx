import { Button } from "@mantine/core";
import { supabase } from "./lib/supabase";
import { useAuth } from "./lib/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import VariableProximity from "./assets/VariableProximity.jsx";
import SplitText from "./assets/SplitText";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function SignIn() {

const containerRef = useRef(null);

  const {signInWithGoogle} = useAuth()
  const navigate = useNavigate()
  const [showing,setShowing]=useState(false)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowing(true)
    },3700)
    return ()=> clearTimeout(timer)
  },[])
  return (<div style={{display:'flex', width:'100%', height:'100vh',alignItems:'center', justifyContent:'center'}}>
    <div
ref={containerRef}
style={{position: 'relative'}}
>
  <VariableProximity
    label={'lirneo'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={200}
    style={{fontSize:'200px'}}
    falloff="linear"
  />
  <div style={{height:'300px'}}>
    <Button variant='white'>
    <div style={{color:'black',display:'flex', alignItems:'center',justifyContent:'center'}}onClick={()=>{
      signInWithGoogle()
      }}>
  <SplitText
  text='sign in'
  className="text-2xl font-semibold text-center"
  delay={390}
  duration={2}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  showCallback
/>
<div style={{ flex:'row',alignItems:'center', justifyContent:'center'}}>
{showing && <IconArrowNarrowRight stroke={2}/>}
</div>
</div>
</Button>
</div>
  
</div>
    </div>
  );
}