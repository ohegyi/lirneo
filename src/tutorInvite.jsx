import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import emailjs from '@emailjs/browser';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { IconInfoCircle } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
const icon = <IconInfoCircle />
export default function TutorInvite() {
    const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState('')
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    const [load, setLoad] = useState(false)
    const [mode, setMode]  = useState(0)
    const [filteredItems, setFilteredItems] = useState([])
    const [selected, setSelected] = useState([])
    const {profile} = useAuth()
    const user = profile;
    useEffect(() => {
        getDataRequests()
        getData()
    }, []);
    const sendEmailRegister = (email) => {
        const templateParams = {
            email: email,
            sender: user.email
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            'template_na9heeq',
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
    const getDataRequests=async()=>{
        const { data, error } = await supabase.from('profiles').select().eq('role','tutor')
        if (data) {
            setRequests(data)
        }
    }
    const getData=async()=>{
        
        const { data, error } = await supabase.from('profiles').select()
        if (data) {
            setUsers(data)
        }
        setLoad(false)
    }
    const handleInputChange = (event) => {
        setSearchItem(event.target.value)
        setFilteredItems(users.filter((user) =>
    (selected.every((s) => s.id !== user.id) && (user.email.toLowerCase().includes(event.target.value.toLowerCase()) || user.id.toLowerCase().includes(event.target.value.toLowerCase())))
    ));
    }
    const submit=async()=>{
        for (const user1 of selected) {
            sendEmailRegister(user1.email)
            if (user1.name==user1.email){
                const {data, error}=await supabase.from('profiles').insert({ email: user1.email, role:'tutor' })
            }else{
                await supabase.from('profiles').update({ role:'tutor' }).eq('id', user1.id)
            }
            
        }
    }
    return (
            <div>
                <h1>Class Registering</h1>
                <button onClick={submit}>Update</button>
                
                <div>
          <button style={{backgroundColor: mode === 0 ? '#c9e9f6' : 'white'}} onClick={()=>{setMode(0)}}>Requests</button>
          <button style={{backgroundColor: mode === 1 ? '#c9e9f6' : 'white'}} onClick={()=>{setMode(1)}}>Manual sends</button>
        </div>
                {mode===1&&(<div>
                    <form onSubmit={(event)=>{
                    event.preventDefault();
                    setSelected(prev=>[...prev, {id: searchItem, name: searchItem, email: searchItem}])
                    setSearchItem('')
                }}>
                <TextInput
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder='Type to search'
                />
                </form>
                {(searchItem!=='') && filteredItems
                    .map(o => (
                        <li key={o.id} style={{backgroundColor: o.role=='student' ? 'white' : 'lightgrey'}} onClick={()=>{
                            setSearchItem('')
                            setFilteredItems(filteredItems.filter((user) => user.id !== o.id));
                            setSelected(prev=>[...prev, o])
                        }}>

                            {o.email}
                        </li>
                ))}
                {selected
                    .map(o => (
                        <li key={o.id} onClick={()=>{
                            setSearchItem('')
                            setSelected(prev=>prev.filter((user) => user.id !== o.id));
                            setFilteredItems(prev=>[...prev, o])
                        }} style={{ backgroundColor: '#c9e9f6' }} >
                            {o.email}
                        </li>
                ))}
                </div>
                )}
                {load && (
                    <div className="modal-overlay">
                        <Loader color="blue" />
                    </div>
                    )
                }
                {mode===0&&requests.map((request)=>(
                    <div key={request.id} onClick={()=>{
                        navigate('/profile', {state:{id: request.id, editable:false, name: request.name}})
                    }}style={{border:'1px solid black', margin:'5px', padding:'5px'}}>
                        <p>{request.name}</p>
                    </div>
                ))}
        </div>
        
    )}