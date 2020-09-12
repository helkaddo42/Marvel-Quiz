import React,{Component} from 'react'
import Levels from '../Levels/index'
import ProgressBar from '../ProgressBar/index'
import QuizOver from '../QuizOver/index'
import {QuizMarvel} from '../QuizMarvel/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import { FaChevronRight } from 'react-icons/fa';

toast.configure();


class Quiz extends Component {

    constructor(props) {
        super(props)
    
        this.initialState = {
            levelName:['debutant','confirme','expert'],
            QuizLevel: 0,
            maxQuestion: 10,
            storedQuestion:[],
            questions: '',
            options: [],
            idQuestion: 0,
            btnValue: true,
            userAnswer:null,
            scrore: 0,
            showWelcomeMsg: false,
            quizend: false 
             
        }
        this.state = this.initialState;
        this.storedataRef = React.createRef()

    }
    
    loadQuestions= level =>{
        const fetchArrayQuiz = QuizMarvel[0].quizz[level]
        const lengthArray = fetchArrayQuiz.length

        if(lengthArray >= this.state.maxQuestion){

            this.storedataRef.current = fetchArrayQuiz

           const newArray = fetchArrayQuiz.map( ({answer, ...keepRest}) =>keepRest)
            this.setState({storedQuestion : newArray})
      
        }
    }   
                //handler//
    ValueSelected =(ValueSelected)=>{
        this.setState({
            userAnswer : ValueSelected,
            btnValue: false

        })
    } 
                //handler//
    nextQuestion=()=>{
        
        if(this.state.idQuestion === this.state.maxQuestion - 1){ 
            // this.gameOver()
            this.setState({
                quizend :true
            })
        }else{
            this.setState(prevState =>({
                idQuestion : prevState.idQuestion + 1 
            }))
        }
        const goodAnswer = this.storedataRef.current[this.state.idQuestion].answer

        if(goodAnswer === this.state.userAnswer){
            this.setState(prevState =>({
                scrore : prevState.scrore + 1 
            }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                bodyClassName: "toastify-color" });

        }else{
            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                bodyClassName: "toastify-color"
            });
        }
    }
                //handler//
    loadLevelQuestions =(levelquiz)=>{
      this.setState({...this.initialState, QuizLevel : levelquiz})
      this.loadQuestions(this.state.levelName[levelquiz])


    }

                //handler//
    welcomMsg=(pseudo)=>{

        if(!this.state.showWelcomeMsg){

            this.setState({ showWelcomeMsg: true })
            toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: "toastify-color-welcome"
            });
        }
    }

    goodAnswerPercent = (maxQuest,ourScore)=>(ourScore / maxQuest) * 100
                //handler//
    gameOver=(percent)=>{


      if(percent >= 50){
        this.setState({
            QuizLevel : this.state.QuizLevel + 1,
            percent : percent,
        })
      }else{
        this.setState({
            percent : percent,
        })
      }
    
    }

                        // cycle de vie
    componentDidMount(){
        this.loadQuestions(this.state.levelName[this.state.QuizLevel])
    }

    componentDidUpdate(prevProps , prevState){
        if((this.state.storedQuestion !== prevState.storedQuestion) && this.state.storedQuestion.length ){
            this.setState({
                questions : this.state.storedQuestion[this.state.idQuestion].question,
                options : this.state.storedQuestion[this.state.idQuestion].options,
            })
        }

        if((this.state.idQuestion !== prevState.idQuestion )&& this.state.storedQuestion.length){
            this.setState({
                questions : this.state.storedQuestion[this.state.idQuestion].question,
                options : this.state.storedQuestion[this.state.idQuestion].options,
                userAnswer:null,
                btnValue: true

            })
        }
        if(this.state.quizend !== prevState.quizend){
            const result =  this.goodAnswerPercent(this.state.maxQuestion, this.state.scrore)
            this.gameOver(result)
        }

        if(this.props.dataUser.pseudo !== prevProps.dataUser.pseudo){this.welcomMsg(this.props.dataUser.pseudo)}

    }

    
render(){
                const {options, questions, btnValue} = this.state

                const displayOption = options.map( (option,index) =>{
                return <p key={index} onClick={()=> this.ValueSelected(option)} className={`answerOptions ${this.state.userAnswer === option ? 'selected': null}`}> <FaChevronRight />  {option}</p> })

                const btnText = this.state.idQuestion < this.state.maxQuestion -1 ? "suivant" : "terminer"

            return this.state.quizend  ? ( <QuizOver 
                    ref={this.storedataRef}
                    percent={this.state.percent}
                    levelName={this.state.levelName}
                    score={this.state.scrore} 
                    maxQuestions={this.state.maxQuestion}
                    quizLevel={this.state.QuizLevel}
                    loadLevelQuestions={this.loadLevelQuestions}/> )
                     : (
                <>
                    <Levels  levelNames={this.state.levelName} quizLevel={this.state.QuizLevel}  />
                    <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestion} />
                    <h2>{questions}</h2>
                    {displayOption}
                    <button disabled={btnValue} onClick={this.nextQuestion} className='btnSubmit'>{btnText}</button>
                    
                </> 
            )    
      
        }
 }
export default Quiz
  