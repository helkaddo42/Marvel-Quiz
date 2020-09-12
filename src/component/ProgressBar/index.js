import React,{Fragment} from 'react'

function ProgressBar({idQuestion,maxQuestions}) {

        const getWidth = (idQuestion , maxQuestions)=>{
            return (idQuestion / maxQuestions) * 100
        }

        const actualQuestion = idQuestion + 1
        const progressPercent= getWidth(actualQuestion,maxQuestions)

    return (
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'> {`Question : ${idQuestion + 1} / ${maxQuestions}`}</div>
                <div className='progressPercent'> Progression : {progressPercent}% </div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange ' style={{width: `${progressPercent}%`}}></div>
            </div>
        </Fragment>
    )
}

export default React.memo(ProgressBar)
 