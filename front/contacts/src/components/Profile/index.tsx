import { useContext, useEffect, useState } from 'react'
import api from '../../services/api'
import { iUser } from '../../contexts/AuthContext'
import {
    Spacer,
    Button,
    Text,
    Input,
    Container,
    Card,
} from '@nextui-org/react';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { iUpdateUser } from '../../contexts/AuthContext';

const schemaUp = yup.object({
    name: yup.string().optional(),
    email: yup.string().email('Deve ser um email valido').optional(),
    password: yup.string().optional(),
    phone: yup.number().optional(),
    image: yup.string().optional(),
    age: yup.number().optional(),

});


const Profile = ({ name, image, age, id, phone, email }: iUpdateUser) => {

    const { register, handleSubmit, formState: { errors }, } = useForm<iUpdateUser>({ resolver: yupResolver(schemaUp) })
    const { editUser } = useContext(AuthContext)

    const handleDelete = async (id: string) => {
        try {
            console.log(id)
            await api.delete(`/users/${id}`);
            toast.success('Usuário deletado com sucesso.');
            window.localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao deletar usuário.');
        }
    }
    const onSubmit = (data: iUpdateUser) => {
        const filteredData = {} as iUpdateUser;
        for (const [key, value] of Object.entries(data)) {
          if (value !== '') {
            filteredData[key] = value
          }
        }
        editUser(filteredData);
      };
      
   
    useEffect(() => {
        console.log('work')
    }, [])
    return (
        <>
            {
                <form onSubmit={handleSubmit(onSubmit)} >
                  
                        <Card css={{ mw: '520px', p: '20px',alignSelf:'center' }}>
                            <Text
                                size={24}
                                weight="bold"
                                css={{
                                    as: 'center',
                                    mb: '20px',
                                }}
                            >
                                Profile
                            </Text>


                            <Input
                                clearable
                                underlined
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={name}
                                {...register("name")}
                            />

                            <Spacer y={1} />
                            <Input
                                clearable
                                underlined
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={email}
                                {...register("email")}
                            />

                            <Spacer y={1} />
                            <Input
                                clearable
                                underlined
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={phone}
                                {...register("phone")}
                            />
                            
                            <Spacer y={1} />
                            <Input
                                clearable
                                underlined
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={image}
                                {...register("image")}
                            />

                            <Spacer y={1} />
                            <Input
                                clearable
                                underlined
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={String(age)}
                                {...register("age")}
                                type='number'
                            />


                            <Spacer y={1} />
                            
                            <Container css={{display:'flex', justifyContent: 'space-around'}}>

                            <Button
                                size={'sm'}
                                ghost
                                color={'secondary'}
                                type="submit"

                            >Editar</Button>
                            <Button
                                size={'sm'}
                                ghost
                                color={'error'}
                                onClick={() => handleDelete(id)}
                                css={{marginLeft:'10px'}}

                            >Deletar</Button>
                            </Container>

                        </Card>
                
                </form>
            }
        </>
    )
}

export default Profile