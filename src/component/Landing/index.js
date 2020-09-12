import React,{useEffect,useState,useRef,Fragment} from 'react'
import {Link} from 'react-router-dom'

function Landing() {

    const [btn,setBtn]= useState(false)
    const refwolf = useRef(null)

    useEffect(()=>{ 
        refwolf.current.classList.add('startingImg')
        setTimeout(() => {
        refwolf.current.classList.remove('startingImg')
        setBtn(true)
        }, 1000);
    },[])

    const showLeftGriffe =()=>{
        refwolf.current.classList.add('leftImg')
    }
    const showRightGriffe =()=>{
        refwolf.current.classList.add('rightImg')
    }

    const clearLeftGriffe = ()=>{
        refwolf.current.classList.remove('leftImg')
    }

    const clearRightGriffe = ()=>{
        refwolf.current.classList.remove('rightImg')
    }


  
   const showBtn= btn && ( 
            <Fragment>
            <div onMouseOver={showLeftGriffe} onMouseOut={clearLeftGriffe} className='leftBox'>
            <Link to='/Inscription' className='btn-welcome'>Inscription</Link>
            </div>
            <div  onMouseOver={showRightGriffe} onMouseOut={clearRightGriffe} className='rightBox'> 
             <Link to='/Login'className='btn-welcome'>Connexion</Link>  
            </div>
            </Fragment>)

    return (
        <main ref={refwolf} className='welcomePage'>
           
        {showBtn}

        </main>
    )
}

export default Landing
 