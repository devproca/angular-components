import { ScrollToActiveDirective } from './select/scroll-to-active.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopperComponent } from './popper/popper.component';
import { SelectComponent } from './select/select.component';
import { OverflowMenuComponent } from './overflow-menu/overflow-menu.component';
import { DemoSelectComponent } from './demo-select/demo-select.component';
import { DemoOverflowMenuComponent } from './demo-overflow-menu/demo-overflow-menu.component';
import { DemoDatePickerComponent } from './demo-date-picker/demo-date-picker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DialogComponent } from './dialog/dialog.component';
import { RandomComponentComponent } from './random-component/random-component.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DemoDialogComponent } from './demo-dialog/demo-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgComponent } from './svg/svg.component';
import { SvgButtonComponent } from './svg-button/svg-button.component';
import { ChipComponent } from './chip/chip.component';
import { DemoChipComponent } from './demo-chip/demo-chip.component';
import { DemoMultiselectComponent } from './demo-multiselect/demo-multiselect.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioGroupComponent } from './radio-button/radio-group/radio-group.component';
import { DemoRadioButtonComponent } from './demo-radio-button/demo-radio-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox/checkbox-group/checkbox-group.component';
import { DemoCheckboxComponent } from './demo-checkbox/demo-checkbox.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SlideGroupComponent } from './slide-toggle/slide-group/slide-group.component';
import { DemoSlideToggleComponent } from './demo-slide-toggle/demo-slide-toggle.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DemoSpinnerComponent } from './demo-spinner/demo-spinner.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab/tab-group/tab-group.component';
import { DemoTabsComponent } from './demo-tabs/demo-tabs.component';
import { AlertComponent } from './alert/alert.component';
import { AlertsComponent } from './alert/alerts/alerts.component';
import { DemoAlertComponent } from './demo-alert/demo-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    PopperComponent,
    SelectComponent,
    SvgComponent,
    SvgButtonComponent,
    ChipComponent,
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
    DemoDialogComponent,
    DemoChipComponent,
    DemoMultiselectComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    DemoRadioButtonComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    DemoCheckboxComponent,
    SlideToggleComponent,
    SlideGroupComponent,
    DemoSlideToggleComponent,
    SpinnerComponent,
    DemoSpinnerComponent,
    TabComponent,
    TabGroupComponent,
    DemoTabsComponent,
    AlertComponent,
    AlertsComponent,
    DemoAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
