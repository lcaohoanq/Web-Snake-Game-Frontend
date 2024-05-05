import {
  ControlNodeType,
  ValidationFunctionStringType,
  ValidationFunctionType
} from '../util/formValidate';

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

// RegisterClass will construct the data from form
/*
new FormData(
          confirmPasswordNode.value,
          [
            isRequired,
            min(8),
            max(30),
            isSame(passwordNode.value, 'password', 'confirmed-password')
          ],
          confirmPasswordNode.parentElement!,
          [confirmPasswordNode]
        )
*/
