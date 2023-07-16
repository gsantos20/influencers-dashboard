import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Influencer } from 'src/app/models/Influencer';
import { Platform } from 'src/app/models/Platform';
import { Results } from 'src/app/models/results';
import { InfluencerService } from 'src/app/services/influencer/influencer.service';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { UserService } from 'src/app/services/user/user.service';
import { removeAccents } from 'src/app/services/utils/remove-accents.validator';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'app-influencers-detail',
  templateUrl: './influencers-detail.component.html',
  styleUrls: ['./influencers-detail.component.scss']
})
export class InfluencersDetailComponent {

  form!: FormGroup;
  public influencer: any = {};
  modoTela = "post";
  public RotaCaminho : any;
  public condicaoTela : any;

  platformList!: Platform[];

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private platformService: PlatformService,
    private influencerService: InfluencerService,
  ) {
    this.RotaCaminho = this.route.pathFromRoot[1];
  }

  ngOnInit() {
    this.getPlataform()
    this.validation()


    this.condicaoTela = this.route.snapshot.paramMap.get('_id') as string;

    if ( !this.condicaoTela ){
      this.modoTela = "post";
    }
    else{
      this.carregarDados();
      this.modoTela = "put";
    }
  }

  public validation(): void{
    this.form = this.fb.group({
      NameInfluencer: ['', Validators.required],
      EmailInfluencer: ['', Validators.required],
      ChannelUsername: ['', Validators.required],
      PlatformId: ['', Validators.required],
      NumSubs: ['', Validators.required],
      ContentCategory: ['', Validators.required]
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.router.navigateByUrl('/influencers/list');
  }

  async getPlataform() {
    //this.spinner.show();

    const arg = {
      Active: 'S'
    };

    this.platformService.GetPlatform(arg).subscribe({
      next: (_dados: Results<Platform[]>) => {
        if (_dados.success) {
          this.platformList = _dados.data;
        }
      },
      error: (error: any) => {
        // this.spinner.hide();
        this.toastr.error(error);
      },
      complete: () => {
        // this.spinner.hide();
      },
    });
  }

  carregarDados(): void{
    const idParamID = this.route.snapshot.paramMap.get('_id') as string;

    if ( idParamID ){
      //this.spinner.show();

      this.influencerService.GetInfluencerById(idParamID)
        .subscribe({
          next: ( result: Results<Influencer[]>) => {
            if ( result.success ){
              this.influencer = result.data;
              this.form.patchValue(this.influencer);
            }
          },
          error: (error: any) => {
            this.toastr.error(error.error.data);
           // this.spinner.hide();
          },
          complete: () => {
           // this.spinner.hide();
          }
        });
    } else {
      /* console.log('Erro Parametros'); */
      this.toastr.error('Erro Parametros');
    }
  }

  public salvarAlteracao() {

    if (this.form.valid) {
      //this.spinner.show();

      const args = {
        ...this.form.value
      };

      const modoTela2 = (this.modoTela == "post") ? "CreateInfluencer" : "UpdateInfluencer";

      if(this.modoTela != "post"){
        args._id = this.influencer._id
      }

      this.influencerService[modoTela2](args).subscribe({
        next: (result: Results<Influencer>) => {
          if ( result.success ){
            this.toastr.success(this.modoTela != "post" ? 'Influenciador atualizado!' : 'Influenciador criado!');
            this.router.navigateByUrl('/influencers/list');
          }
          else{
            this.toastr.error(result.data);
          }
        },
        error: (error: any) => {
          this.toastr.error(error);
         // this.spinner.hide();
        },
        complete: () => {
         // this.spinner.hide();
        }
      });
    }
  }


  filtrarSelect(search: string, item: INgxSelectOption) {
    if (!FunctionsService.isEmptyOrSpaces(search)) {
      search = removeAccents(search.toLocaleLowerCase());

      return (
        removeAccents(item.text.toLocaleLowerCase()).indexOf(search) !== -1
      );
    }

    return true;
  }

}
