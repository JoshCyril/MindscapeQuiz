import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name: string="";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points:number =0;
  counter =60;
  correctAnswer:number=0;
  inCorrectAnswer:number=0;
  interval$:any;
  progess:string = "0";
  isQuizCompeleted:boolean = false;
  isQuizLoaded:boolean = false;
  numGen:number =0;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name =localStorage.getItem('named')!;
    this.getAllQuestions();
    this.startCounter();
  }
  randomNumber(min:number, max:number) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  } 

 async getAllQuestions(){
    (this.questionService.getQuestionJson())
    .subscribe(async (res: { results: any; }) =>{
      this.questionList = res.results
      console.log(this.questionList)
      this.questionList.forEach( (vals: any) => {
        //console.log(vals.incorrect_answers[0])
        this.numGen = this.randomNumber(0, vals.incorrect_answers.length)
        vals.incorrect_answers[vals.incorrect_answers.length] = vals.incorrect_answers[this.numGen];
        vals.incorrect_answers[this.numGen] = vals.correct_answer;
      })
    })
      setTimeout(()=>{
        this.isQuizLoaded = true;
      },1800);
    }

    

  nextQuestion(){
    this.currentQuestion ++
    // this.currentQuestion = this.currentQuestion >= this.questionList.length ? this.questionList.length: this.currentQuestion
  }

  previousQuestion(){
    this.currentQuestion --
    // this.currentQuestion = this.currentQuestion < 0 ? 0: this.currentQuestion
  }

  answer(currentQno:number, optionS:any, optionC:any){
    if(currentQno === this.questionList.length){
      this.isQuizCompeleted = true;
      this.stopCounter()
    }
    if(optionS === optionC){
      this.points += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion ++;
        this.resetCounter();
        this.getProgessPercent()
      },1000);
      
    }else{
      setTimeout(()=>{
        this.currentQuestion ++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgessPercent()
      },1000);
      // this.points -= 10;
    }
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter =60
        // this.points -=10
      }
    })
    setTimeout(()=>{
      this.interval$.unsubscribe()
    },600000);
  }
  stopCounter(){
    this.interval$.unsubscribe()
    this.counter =0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
    this.getProgessPercent();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points =0;
    this.counter=60;
    this.currentQuestion =0;
  }

  getProgessPercent(){
    this.progess = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progess;
  }

}
