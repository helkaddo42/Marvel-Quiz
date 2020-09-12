import React,{useState,Fragment,useEffect} from 'react'
import Logout from '../Logout/index'
import Quiz from '../Quiz/index'
import Axios from 'axios'

function Welcome(props) {

    const [userSession,setUserSession] = useState('')
    const [userData,setUserData] = useState('')

   
    useEffect(() => {
        let idToken = localStorage.getItem('idToken')
        idToken !== '' ? setUserSession(idToken) : props.history.push('/')

        let uid = localStorage.getItem('uid')
        Axios.get(`https://marvel-quiz-cb809.firebaseio.com/users/${uid}.json`).then((response)=>{
          
            let info = response.data
            let userInfo = Object.values(info)[0]
            setUserData(userInfo)

        }).catch((err)=>{
            console.log('2/',err)
        })

       
    }, [])

   


    const path_Allow = userSession === null ? 
    (
        <Fragment>
            <div className='loader'></div>
        </Fragment>
    ):(
        <div className='quiz-bg'>
            <div className='container'>
                <Logout redirected={props}/>
                <Quiz  dataUser={userData}/>
            </div>
            
        </div>
    )

   
    return  (
        [path_Allow]
    )
}

export default Welcome
 