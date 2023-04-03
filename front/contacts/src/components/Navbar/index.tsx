import React from 'react';
import { useLocation } from "react-router-dom";
import { Navbar, Container, Text, Button } from '@nextui-org/react';
import { string } from 'yup';

interface iProps {
    location:string
}
const HeaderNav = ({location}:iProps) => {
    const isDashboard = location === "dashboard";
    const isRegister = location === "register";
    const isLogin = location === "login" 


    const logout = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }


    return (
        <>
            <Navbar isBordered
                isCompact
                css={{
                    $$navbarBackgroundColor: "#763d76",
                    $$navbarBlurBackgroundColor: "transparent",
                    color: '#fff'
                }}
                disableBlur


            >
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs">
                        CRUD
                    </Text>
                </Navbar.Brand>
                <Navbar.Content>
                    {
                        isRegister &&
                        <Navbar.Link color="inherit" href="/login">
                        Login
                        </Navbar.Link>
                    }
                   
                    {
                        isLogin  && 
                        <Navbar.Link color="inherit" href="/register">
                        Registro
                        </Navbar.Link>
                    }
                    
                    {
                        isDashboard &&
                        <Navbar.Item>
                        <Button auto ghost  css={{backgroundColor:"transparent", border:'White',color:'#fff'}} onClick={logout}>
                          Sair
                        </Button>
                      </Navbar.Item>
                    }

                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default HeaderNav