import {ScrollToActiveDirective} from './select/scroll-to-active.directive';
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
import {DemoDatePickerComponent} from './demo-date-picker/demo-date-picker.component';
import {CalendarComponent} from './calendar/calendar.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {SvgAngleLeftComponent} from './svg/svg-angle-left.component';
import {SvgAngleRightComponent} from './svg/svg-angle-right.component';
import {SvgCalendarComponent} from './svg/svg-calendar.component';
import {DialogComponent} from './dialog/dialog.component';
import {RandomComponentComponent} from './random-component/random-component.component';
import {DialogHeaderComponent} from './dialog-header/dialog-header.component';
import {DialogBodyComponent} from './dialog-body/dialog-body.component';
import {DialogFooterComponent} from './dialog-footer/dialog-footer.component';
import {DemoDialogComponent} from './demo-dialog/demo-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SvgTimesComponent} from "./svg/svg-times.component";


@NgModule({
  declarations: [
    AppComponent,
    PopperComponent,
    SelectComponent,
    SvgAngleDownComponent,
    SvgAngleLeftComponent,
    SvgAngleRightComponent,
    SvgCheckComponent,
    SvgTimesComponent,
    SvgElipsisVerticalComponent,
    SvgCalendarComponent,
    OverflowMenuComponent,
    DemoSelectComponent,
    DemoOverflowMenuComponent,
    CalendarComponent,
    DatePickerComponent,
    DemoDatePickerComponent,
    ScrollToActiveDirective,
    DialogComponent,
    RandomComponentComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DemoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
