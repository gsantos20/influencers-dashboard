import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Results } from 'src/app/models/results';
import { LoginService } from 'src/app/services/login/login.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalRef?: BsModalRef;
  form: any;
  form2: any;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private functionsService: FunctionsService,
    private toastr: ToastrService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.validation();
  }


  validation() {
    localStorage.clear();

    this.form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      Submited: [false]
    });

    /*this.form2 = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      Submited: [false]
    });
    */
  }


  login() {
    if (this.form.invalid){
      this.form.controls.Submited.setValue(true);
      this.toastr.error('Existe um ou mais campos pendentes ou com preenchimento incorreto.');;
      return
    }else{
      this.form.controls.Submited.setValue(false);

      const args = {
        ...this.form.getRawValue()
      }

      this.loginService.Login(args).subscribe({
        next: (_dados: Results<any>) => {
          if (_dados.success) {
            this.functionsService.setCookie('login', _dados.data, 43200, '/');
            localStorage.setItem('login', btoa(JSON.stringify(_dados.data)));
          }
        },
        error: (error: any) => {
          this.toastr.error(error);
        },
        complete: () => {
        },
      }
    )}

  }

  async openModal(
    evento: any,
    template: TemplateRef<any>,
  ) {
    evento.stopPropagation();

    const modalConfig: ModalOptions = { class: 'modal-lg', backdrop: 'static' }

    this.modalRef = await this.bsModalService.show(template, modalConfig)
  }


}
