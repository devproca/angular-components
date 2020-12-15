import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DialogService} from "./dialog/dialog.service";
import {RandomComponentComponent} from "./random-component/random-component.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private dialogService: DialogService) {
  }

  openDialog(): void {
    this.dialogService.open(RandomComponentComponent, {
      data: {
        userId: 123
      }
    }).onClosed(result => {
      if (result === 'Yes') {
        //do nothing
      } else if (result === 'no') {
        // refresh my table;
      }
    });
  }


}
