import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FakeBackendService } from 'src/shared/fake-backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  $subscription: Subscription;
  formData = [];
  selectedElement: string = 'label';
  textBoxType: string;
  elementLabel: string;
  elementKey: string;
  elementValue: string;
  elementOrder: number;
  radioElementView = [
    {
      "label": "Static Text",
      "value": "label"
    },
    {
      "label": "Text (Input)",
      "value": "textbox"
    },
    {
      "label": "Radio",
      "value": "radio"
    },
    {
      "label": "DropDown",
      "value": "dropdown"
    }
  ]

  textBoxTypes = [
    {
      "label": "Text",
      "value": "text"
    },
    {
      "label": "Email",
      "value": "email"
    },
    {
      "label": "Number",
      "value": "number"
    }
  ]


  constructor(private formBuilder: FormBuilder, private fakeBackendService: FakeBackendService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.importJSONData();
  }

  importJSONData() {
    this.$subscription = this.fakeBackendService.importJSON().subscribe((response: any) => {
      this.formData = response;
      this.form = this.buildForm();
    }, error => {
    });
  }

  buildForm(): FormGroup {
    let group: any = {};
    this.formData.forEach(element => {
      group[element.key] = this.createElement(element);
    });
    return this.formBuilder.group(group);
  }

  createElement(element): FormControl {
    return element.required ? new FormControl(element.value || '', Validators.required)
      : new FormControl(element.value || '');
  }

  onSubmit() {

  }

  viewElement(type) {
    this.selectedElement = type;
    this.elementKey = null;
    this.elementOrder = null;
    this.elementValue = null;
    this.textBoxType = 'text';
  }

  getSelectedTextBoxType(type) {
    this.textBoxType = type
  }

  addComponent() {
    let element: any = {};
    switch (this.selectedElement) {
      case 'label':
        element.controlType = "label";
        break;
      case 'textbox':
        element.controlType = "textbox";
        element.label = this.elementLabel;
        element.type = this.textBoxType;
        break;
      case 'radio':
        element.controlType = "radio";
        break;
      case 'dropdown':
        element.controlType = "dropdown";
    }

    element.order = this.elementOrder;
    element.value = this.elementValue;
    element.key = this.elementKey;
    this.formData.splice(element.order - 1, 0, element);
    this.form.addControl(element.key, this.createElement(element));
  }

  /**
   * download from data in json file
   */
  downloadJSON() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.formData));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "formData.json");
    dlAnchorElem.click();
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
