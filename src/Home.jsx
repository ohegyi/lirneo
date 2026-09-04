import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabase";
import { Loader } from "@mantine/core";
import { useAuth } from "./lib/useAuth";
import VariableProximity from "./assets/VariableProximity";
export default function Home() {
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
                </div>
                </div>
                </div>
    </div>
  )
}