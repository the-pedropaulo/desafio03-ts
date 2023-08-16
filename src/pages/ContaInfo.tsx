import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { useContext, useEffect } from "react"
import { getUserAllLocalStorage } from "../services/storage"

const ContaInfo = () => { 
    const { user, setUser } = useContext(AppContext)
   
    useEffect(() => {
        const userExists = getUserAllLocalStorage()

        if(userExists) {
            const { user } = JSON.parse(userExists);
            
            user && setUser(user);
          }
    }, [])
    return (
        <>
            <Text fontSize='3xl' fontWeight='bold' color='white' padding={10}>
                Informações da conta
            </Text>
            <Link to='/conta/1'>
                <Text fontSize='xl'>
                    Nome: {user?.name}
                </Text>
                <Text fontSize='xl'>
                    E-mail: {user?.email}
                </Text>
            </Link>
        </>
    )
}

export default ContaInfo;



