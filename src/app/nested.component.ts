import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'nested',
  template: ` <nested
    class="nesting"
    [class.outer]="level == total - 1"
    [class.inner]="level == 0"
    *ngIf="level >= 0"
    [level]="level - 1"
    [total]="total"
  ></nested>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedComponent implements OnInit {
  @Input()
  set depth(d: number) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  constructor() {}

  ngOnInit() {}
}
