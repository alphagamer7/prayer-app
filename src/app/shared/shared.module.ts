import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedConstants } from './shared.constants';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [SharedConstants]
})
export class SharedModule {}
