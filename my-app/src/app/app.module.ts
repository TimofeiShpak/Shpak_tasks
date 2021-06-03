import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { IndicatorListComponent } from './indicator-list/indicator-list.component';
import { ButtonComponent } from './button/button.component';
import { ButtonListComponent } from './button-list/button-list.component';
import { MobxAngularModule } from 'mobx-angular';
import { ActionsComponent } from './actions/actions.component';
import { ModalComponent } from './modal/modal.component';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    IndicatorComponent,
    IndicatorListComponent,
    ButtonComponent,
    ButtonListComponent,
    ActionsComponent,
    ModalComponent,
    GameComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
