import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {TextInput, Text,Grid, Button, Divider } from "@mantine/core";
import { IconChevronRight, IconReload } from "@tabler/icons-react";
import RegularVerb from './lib/RegularVerb.js'
export default function Synopsis(){
    const {state}=useLocation()
    const [userAnswers, setUserAnswers]=useState({})
    const [again,setAgain]=useState(0)
    const vals = state?.vals
    let ind = vals.moods.indicative?{present:vals.tenses.present,imperfect:vals.tenses.imperfect,future:vals.tenses.future,perfect:vals.tenses.perfect,pluperfect:vals.tenses.pluperfect,'future perfect':vals.tenses['future perfect']}:{present:false,imperfect:false,future:false,perfect:false,pluperfect:false,'future perfect':false}
    let sub = vals.moods.subjunctive?{present:vals.tenses.present,imperfect:vals.tenses.imperfect,perfect:vals.tenses.perfect,pluperfect:vals.tenses.pluperfect}:{present:false,imperfect:false,perfect:false,pluperfect:false}
    let par = vals.moods.participle?{present:vals.tenses.present,perfect:vals.tenses.perfect,future:vals.tenses.future}:{present:false,perfect:false,future:false}
    let inf = vals.moods.infinitive?{present:vals.tenses.present,perfect:vals.tenses.perfect,future:vals.tenses.future}:{present:false,perfect:false,future:false}
    let valsRestructured={'indicative':ind,'subjunctive':sub,'participle':par,'infinitive':inf}
    let voices=[]
    const voicesKey={
        'active':0,
        'passive':1
    }
    if (vals.voice.active){
        voices.push('active')
    }
    if (vals.voice.passive){
        voices.push('passive')
    }

    const moodsToNums={
        indicative:0,
        subjunctive:1,
        participle:2,
        infinitive:3
    }

    const tenseToNums = {
    indicative: {
        present: 0,
        imperfect: 1,
        future: 2,
        perfect: 3,
        pluperfect: 4,
        'future perfect': 5
    },
    subjunctive: {
        present: 0,
        imperfect: 1,
        perfect: 2,
        pluperfect: 3
    },
    participle: {
        present: 0,
        perfect: 1,
        future: 2
    },
    infinitive: {
        present: 0,
        perfect: 1,
        future: 2
    }
};

    const { answers, verbBig, personBig, numberBig, genderBig } = useMemo(() => {
    const answers = {};

    const selectedConjugations=Object.entries(state.vals.conjugation).map(([key, val])=>val?key:0).filter(item=>item!=0)
    const pickedConjugation = Math.floor(Math.random() *selectedConjugations.length)
    const conjugations = [{first:["amo", "amare", "amavi", "amatus"], second:["moneo", "monere", "monui", "monitus"],third:["dico", "dicere", "dixi", "dictus"],thirdio:["facio", "facere", "feci", "factus"], fourth:["audio", "audire", "audivi", "auditus"]},{first:["amō", "amāre", "amāvī", "amātus"], second:["mōneō", "mōnere", "mōnui", "mōnitus"],third:["dīcō", "dīcere", "dīxi", "dīctus"],thirdio:["fācio", "fācere", "fēci", "fāctus"], fourth:["audiō", "audīre", "audīvi", "auditus"]}];
    
    const selectedPersonNumber=Object.entries(state.vals.personNumber).map(([key, val])=>val?key:0).filter(item=>item!=0)
    const pickedPersonNumber= Math.floor(Math.random() *selectedPersonNumber.length)
    const persons={'1':0, '2':1, '3':2}
    const numbers={'s':0, 'p':1}

    const numbersBig={'s':'singular', 'p':'plural'}

    const selectedGenders=Object.entries(state.vals.gender).map(([key, val])=>(val&&key!='clicked')?key:0).filter(item=>item!=0)
    const pickedGender= Math.floor(Math.random() *selectedGenders.length)
    const genders={'masculine':0, 'feminine':1, 'neuter':2}

    const macrons=vals.macrons.macrons?1:0
    
    let curVerb =conjugations[macrons][selectedConjugations[pickedConjugation]]
    const verbBig=curVerb
    const numberBig=numbersBig[selectedPersonNumber[pickedPersonNumber].substring(0,1)]
    const personBig=selectedPersonNumber[pickedPersonNumber].substring(1,2)
    const genderBig=selectedGenders[pickedGender]
    for (const [moodName, moodData] of Object.entries(valsRestructured)){
        if (vals.moods[`${moodName}`]){
            for (const [tenseName, tenseData] of Object.entries(moodData)){
                if (tenseData){
                    for (const voice of voices){
                    let verb=new RegularVerb(
                        curVerb[0], 
                        curVerb[1], 
                        curVerb[2], 
                        curVerb[3], 
                        persons[selectedPersonNumber[pickedPersonNumber].substring(1,2)], 
                        numbers[selectedPersonNumber[pickedPersonNumber].substring(0,1)], 
                        genders[selectedGenders[pickedGender]], 
                        tenseToNums[moodName][tenseName], 
                        moodsToNums[moodName],
                        voicesKey[voice],
                        macrons
                    );
                        if (moodName=='participle'&&tenseName=='perfect'&&voice=='active'){
                            answers[`${moodName+'-'+tenseName+'-'+'passive'}`]=verb.formVerb()
                        }else if(!(moodName=='participle'&&tenseName=='perfect'&&voice=='passive')){
                            answers[`${moodName+'-'+tenseName+'-'+voice}`]=verb.formVerb()
                        }
                }
                }
            }
        }
    }

    return {
    answers,
    verbBig,
    personBig,
    numberBig,
    genderBig
};
}, [state.vals, again]);
    
    
    const handleKeyDown = (event, itemKey) => {
    if (event.key.toLowerCase() === 'enter'){
            setAgain(prev=>prev+1)
            setUserAnswers({})
        }
    else if (event.shiftKey&&(event.key.toLowerCase()=='a'||event.key.toLowerCase()=='e'||event.key.toLowerCase()=='i'||event.key.toLowerCase()=='o')) {
        event.preventDefault()
        let newLetter= '';
        if (event.key.toLowerCase()==='a'){
            newLetter='ā'
        }
        else if (event.key.toLowerCase()==='e'){
            newLetter='ē'
        }
        else if (event.key.toLowerCase()==='i'){
            newLetter='ī'
        }
        else if (event.key.toLowerCase()==='o'){
            newLetter='ō'
        }
        else {
            newLetter = event.key;
        }
        let t= userAnswers[itemKey]??''
        setUserAnswers({...userAnswers, [itemKey]:t+newLetter})
    }
    }
   return (
    <div style={{paddingBottom:'40px'}}>
         <div style={{display:'flex',alignItems: 'flex-start', justifyContent:'center', width: '100%', padding:'20px'}}>
        
                <Text
                                  component="span"
                                  variant="gradient"
                                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                  size='10vh'
                                  weight={700}
                                  style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                                  >
                                  Synopsis
                                  </Text>
                                  <div style={{display:'flex', justifyContent:'center'}}>
                                                                  
                                                                  </div>
                                                                  
                                  </div>
                                  <div style={{display: 'flex', justifyContent:'center', alignContent:'center',width:'100%'}}>
                                  <div style={{width:'60vw', alignContent:'center'}}>
                                                                                      <Divider my="md" size="md"/>
                                                                                      <Text c='dimmed'>Verb: {verbBig[0]+', '+verbBig[1]+', '+verbBig[2]+', '+verbBig[3]}</Text>
                                                                                      <div style={{display:'flex', flexDirection:'row', gap:'20px', justifyContent:'center', width:'100%'}}>
                                                                                        <Text c='dimmed'>Person: {personBig}</Text>
                                                                                        <Text c='dimmed'>Number: {numberBig}</Text>
                                                                                        <Text c='dimmed'>Gender: {genderBig}</Text>
                                                                                      </div>
                                                                                      </div>
                                                                                      </div>
        {Object.entries(valsRestructured).map(([key, val])=>(
            <div key={key} style={{paddingTop:'20px'}}>
                {!Object.values(val).every(value => !value) && (
                <Text style={{ paddingBottom: 2 }}>{key}:</Text>
                )}
                <Grid key={key}>
                    {Object.entries(val).map(([nameTense, valTense])=>
                        (valTense&&(<Grid.Col key={nameTense}  style={{gap:'10px', justifyContent: 'center', display:'flex', flexDirection:'row', width:'100%'}}>
                            {voices.map(item=>(
                                <div>
                                <TextInput 
                                onKeyDown={(e) => handleKeyDown(e, `${key}-${nameTense}-${item}`)}
                                disabled={(nameTense=='present'&&key=='participle'&&item=='passive')||(nameTense=='perfect'&&key=='participle'&&item=='active')}
                                value={userAnswers[`${key}-${nameTense}-${item}`] ?? ''}
                               onChange={(e) => {
                                    setUserAnswers(prev => ({
                                        ...prev,
                                        [`${key}-${nameTense}-${item}`]: e.target.value
                                    }));
                                }}
                                styles={{
        input: {
            borderColor:
                userAnswers[`${key}-${nameTense}-${item}`] == answers[`${key}-${nameTense}-${item}`]
                    ? 'green'
                    : !userAnswers[`${key}-${nameTense}-${item}`]?'grey':'red'
        }
    }} style={{width:'15vw'}}type="text" key={`${key+'-'+nameTense+'-'+item}`} placeholder={!((nameTense=='present'&&key=='participle'&&item=='passive')||(nameTense=='perfect'&&key=='participle'&&item=='active'))&&nameTense}/>
                                </div>
                            ))}
                        </Grid.Col>))
                    )}
                </Grid>
            </div>
        ))}
    <Button style={{position:'fixed', bottom:'20px', right:'20px', zIndex:100000}} onClick={()=>{
        setAgain(prev=>prev+1)
        setUserAnswers({})
        }}><IconReload stroke={1}/>Again</Button>
    </div>
    
   )
}