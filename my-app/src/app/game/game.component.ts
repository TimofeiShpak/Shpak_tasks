import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  get isActions() {
    return store.actionsText.length > 0;
  }
  get isShowModal() {
    return store.isShowModal;
  }
}
