import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import CardInfo from "../components/CardInfo"
import { AppContext } from "../components/AppContext"
import { getUserAllLocalStorage } from "../services/storage"

export interface UserData {
    email: string
    password?: string
    name: string
    balance: number
    id: string
}

const Conta = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn, user, setUser } = useContext(AppContext)

    !isLoggedIn && navigate('/')

    const actualData = new Date()

    if(user && id !== user.id) {
        navigate('/')
    }

    useEffect(() => {
        const userExists = getUserAllLocalStorage()

        if(userExists) {
            const { user } = JSON.parse(userExists);
            
            user && setUser(user);
          }
    }, [])
  
    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    user.id === undefined || user.id === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={`Bem vinda ${user?.name}`} content={`${actualData.getDay()} / ${actualData.getMonth()} / ${actualData.getFullYear()} ${actualData.getHours()}:${actualData.getMinutes()}`} />
                            <Link to={'/infoconta'}>
                                <CardInfo mainContent='Saldo' content={`R$ ${user.balance}`}/>
                            </Link>
                            
                        </>
                    )
                }
            </SimpleGrid>    
        </Center>
    )
}

export default Conta
