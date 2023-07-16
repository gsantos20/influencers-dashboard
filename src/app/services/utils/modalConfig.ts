import { eModalType } from './eModalType';

export interface ModalConfig {
  id?: string,
  message?: string,
  content?: any,
  closable?: boolean,
  cssClass?: string,
  buttons?: ButtonModalConfig[],
}
export interface ButtonModalConfig {
  text?: string,
  type?: eModalType,
  handler?: any,
  iconClass?: string,
}
