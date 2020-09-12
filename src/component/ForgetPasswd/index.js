import  {FirebaseContext} from '../Firebase/index'
import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'

function ForgetPasswd(props) {


    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const firebase = useContext(FirebaseContext)

    const submit =(e)=>{
 
        e.preventDefault()
        firebase.passwordReset(email).then(()=>{
            setError(null)
            setSuccess(`un mail a étè envoyer a l'adresse ${email}`)

            setTimeout(() => {
                props.history.push('/Login')
            }, 3000);
            
        }).catch((error)=>{
            setError(error)
            setEmail(null)
            setSuccess(null)
        })
    }

    const BtnFinish = email !== '' ? (<button>Recuperer</button>) : (<button disabled>Recuperer</button>)
    const errorMessage = error && (<span> {error.message}</span>)
    const successMessage = success && (<span style={{ border: "1px solid green",background: "green",color: "#ffffff"}}> {success}</span>)

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'>

                </div>
                    <div className='formBoxRight'>
                        <form className='formContent' onSubmit={submit} >

                            {errorMessage}
                            {successMessage}

                            <h2>Mot de passe oublier ?</h2>
                            
                            <div className='inputBox'>
                                <input type='email'  id='email' required onChange={e => setEmail(e.target.value)} />
                                <label htmlFor='email'>Email</label>
                            </div>
                        
                            <div>
                                {BtnFinish}
                            </div>
                        
                        </form>
                            <div className='linkContainer'>
                                    <Link to='/Login' className='simpleLink'> Inscrit ? connectez-vous</Link>
                            </div>
                    </div>
                            
            </div>
                        
        </div>
    )
}


export default ForgetPasswd
