import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useContext, useEffect } from 'react';
import { AuthContext, iCreateUser } from '../../contexts/AuthContext';
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Container,
} from '@nextui-org/react';
import HeaderNav from '../../components/Navbar';




const schema = yup.object({
    name: yup.string().required('Campo obrigatorio'),
    email: yup.string().email('Deve ser um email valido').required('Campo obrigatorio'),
    password: yup.string().required('Campo obrigatorio'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Deve ser igual a senha'),
    phone: yup.number().required('Campo obrigatorio'),
    image: yup.string().required('Campo obrigatorio'),
    age:yup.number().required('Campo obrigatorio'),

});


const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<iCreateUser>({ resolver: yupResolver(schema) })
    const navigate = useNavigate()
    const { createUser } = useContext(AuthContext)

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            navigate("Dashboard")
        }
    }, [])

    return (
        <>
            <HeaderNav location='register'/>
            <form onSubmit={handleSubmit(createUser)}>
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
                            Registro
                        </Text>


                        <Input
                            clearable
                            underlined
                            fullWidth
                            color="secondary"
                            size="lg"
                            placeholder="Nome"
                            {...register("name")}
                        />

                        <Spacer y={1} />
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
                        <Input
                            clearable
                            underlined
                            fullWidth
                            color="secondary"
                            size="lg"
                            placeholder="Telefone"
                            {...register("phone")}
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

                        <Spacer y={1} />
                        <Input.Password
                            clearable
                            underlined
                            fullWidth
                            color="secondary"
                            size="lg"
                            placeholder="Confirme a senha"
                            {...register("confirmPassword")}
                        />

                        <Spacer y={1} />
                        <Input
                            clearable
                            underlined
                            fullWidth
                            color="secondary"
                            size="lg"
                            placeholder="Url de imagem"
                            {...register("image")}
                        />

                        <Spacer y={1} />
                        <Input
                            clearable
                            underlined
                            fullWidth
                            color="secondary"
                            size="lg"
                            placeholder="Idade"
                            {...register("age")}
                            type='number'
                        />


                        <Spacer y={1} />
                        <Button
                            ghost
                            color={'secondary'}
                            type="submit"

                        >Cadastrar</Button>

                    </Card>
                </Container>
               
            </form>
        </>
    )

}

export default Register