import { Component } from '@angular/core';
import store from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isActions() {
    return store.actionsText.length > 0;
  }
  get isShowModal() {
    return store.isShowModal;
  }
}
