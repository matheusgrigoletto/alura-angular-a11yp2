import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from './shared/components/modal/services/modal.service';
import { ModalRef } from './shared/components/modal/models/modal-ref';
import { fade } from './shared/animations/fade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  @ViewChild('modal') modalTemplateRef: TemplateRef<any>;

  firstName = 'Matheus';
  modalRef: ModalRef;
  info = false;
  form: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['Matheus', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      info: [false],
    });
  }

  show() {
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details',
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.modalRef.close();
  }
}
