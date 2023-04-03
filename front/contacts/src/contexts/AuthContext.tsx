import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

interface AuthContextProps {
  children: ReactNode;
}

export interface iUser {
  name: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  id?: string;
}

export interface iLogin {
  email: string;
  password: string;
}

export interface iCreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  image: string;
  age: number;
}

export interface iUpdateUser {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  phone?: string,
  image?: string
  age?: number
  id?: string
}

interface iProviderValue {
  registerUser: (data: iLogin) => Promise<void>;
  user: iUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<iUser | undefined>>;
  loading: boolean;
  createUser(data: iCreateUser): Promise<void>;
  editUser(data: iUpdateUser): Promise<void>;
}

export const AuthContext = createContext<iProviderValue>({} as iProviderValue);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<iUser>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get<iUser>('/profile');

          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function registerUser(data: iLogin): Promise<void> {
    try {
      const response = await api.post<iGetUser>('/login', data);

      const { user: userResponse, token } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(userResponse);
      localStorage.setItem('token', token);
      navigate('dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  async function createUser(data: iCreateUser): Promise<void> {
    delete data.confirmPassword;

    try {
      const response = await api.post('/users', data);
      toast.success('Conta criada com sucesso');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function editUser(data: iUser): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");
  
      api.defaults.headers.authorization = `Bearer ${token}`;
  
      await api.patch<iUser>(`/users/${user?.id}`, { ...data });
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil");
    }
  }

  return (
    <AuthContext.Provider value={{ registerUser, user, setUser, loading, createUser, editUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
