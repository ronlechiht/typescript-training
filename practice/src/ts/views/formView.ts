import { validateForm } from '../utils/validation';
import { LIST_ERROR_MSG } from '../constants/constants';

export class FormView {
  addUpdateForm: HTMLFormElement;
  submitBtn: HTMLElement;
  cancelBtn: HTMLElement;
  inputFields: NodeListOf<Element>;

  constructor() {
    this.addUpdateForm = document.querySelector('.form-submit')!;
    this.submitBtn = this.addUpdateForm.querySelector('.btn-submit')!;
    this.cancelBtn = this.addUpdateForm.querySelector('.cancel-submit')!;
    this.inputFields = this.addUpdateForm.querySelectorAll('.input-field')!;
  }

  getFormData = () => {
    const formData = new FormData(this.addUpdateForm);
    const customer = [...formData.keys()].reduce((acc, key) => {
      acc[key] = formData.get(key);
      return acc;
    }, {});

    const errors = validateForm(customer);

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors);
      return;
    }

    return customer;
  };

  displayFormErrors = (errors) => {
    for (const key in errors) {
      const inputField = this.addUpdateForm.querySelector('.' + key);
      this.displayFieldError(inputField, errors[key]);
    }
  };

  displayFieldError = (inputField, error) => {
    inputField.classList.add('field-error');
    const errorMessage = inputField.nextElementSibling;
    errorMessage.innerHTML = LIST_ERROR_MSG[inputField.name][error];
  };

  bindSubmitForm = (addHandler) => {
    this.submitBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      const customer = this.getFormData();
      if (customer) {
        addHandler(customer);
      }
    });
  };
}
