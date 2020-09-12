import React ,{useState,useEffect}from 'react'
import {Link}  from 'react-router-dom'
import axios from 'axios'



function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [btn, setBtn] = useState(false)

    useEffect(()=>{
       if(email !== '' && password.length > 5){
           setBtn(true)
       }else{
           setBtn(false)
       }
    },[email,password])

  

    const authData={
        email: email,
        password: password,
        returnSecureToken: true
    }

    const submit =(e)=>{
        e.preventDefault()
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa-FqTe2diLWwLcCH3kLLXAbol0UYcodQ', authData)
        .then(response =>{
            console.log('connexion reussi')
            localStorage.setItem('idToken',response.data.idToken)
            localStorage.setItem('uid',response.data.localId)
            props.history.push('/Welcome')

        }).catch(error =>{
            setError(error)
            
        })

    }
   const BtnFinish= btn ? (<button>Connexion</button>) :  (<button disabled>Connexion</button>) 
   const errorMessage = error !=='' && <span>{error.response.data.error.message}</span>


    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin '>

                </div>
                    <div className='formBoxRight'>
                        <form className='formContent' onSubmit={submit} >

                            {errorMessage}
                            <h2>Connexion</h2>
                            
                            <div className='inputBox'>
                                <input type='email'  id='email' required onChange={e => setEmail(e.target.value)} />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input type='password' id='password' required onChange={e => setPassword(e.target.value)}/>
                                <label htmlFor='password'>password</label>
                            </div>
                        
                            <div>
                                {BtnFinish}
                            </div>
                        
                        </form>
                            <div className='linkContainer'>
                                    <Link to='/ForgetPasswd' className='simpleLink'> Mot de passe oublier ?</Link>
                            </div>
                    </div>
                            
            </div>
                        
        </div>
    )
}

export default Login
