import { Component, OnInit } from '@angular/core';
import { COLORS } from 'src/app/constants';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  colors :Array<string> = COLORS  
  constructor(private colorChangeService : ColorChangeService) { }

  ngOnInit(): void {
  }

  changeColor(color : string){
    this.colorChangeService.handleColorChange(color)
  }

  handleDragAndDrop(event:DragEvent ,index: number ){
    event.preventDefault()
    try{
      const newIndex = Number(event.dataTransfer?.getData("color-index"))
      const tmp = this.colors[index]
      this.colors[index] = this.colors[newIndex]
      this.colors[newIndex] = tmp
    }catch(e){
      console.error(e)
    }
  }

  onDragStart(event: DragEvent , index:number){
    event.dataTransfer?.setData("color-index" ,String(index))
  }

  onDragOver(event : Event){
    event.preventDefault()
  }
}
