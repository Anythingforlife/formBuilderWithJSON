import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-element',
  templateUrl: './form-control-element.component.html',
  styleUrls: ['./form-control-element.component.scss']
})
export class FormControlElementComponent {
  @Input() element;
  @Input() form;
}
