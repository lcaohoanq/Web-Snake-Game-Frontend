import {
  ControlNodeType,
  IParaObject,
  ValidationFunctionStringType,
  ValidationFunctionType
} from '../controllers/formValidate';

export class FormData {
  value: string | boolean;
  funcs: ValidationFunctionType[] | ValidationFunctionStringType[];
  parentNode: HTMLElement;
  controlNode: ControlNodeType;

  constructor(
    value: string | boolean,
    funcs: ValidationFunctionType[] | ValidationFunctionStringType[],
    parentNode: HTMLElement,
    controlNode: ControlNodeType
  ) {
    this.value = value;
    this.funcs = funcs;
    this.parentNode = parentNode;
    this.controlNode = controlNode;
  }
}
