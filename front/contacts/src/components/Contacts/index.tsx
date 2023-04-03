import { useEffect, useState } from 'react';
import { Container, Card, Text, Button, Spacer, Modal, Input } from '@nextui-org/react';
import api from '../../services/api';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export interface iContact {
    id: string;
    name: string;
    phone: string;
    email: string;

}

interface ContactsProps {
    contacts: iContact[];setContactsFunc: React.Dispatch<React.SetStateAction<iContact[]>>;
};
    

const schema = yup.object({
    email: yup.string().email('Deve ser um email valido').required('Campo obrigatorio'),
    phone: yup.string().required('Campo obrigatorio'),
    name: yup.string().required('Campo obrigatorio'),


});

const Contacts = ({ contacts }: { contacts: iContact[],  }) => {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };
    const [attContacts, setAttContacts] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm<iContact>({ resolver: yupResolver(schema) })

    const deleteContact = async (contactId: string) => {
        try {
            await api.delete(`/contacts/${contactId}`);
            setAttContacts(!attContacts)
        } catch (error) {
            console.error(error);
        }
    };

    const createContact = async (data: iContact) => {
        console.log(data);
        try {
            await api.post(`/contacts`, data);
            setAttContacts(!attContacts)
        } catch (error) {
            console.error(error);
        }

    }
   
    return (
        <>
            <Container display='flex'

                css={{
                    flexWrap: 'wrap',
                    mw: '100%',
                    gap: '20px'
                }}
            >

                <div style={{width:'100%', marginTop:'30px'}}>
                    <Button color={'secondary'} auto shadow onPress={handler}>
                        +
                    </Button>
                    <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={closeHandler}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={18}>
                                Novo Contato

                            </Text>
                        </Modal.Header>
                        <form onSubmit={handleSubmit(createContact)}>
                            <Modal.Body>

                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="secondary"
                                    size="lg"
                                    placeholder="Nome"
                                    {...register("name")}

                                />

                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="secondary"
                                    size="lg"
                                    placeholder="Email"
                                    {...register("email")}

                                />

                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="secondary"
                                    size="lg"
                                    placeholder="Telefone"
                                    {...register("phone")}

                                />


                            </Modal.Body>
                            <Modal.Footer>
                                <Button auto flat color="error" onPress={closeHandler}>
                                    Fechar
                                </Button>
                                <Button auto onPress={closeHandler} type='submit'>

                                    Criar
                                </Button>

                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
                
                {
                    contacts.map(contact => {
                        return (
                            <Card
                                key={contact.id}
                                css={{
                                    backgroundColor: '$secondary',
                                    padding: '20px',
                                    mw: '300px'
                                }}

                            >
                                <Text color='#fff' >{contact.name}</Text>
                                <Text color='#fff' > {contact.email}</Text>
                                <Text color='#fff' >{contact.phone}</Text>

                                <Spacer y={2}></Spacer>
                                <Container
                                    css={{
                                        mw: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-around',


                                    }}
                                >
                                    {/* <Button size={'xs'} color={'success'}> Editar</Button> */}
                                    <Button size={'xs'} color={'error'} onClick={() => deleteContact(contact.id)}> Deletar</Button>
                                </Container>
                            </Card>
                        )
                    })
                }
            </Container>

        </>
    )
}


export default Contacts;
