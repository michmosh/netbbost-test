import { Component, ElementRef, OnDestroy, OnInit , ViewChild} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-aquarium',
  templateUrl: './aquarium.component.html',
  styleUrls: ['./aquarium.component.scss']
})
export class AquariumComponent implements OnInit , OnDestroy {
  @ViewChild("myCanvas", {static: true}) canvas! : ElementRef<HTMLCanvasElement>
  private context! : CanvasRenderingContext2D;
  public fishColor = "blue"; 
  private colorSubscription! : Subscription;
  constructor(private colorChangeService : ColorChangeService) { }

  ngOnInit(): void {
    this.context = <CanvasRenderingContext2D> this.canvas.nativeElement.getContext('2d')
    this.animate()
    this.handleColorCHange()
    
  }

  draw(x:number , y:number , z:number){
    this.context.clearRect(0 , 0, this.context.canvas.width , this.context.canvas.height )
    this.context.beginPath()
    this.context.arc(x , y , z, 0, 2 * Math.PI);
    this.context.fillStyle = this.fishColor;
    this.context.fill()
  }

  animate(){
    //START IN MIDDLE OF CANVAS
    let x = this.context.canvas.height / 2;
    let y = this.context.canvas.width / 2;
    // RANDOM SPEED FOR X AND Y
    let xVel = Math.round(Math.random() * 100) / 10
    let yVel = Math.round(Math.random() * 100) / 10
      setInterval(()=>{
        this.draw(x , y , 20)
        if(x +20 > this.context.canvas.width  ) xVel = -xVel
        if(y +20 > this.context.canvas.height ) yVel = -yVel
        if(y < 20) yVel = -yVel
        if(x < 20) xVel = -xVel
        x+=xVel
        y+=yVel
      }, 100)
       
  }

  handleColorCHange(){
    this.colorSubscription = this.colorChangeService.getSelectedColor().subscribe(color=>{
      this.fishColor = color
    })
  }

  ngOnDestroy(){
    this.colorSubscription.unsubscribe()
  }

}
