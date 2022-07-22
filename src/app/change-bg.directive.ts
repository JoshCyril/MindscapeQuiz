import { Directive,ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() ansS: string = "";
  @Input() ansC: string = "";
  //isCorrect: boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer(){
    if(this.ansC == this.ansS){
      this.render.setStyle(this.el.nativeElement, 'background', 'green')
      this.render.setStyle(this.el.nativeElement, 'color', 'white')
    }else{
      this.render.setStyle(this.el.nativeElement, 'background', 'red')
      this.render.setStyle(this.el.nativeElement, 'color', 'white')
    }
  }
}
