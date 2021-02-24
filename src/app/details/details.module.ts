import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonicModule } from '@ionic/angular';
import { NumbersDirective } from '../numbers.directive';
import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
  ],
  providers: [
    Keyboard
  ],
  declarations: [DetailsPage, NumbersDirective]
})
export class DetailsPageModule {}
