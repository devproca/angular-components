import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PopperComponent} from './popper/popper.component';
import {SelectComponent} from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SvgAngleDownComponent} from './svg/svg-angle-down.component';
import {SvgCheckComponent} from './svg/svg-check.component';
import {SvgElipsisVerticalComponent} from './svg/svg-elipsis-vertical.component';
import {OverflowMenuComponent} from './overflow-menu/overflow-menu.component';
import {DemoSelectComponent} from './demo-select/demo-select.component';
import {DemoOverflowMenuComponent} from './demo-overflow-menu/demo-overflow-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PopperComponent,
    SelectComponent,
    SvgAngleDownComponent,
    SvgCheckComponent,
    SvgElipsisVerticalComponent,
    OverflowMenuComponent,
    DemoSelectComponent,
    DemoOverflowMenuComponent
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
