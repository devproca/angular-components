import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PopperComponent} from './popper/popper.component';
import { SelectComponent } from './select/select.component';
import { SelectItemComponent } from './select-item/select-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PopperComponent,
    SelectComponent,
    SelectItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
