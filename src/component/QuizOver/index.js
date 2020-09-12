import React, {Fragment,useEffect,useState} from 'react'
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader/loader';
import Modal from '../Modal/index'
import axios from 'axios'

const QuizOver = React.forwardRef((props, ref) => { 

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const hash = 'c15fe769e9cfc9b7538d3326c78bb9bd'

    const {
        levelName, 
        score, 
        maxQuestions, 
        quizLevel, 
        percent,
        loadLevelQuestions
    } = props;

    const [asked, setasked] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [infoCharacter, setInfoCharacter] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setasked(ref.current)
        if(localStorage.getItem('marvelStorageDate')){
            const dateStorage= localStorage.getItem('marvelStorageDate')
            checkDateAge(dateStorage)
        }
      
    }, [ref])

   const checkDateAge=(date)=>{
        const today = Date.now()
        const time = today - date

       const days = time / (1000*3600*24)
        
       if(days >= 15){
        localStorage.clear()
        localStorage.setItem('marvelStorageDate', Date.now())

       }
    
    }


    const showModal =(idHero)=>{
        
        if(localStorage.getItem(idHero)){
            setInfoCharacter(JSON.parse(localStorage.getItem(idHero)))
            setLoader(false)
        }else{
            setOpenModal(true)
            axios.get(`https://gateway.marvel.com/v1/public/characters/${idHero}?ts=1&apikey=${API_PUBLIC_KEY}&$hash=${hash}`)
            .then(response =>{
            setInfoCharacter(response.data)
            setLoader(false)

            localStorage.setItem(idHero, JSON.stringify(response.data))

            if(!localStorage.getItem('marvelStorageDate')){
                localStorage.setItem('marvelStorageDate', Date.now())
            }



        }).catch(err =>(console.log(err)))

        }

        
    }

    const hideModal =()=>{
        setOpenModal(false)
        setLoader(true)
    }
    
    const averageGrade= maxQuestions / 2


    const capitalizeFirestletter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    if(score < averageGrade){ 
        setTimeout(()=>loadLevelQuestions(quizLevel), 2000)
    }

    const decision = score >= averageGrade ?
    (
        <Fragment>
            <div className='stepsBtnContainer'> 
            {
                quizLevel < levelName.length ?
                (
                    <Fragment>
                    <p className='successMsg'>  <GiTrophyCup size='50px' /> Bravo passer au niveau suivant!</p>
                    <button className='btnResult success'
                            onClick={()=>loadLevelQuestions(quizLevel)} 
                    >Niveau suivant</button>
                    </Fragment>

                )
                :
                (
                    <Fragment>
                    <p className='successMsg'> Bravo, rien a dire vous etes un vrais fans!!</p>
                    <button className='btnResult success'
                            onClick={()=>loadLevelQuestions(0)} 
                    >Acceuil</button>
                    </Fragment>

                )

            }
            </div>
            <div className='percentage'>
        <div className='progressPercent'> Reussite : {percent}%</div>
        <div className='progressPercent'> Note : {score}/{maxQuestions} </div>
            </div>
        </Fragment>

    )
    :
    (
        <Fragment>
                <div className='stepsBtnContainer'> 
                    <p className='failureMsg'> Vous avez echoué !</p>
                </div>
            <div className='percentage'>
                <div className='progressPercent'> Reussite : {percent}%</div>
                <div className='progressPercent'> Note : {score}/{maxQuestions} </div>
            </div>

            
        </Fragment>

    )

    const questionAnswerd = score >=  averageGrade ? (asked.map((options)=>{
        return(
            <tr key={options.id}>
                <td> {options.question }</td>
                <td> {options.answer }</td>
                <td>
                    <button className='btnInfo'
                     onClick={()=> showModal(options.heroId)}>
                     Infos </button>
                </td>
            </tr>
        )
    })) : 
    (
        <tr>
            <td colSpan='3'>
              <Loader />
            </td>
        </tr>

    )
   
        const result = !loader ? (
            <>
                <div className='modalHeader'>
                    <h2>{infoCharacter.data.results[0].name}</h2>
                </div>
                <div className='modalBody'>
                    <div className='comicImage'>
                        <img src={infoCharacter.data.results[0].thumbnail.path+'.'+infoCharacter.data.results[0].thumbnail.extension} 
                        alt={infoCharacter.data.results[0].name} />
                        {infoCharacter.attributionText}
                    </div>
                    <div className='comicDetails'>
                        <h3>description</h3>
                        {
                        infoCharacter.data.results[0].description ?  (<p>{infoCharacter.data.results[0].description} </p>): (<p>Description indisponible...</p>)
                        }
                        <h3>Plus d'infos</h3>
                        {
                           infoCharacter.data.results[0].urls && 
                           infoCharacter.data.results[0].urls.map( (url, index) => {
                               return <a 
                                   key={index}
                                   href={url.url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                               >
                                 {capitalizeFirestletter(url.type)}
                               </a>
                           })
                        }
                    </div>
                </div>
                <div className='modalFooter'>
                    <button className='modalBtn'  onClick={hideModal} >fermer</button>
                </div>
            </>
        ) :
        (
            <>
            <div className='modalHeader'>
                    <h2>Reponse de marvel...</h2>
                </div>
                <div className='modalBody'>
                    <Loader />
                </div>
            </>
        )

    return (

        <Fragment>
           
           {decision}

            <hr />
            <p>les reponses aux questions posées : </p>

            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>

                    </thead>
                    <tbody>
                        {questionAnswerd}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal} >
                    {result}
            </Modal>
        </Fragment>
    )
})


 
export default React.memo(QuizOver) 
