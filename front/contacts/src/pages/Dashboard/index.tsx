import { Profiler, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'
import { iUser } from '../../contexts/AuthContext'
import {
    Card,
    Spacer,
    Button,
    Text,
    Container,
} from '@nextui-org/react';
import HeaderNav from '../../components/Navbar'
import Profile from '../../components/Profile'
import Contacts from '../../components/Contacts'
import { iContact } from '../../components/Contacts'



const Dashboard = () => {
    const navigate = useNavigate()
    const [attPage, setAttPage] = useState(true)
    const [contacts,setContacts] = useState<iContact[]>([]) 
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate('/')
        }

        api.get<iUser>('/profile')
            .then(res => {
                setUser((res.data))

            })
            .catch(err => console.error(err))
        
        const getContacts = async () => {
            try {
                const response = await api.get('/contacts');
                const data: iContact[] = response.data.contacts;
                setContacts(data);
                console.log(data);
              
                return contacts;
                }catch (error) {
                    console.error(error);
                }
              };
        
        getContacts()

    }, [attPage])

    const logout = () => {
        window.localStorage.removeItem('token')

        setAttPage(!attPage)
    }


    return (
        <>
            <HeaderNav location="dashboard"/>
            <Container
                display="flex"
                alignItems="flex-start"
                justify="center"    
                css={{ 
                    minHeight: '100vh', 
                    bg:'$gray100',
                    borderRadius:'5px',
                    padding:'20px',
                    marginTop:'20px',
                    marginBottom:'20px'
            }}
            >
                <Card css={{ mw: '1200px', p: '20px',alignItems:'center', bg:'$gray100' }}>
                    <Profile
                        name={user?.name}
                        age={user?.age}
                        email={user?.email}
                        id={user?.id}
                        image={user?.image}
                        phone={user?.phone}
                        key={user?.id}
                    ></Profile>
                </Card>

              <Contacts 
                contacts= {contacts} setContactsFunc={setContacts}
              />

            </Container>
        </>
    )
}

export default Dashboard