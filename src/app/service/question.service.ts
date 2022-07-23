import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

getQuestionJson(){
    //return this.http.get<any>("assets/questions.json");
    // fetch('https://opentdb.com/api.php?amount=10&category=18')  
    // .then(function(resp) { return resp.json() }) // Convert data to json
    // .then((data) => {
    //   console.log(data.results);
      
    // })
    let QuizT =localStorage.getItem('Quiztype')!;
    return this.http.get<any>(QuizT)
      // 'https://opentdb.com/api.php?amount=10&category=18')
}
}
