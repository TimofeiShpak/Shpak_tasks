import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss']
})
export class ButtonListComponent {
  get buttons() { 
    return Object.keys(store.buttons); 
  };
}
