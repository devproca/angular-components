import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PopperComponent} from './popper/popper.component';
import {SelectComponent} from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SvgAngleDownComponent} from './svg-angle-down/svg-angle-down.component';


@NgModule({
  declarations: [
    AppComponent,
    PopperComponent,
    SelectComponent,
    SvgAngleDownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
