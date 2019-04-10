import { Component, Input } from '@angular/core';

@Component({
  selector: 'loyalty-cockpit-widget',
  templateUrl: './loyalty-cockpit-widget.component.html',
  styleUrls: ['./loyalty-cockpit-widget.component.scss']
})

export class LoyaltyCockpitWidgetComponent {
  @Input() widgetItem: string;
}
