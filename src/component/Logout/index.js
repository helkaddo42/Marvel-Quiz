import React,{useState,useEffect,useContext} from 'react'
import  {FirebaseContext} from '../Firebase/index'
import ReactToolTip from 'react-tooltip'


function Logout(props) {

    const  {redirected} = props
    const [btncheck, setBtnCheck] = useState(false)

    const firebase = useContext(FirebaseContext)

    useEffect(()=>{
       if(btncheck){
        localStorage.clear()
        redirected.history.push('/')
       }
    }, [btncheck,firebase])
    

    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input
                    onChange={()=> setBtnCheck(!btncheck)}
                    type='checkbox'
                />
                <span className='slider round' data-tip="Déconnexion"></span>
            </label>
            <ReactToolTip  place="left" effect="solid" />
         </div>
    )
}

export default Logout
