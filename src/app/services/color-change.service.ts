import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ColorChangeService {
  private colorChange :BehaviorSubject<string> =  new BehaviorSubject("blue")
  constructor() { }

  handleColorChange(color:string){
    return this.colorChange.next(color)
  }

  getSelectedColor() :Observable<string>{
    return this.colorChange.asObservable()
  }
}
