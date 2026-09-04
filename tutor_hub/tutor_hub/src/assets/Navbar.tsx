import { useEffect, useState } from 'react';
import {
  IconCalendarTime,
  IconHome2,
  IconCategory,
  IconUser,
  IconMessagePlus,
  IconLogout
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Navbar.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
//TODO make student dashbaord to see how their requests are doing
const mockdata = {
  'student':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/studentDash'},
  { icon: IconCalendarTime, label: 'Schedule', path:'/calendar'},
  { icon: IconMessagePlus, label: 'Request a Tutor', path:'/tutoringRequest' },
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
],
'tutor':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/studentDash'},
  { icon: IconCalendarTime, label: 'Schedule', path:'/calendar'},
  { icon: IconMessagePlus, label: 'Request a Tutor', path:'/tutoringRequest' },
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
],
'tutorUpdated':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/tutorDash' },
  { icon: IconCalendarTime, label: 'Schedule', path:'/calendar'},
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
],
'tutorConfirmed':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/tutorDash' },
  { icon: IconCalendarTime, label: 'Schedule', path:'/calendar'},
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
],
'admin':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/tutorRequestNotifications' },
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
],
'teacher':[
  { icon: IconHome2, label: 'Home', path:'/Home'},
  { icon: IconCategory, label: 'Dashboard', path:'/'},
  { icon: IconUser, label: 'Profile', path:'/myProfile' },
]
}
;





type Role = 'student' | 'tutor' | 'tutorUpdated'|'tutorConfirmed' | 'admin' | 'teacher';
//type Icon = 'IconCalendarTime' | 'IconHome2' | 'IconCategory' | 'IconSettings' | 'IconUser' |'IconMessagePlus' | 'IconLogout'
export function Navbar()  {

  const { profile } = useAuth()
  const imageSrc = profile?.avatar_url
  let role = profile?.role || 'student'
  const navigate = useNavigate()
  const links = mockdata[role].map((link,index) => (
    <NavbarLink
      {...link}
      key={link.label}

      onClick={() => {
        navigate(link.path)
      }}
    />
  ));

  return (
    <nav className={classes.navbar} style={{minHeight: '100vh'}}>
      <Center>
        <img src={imageSrc} 
        style={{
          aspectRatio: '1',
        width: '50px',
        borderRadius: '50%',
        objectFit: 'cover'}}/>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" onClick={async()=>{
          const { error } = await supabase.auth.signOut()
          if (error) {
            console.error('Error signing out:', error.message)
          } else {
            navigate('/')
          }
        }}/>
      </Stack>
    </nav>
  );
}