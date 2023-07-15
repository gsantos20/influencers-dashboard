import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forEach } from 'lodash';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { INgxSelectOption } from 'ngx-select-ex';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Influencer } from 'src/app/models/Influencer';
import { Platform } from 'src/app/models/Platform';
import { Results } from 'src/app/models/results';
import { InfluencerService } from 'src/app/services/influencer/influencer.service';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { removeAccents } from 'src/app/services/utils/remove-accents.validator';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'app-influencers-list',
  templateUrl: './influencers-list.component.html',
  styleUrls: ['./influencers-list.component.scss']
})
export class InfluencersListComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private platformService: PlatformService,
    private influencerService: InfluencerService,
    private router: Router,
  ) { }

  pesquisaViewModel: any = {
    FirstName: '',
    LastName: '',
    Submited: false,
    SubmitedErr: false,
  };

  platformList!: Platform[];

  influencerList?: any[];
  modalRef?: BsModalRef;

  ngOnInit() {
    this.getPlataform();
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

  getInfluencers() {
    //if()
        this.pesquisaViewModel.Submited = true;

        const arg = {
          NameInfluencer: this.pesquisaViewModel.NameInfluencer,
          EmailInfluencer: this.pesquisaViewModel.EmailInfluencer,
          ChannelUsername: this.pesquisaViewModel.ChannelUsername,
          PlatformId: this.pesquisaViewModel.PlatformId !== '-1' ? this.pesquisaViewModel.PlatformId : null,
          ContentCategory: this.pesquisaViewModel.ContentCategory
        };

        this.influencerService.GetInfluencer(arg).subscribe({
          next: (_dados: Results<Influencer[]>) => {
            //console.log(_dados);
            if (_dados.success) {
              this.influencerList = _dados.data;

              if (this.influencerList) {
                this.influencerList.forEach((influencer) => {
                  this.platformList.some((platform) => {
                    if(platform.PlatformId === influencer.PlatformId){
                      influencer.PlatformDs = platform.PlatformDs
                    }
                  })
                })

              }

            } else {
              this.toastr.error(_dados.data);
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
 /*     } else {
        this.pesquisaViewModel.SubmitedErr = true;
        this.toastr.error('Selecione ao menos um filtro');
      }
*/
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
