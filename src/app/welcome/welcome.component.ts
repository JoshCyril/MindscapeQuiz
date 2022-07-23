import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  
  @ViewChild('named')
  QuiztypeTemp: string="";
  categories: any = ['Science: Computers', 'Science: Gadgets', 'Science & Nature', 'Any'];
  nameKey!: ElementRef;
  
  form = new FormGroup({
    website: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  });
   
  get f(){
    console.log(this.form.controls);
    return this.form.controls;
  }
   
  submit(){
    if(this.form.value.website === ""){
      this.form.value.website = "Science: Computers"
    }

    if(this.form.value.website == this.categories[0]){
      this.QuiztypeTemp = "https://opentdb.com/api.php?amount=10&category=18"
    }else if(this.form.value.website == this.categories[1]){
      this.QuiztypeTemp = "https://opentdb.com/api.php?amount=10&category=30"
    }else if(this.form.value.website == this.categories[2]){
      this.QuiztypeTemp = "https://opentdb.com/api.php?amount=10&category=17"
    }else if(this.form.value.website == this.categories[3]){
      this.QuiztypeTemp = "https://opentdb.com/api.php?amount=10"
    }
    
    // console.log(this.form);
    this.StartQuiz()
  }
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.nameKey.nativeElement.focus();
  }

  StartQuiz(){
    localStorage.setItem('Quiztype', this.QuiztypeTemp)
    if (this.form.value.username == ""){
      localStorage.setItem('named',"Anonymous User")
    }else{
      localStorage.setItem('named',this.form.value.username!)
    }

    console.log(localStorage.getItem('Quiztype'));
    console.log(localStorage.getItem('named'));

    this.router.navigate(['/question']);
  }

}
