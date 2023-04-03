import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link, useNavigate} from 'react-router-dom'
import * as yup from "yup"
import React, { useContext, useEffect} from 'react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';
import { AuthContext } from '../../contexts/AuthContext';
import { iLogin } from '../../contexts/AuthContext';
import HeaderNav from '../../components/Navbar';
const schema = yup.object({
    email: yup.string().email('Deve ser um email valido').required('Campo obrigatorio'),
    password: yup.string().required('Campo obrigatorio')
   
  });



const Login = ()=>{
    const {register,handleSubmit, formState:{errors}}= useForm<iLogin>({resolver: yupResolver(schema)})
    const {registerUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
      if(window.localStorage.getItem('token')){
        navigate("Dashboard")
      }
    },[])
   
  return (



    <> 
      <HeaderNav location='login'/> 
      <form onSubmit={handleSubmit(registerUser)}>
      <Container 
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: '100vh' }}
      >
        <Card css={{ mw: '420px', p: '20px' }}>
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
           Login
          </Text>
          <Input
            clearable
            underlined
            fullWidth
            color="secondary"
            size="lg"
            placeholder="Email"
            {...register("email")}
          />
          <Spacer y={1} />
          <Input.Password
            clearable
            underlined
            fullWidth
            color="secondary"
            size="lg"
            placeholder="Senha"
            {...register("password")}
          />
          <Row justify="flex-end">
            <Link to={'/register'}><Text size={14}>Ainda não é cadastrado?</Text></Link>
          </Row>
          <Spacer y={1} />
          <Button 
          ghost
          color={'secondary'}
          type='submit'
          >Entrar</Button>
        </Card>
      </Container>
    </form>
    </>
  ) 
}

export default Login