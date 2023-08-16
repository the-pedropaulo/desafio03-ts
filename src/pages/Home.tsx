import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage, getAllLocalStorage, getUserAllLocalStorage, setUserLocalStorage } from "../services/storage";
import { UserData } from "./Conta";

const Home = () => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const { setIsLoggedIn, setUser } = useContext(AppContext)
    const navigate = useNavigate()

    const validateUser = async (email: string, password: string) => {
        const loggedIn: UserData | any = await login(email, password)

        if(!loggedIn){
            return alert('Email inválido')
        }

        setIsLoggedIn(true)
        changeLocalStorage({ login: true })
        setUser(loggedIn)
        setUserLocalStorage({ user: loggedIn })
        loggedIn && navigate(`/conta/${loggedIn.id}`)
    }

    useEffect(() => {
        const storage = getAllLocalStorage()

        if(storage) {
          const { login } = JSON.parse(storage);
           login && navigate('/conta/1');
        }
    }, [navigate])
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <Center>
                    <DButton
                        onClick={() => validateUser(email, password)}
                    />
                </Center>
            </Card>
        </Box>
    );
}

export default Home;
