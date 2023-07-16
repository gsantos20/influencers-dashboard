import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { eModalType } from 'src/app/services/utils/eModalType';
import { ButtonModalConfig } from 'src/app/services/utils/modalConfig';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  @Input() initialTemplate!: TemplateRef<any>;
  @Input() message: string | undefined = "";
  @Input() buttons: ButtonModalConfig[] | undefined = [];
  @Input() title?: string = "";
  @Input() id: string | undefined = "";

  constructor(
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    public ngxMaskPipe: NgxMaskPipe,
  ) { }

  buttonType(button: any) {
    switch (button.type) {
      case eModalType.Success:
        return 'btn-success';

      case eModalType.Error:
      case eModalType.Danger:
        return 'btn-danger';

      case eModalType.Warning:
        return 'btn-warning';

      case eModalType.Info:
        return 'btn-info';

      case eModalType.Primary:
        return 'btn-primary';

      case eModalType.Secondary:
        return 'btn-secondary';

      default:
        return 'btn-default';
    }
  }


  async handler(button: any | undefined) {

    switch (button.handler) {
      case undefined:
        await this.fechar();
        break;
      default:
        button.handler();
        break;
    }
  }

  async fechar(func: any = null) {
    await this.bsModalService.hide(this.id);
  }
}
