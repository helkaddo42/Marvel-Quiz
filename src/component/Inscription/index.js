import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const dataSignUp = {
    pseudo:'',
    email:'',
    password:'',
    confirmPassword:''
}

function Inscription(props) {
    const [SignUpData, setSignUpData] = useState(dataSignUp)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {pseudo, email, password, confirmPassword} = SignUpData


const authData={
    email: email,
    password: password,
    returnSecureToken: true
}

const userData={
    pseudo : pseudo,
    email : email
}


const submit=(e)=>{
e.preventDefault()

axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa-FqTe2diLWwLcCH3kLLXAbol0UYcodQ',authData)
        .then((response) => {
            setError('')
            setSignUpData({...dataSignUp})
            const uid = response.data.localId


            axios.post(`https://marvel-quiz-cb809.firebaseio.com/users/${uid}.json`,userData).then(sendData=>{
                console.log(sendData)
            }).catch(err=>{
                console.log(err)
            })
                    

            setSuccess(`votre compte a bien étè creer ${pseudo}`)
            setTimeout(() => {
                props.history.push('/Login')
            }, 2000);
            
        })
        .catch(error => {
            setError(error)
            setSignUpData({...dataSignUp})

        })
}

const valueInput=(e)=>{
setSignUpData({...SignUpData,[e.target.id]: e.target.value})
}
// ternaire 
const BtnFinish= pseudo !=='' && email !=='' && password !=='' && password === confirmPassword ? 
                   (<button>Inscription</button>) :  (<button disabled>Inscription</button>)
const errorMessage= error !== '' && (<span>{error.response.data.error.message}</span>)
const successMessage= success && (<span style={{ border: "1px solid green",background: "green",color: "#ffffff"}}>{success}</span>)

return (
<div className='signUpLoginBox'>
<div className='slContainer'>
    <div className='formBoxLeftSignup'>

    </div>
    <div className='formBoxRight'>
        <form className='formContent' onSubmit={submit} >

            {errorMessage}
            {successMessage}
            <h2>Inscription</h2>
            <div className='inputBox'>
                <input type='text' value={pseudo} id='pseudo' required  onChange={valueInput} />
                <label htmlFor='pseudo'>Pseudo</label>
            </div>
            <div className='inputBox'>
                <input type='email' value={email} id='email' required onChange={valueInput} />
                <label htmlFor='email'>Email</label>
            </div>
            <div className='inputBox'>
                <input type='password' value={password} id='password' required onChange={valueInput} />
                <label htmlFor='password'>password</label>
            </div>
            <div className='inputBox'>
                <input type='password' value={confirmPassword} id='confirmPassword' required  onChange={valueInput}/>
                <label htmlFor='confirmPassword'>confirmer votre mot de passe</label>
            </div>

            <div>
                {BtnFinish}
            </div>
           
        </form>
            <div className='linkContainer'>
                    <Link to='/Login' className='simpleLink'> déja inscrit ? connectez-vous</Link>
            </div>
    </div>
</div>

</div>
)
}
export default Inscription
