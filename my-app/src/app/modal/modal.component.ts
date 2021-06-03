import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closeModal() {
    store.closeModal();
  }
}
