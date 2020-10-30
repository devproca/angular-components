import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tw-demo-overflow-menu',
  templateUrl: './demo-overflow-menu.component.html',
  styleUrls: ['./demo-overflow-menu.component.scss']
})
export class DemoOverflowMenuComponent implements OnInit {

  options = [
    {
      label: 'View',
      click: () => {
        console.log('view clicked');
      }
    },
    {
      label: 'Edit',
      click: () => {
        console.log('edit clicked');
      }
    },
    {
      label: 'Delete',
      click: () => {
        console.log('delete clicked');
      }
    }
  ];

}
