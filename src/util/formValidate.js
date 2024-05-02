//rules validate
//username         : isRequired
//password         : isRequired, min 8, max 30
//confirmedPassword: isRequired, min 8, max 30, isSame(password)

export const isRequired = (value) => {
  return value == '' ? ' (*) Field is required' : '';
};

export const createMessage = (msg) => (value) => (value == '' ? ` (*) ${msg}` : '');

export const min = (num) => (value) => (value.length >= num ? '' : `Min is ${num}`);
export const max = (num) => (value) => (value.length <= num ? '' : `Max is ${num}`);

export const isSame = (paramValue, fieldName1, fieldName2) => (value) =>
  paramValue == value ? '' : `${fieldName1} not match ${fieldName2}`;

//create error message, show error message on UI
export const createMsg = (parentNode, controlNode, msg) => {
  const invalidDiv = document.createElement('div');
  invalidDiv.className = 'invalid-feedback';
  invalidDiv.innerHTML = msg;
  parentNode.appendChild(invalidDiv);
  controlNode.forEach((inputNode) => {
    inputNode.classList.add('is-invalid');
  });
};

export const isValid = (paraObject) => {
  let { value, funcs, parentNode, controlNode } = paraObject;

  for (const funcCheck of funcs) {
    let msg = funcCheck(value);
    createMsg(parentNode, controlNode, msg);
    return msg;
  }
  return '';
};

//clear all error message
export const clearMsg = () => {
  document.querySelectorAll('.is-invalid').forEach((inputItem) => {
    inputItem.classList.remove('is-invalid');
  });

  document.querySelectorAll('.invalid-feedback').forEach((divMsg) => {
    divMsg.remove();
  });

  document.querySelectorAll('.invalid-feedback-tickBox').forEach((divMsg) => {
    divMsg.remove();
  });
};
