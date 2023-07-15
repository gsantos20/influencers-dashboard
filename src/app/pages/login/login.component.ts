import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { Results } from 'src/app/models/results';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { ValidationsService } from 'src/app/shared/validations/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalRef?: BsModalRef;
  form!: FormGroup;
  form2!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  get f2(): any {
    return this.form2.controls;
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
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
      Email: ['', Validators.compose([
          Validators.required,
          ValidationsService.ValidaEmail
        ])
      ],
      Password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      )],
      Submited: [false]
    });

  }

  matchPass(Password: AbstractControl, PasswordConfirm: AbstractControl) {
    if(Password.value){
      let pass = Password.value
      let confirmPass = PasswordConfirm.value

      if (confirmPass !== pass){
        PasswordConfirm.setErrors({ matchPass: false })
      }else{
        PasswordConfirm.setErrors(null);
      }
    }
    return null;

  }

  Sign() {
    if (this.form.invalid){
      this.form.controls['Submited'].setValue(true);
      this.toastr.error('Existe um ou mais campos pendentes ou com preenchimento incorreto.');;
      return
    }else{
      this.form.controls['Submited'].setValue(false);

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


    SignUp() {
      if (this.form2.invalid){
        this.form2.controls['Submited'].setValue(true);
        this.toastr.error('Existe um ou mais campos pendentes ou com preenchimento incorreto.');;
        return
      }else{
        this.modalRef?.hide()

        this.form2.controls['Submited'].setValue(false);

        const args = {
          ...this.form2.getRawValue()
        }

        this.userService.CreateUser(args).subscribe({
          next: (_dados: Results<User>) => {
            if (_dados.success) {
              this.toastr.success('Usuario Cadastrado!').onHidden.subscribe((...args) => {
                console.log(args);
              });
            }else{
              this.toastr.error(_dados.data);
            }
          },
          error: (error: any) => {
            this.toastr.error(error);
          },
          complete: () => {
          },
        })
      }
    }



  async openModal(
    evento: any,
    template: TemplateRef<any>,
  ) {
    evento.stopPropagation();

    this.form2 = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, ValidationsService.ValidaEmail])],
      Password: ['', Validators.required],
      PasswordConfirm: ['', Validators.required],
      Submited: [false]
    });

    const modalConfig: ModalOptions = { class: 'modal-lg', backdrop: 'static' }

    this.modalRef = await this.bsModalService.show(template, modalConfig)
  }


}
