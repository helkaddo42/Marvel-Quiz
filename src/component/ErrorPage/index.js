import React from 'react'
import joker from '../../images/joker.jpg'

function ErrorPage() {

    return (
        <div >
            <div className='container'>
            <h1 style={{color:'black'}}>Cette page n'éxiste pas dsl !</h1>
            <div>
                 <image  style={{backgroundColor:'red',height:'500px',width:'500px'}}src={joker} alt='error' />
            </div>
            

            </div>
        </div>
    ) 
}

export default ErrorPage
