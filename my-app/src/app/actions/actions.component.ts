import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  get actions() {
    return store.actionsText;
  }
}
