import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const SVGS = {
  angleDown: require('!!raw-loader?!../../assets/svg/angle-down.svg'),
  angleRight: require('!!raw-loader?!../../assets/svg/angle-right.svg'),
  angleLeft: require('!!raw-loader?!../../assets/svg/angle-left.svg'),
  calendar: require('!!raw-loader?!../../assets/svg/calendar.svg'),
  check: require('!!raw-loader?!../../assets/svg/check.svg'),
  elipsisVertical: require('!!raw-loader?!../../assets/svg/elipsis-vertical.svg'),
  times: require('!!raw-loader?!../../assets/svg/times.svg'),
  info: require('!!raw-loader?!../../assets/svg/info.svg')
};

@Component({
  selector: 'tw-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SvgComponent implements OnInit {

  @Input() iconName: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  svg: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(SVGS[this.iconName].default);
  }
}
