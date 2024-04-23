import { validateForm, validateField } from '../utils/validation';
import { LIST_ERROR_MSG } from '../constants/constants';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

export class FormView {
  static customerID: string | null;
  addUpdateForm: HTMLFormElement;
  submitBtn: HTMLElement;
  cancelBtn: HTMLElement;
  inputFields: NodeListOf<HTMLInputElement>;
  inputPhone: HTMLInputElement;
  inputStatus: HTMLInputElement;

  constructor() {
    FormView.customerID = null;
    this.addUpdateForm = document.querySelector('.form-submit')!;
    this.submitBtn = this.addUpdateForm.querySelector('.btn-submit')!;
    this.cancelBtn = this.addUpdateForm.querySelector('.btn-cancel')!;
    this.inputFields = this.addUpdateForm.querySelectorAll('.input-field')!;
    this.inputPhone = this.addUpdateForm.querySelector('input[name="phone"]')!;
    this.inputStatus = this.addUpdateForm.querySelector(
      'input[name="status"]',
    )!;

    this.bindFormatToPhone();
    this.bindValidateFields();
  }

  bindFormatToPhone = () => {
    this.inputPhone.addEventListener('keyup', () => {
      if (this.inputPhone.value.length === 10)
        this.inputPhone.value = formatPhoneNumber(this.inputPhone.value);
    });
  };

  bindValidateFields = () => {
    for (let i = 0; i < this.inputFields.length; i++) {
      if (this.inputFields[i].name === 'country') {
        this.inputFields[i].addEventListener('change', () => {
          const error = validateField(
            this.inputFields[i].name,
            this.inputFields[i].value,
          );
          if (error) this.displayFieldError(this.inputFields[i], error);
          else this.hideFieldError(this.inputFields[i]);
        });
      } else {
        this.inputFields[i].addEventListener('blur', () => {
          const error = validateField(
            this.inputFields[i].name,
            this.inputFields[i].value,
          );
          if (error) this.displayFieldError(this.inputFields[i], error);
          else this.hideFieldError(this.inputFields[i]);
        });
      }
    }
  };

  getFormData = () => {
    const formData = new FormData(this.addUpdateForm);
    const customer = [...formData.keys()].reduce<Record<string, string>>(
      (acc, key) => {
        acc[key] = String(formData.get(key));
        return acc;
      },
      {},
    );

    if (customer.status !== 'on') customer.status = '~off';

    const errors = validateForm(customer);

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors);
      return;
    }

    return customer;
  };

  displayFormErrors = (errors: Record<string, string>) => {
    for (const key in errors) {
      const inputField: HTMLInputElement = this.addUpdateForm.querySelector(
        '.' + key,
      )!;
      this.displayFieldError(inputField, errors[key]);
    }
  };

  displayFieldError = (inputField: HTMLInputElement, error: string) => {
    inputField.classList.add('field-error');
    const errorMessage = inputField.nextElementSibling!;
    errorMessage.innerHTML = LIST_ERROR_MSG[inputField.name][error];
  };

  resetInput = () => {
    this.inputFields.forEach((inputField) => {
      inputField.value = '';
    });

    this.inputStatus.checked = false;
  };

  hideFormErrors = () => {
    this.inputFields.forEach((inputField) => {
      this.hideFieldError(inputField);
    });
  };

  hideFieldError = (inputField: HTMLInputElement) => {
    inputField.classList.remove('field-error');
    inputField.nextElementSibling!.innerHTML = '';
  };

  bindSubmitForm = (
    addHandler: CallableFunction,
    editHandler: CallableFunction,
  ) => {
    this.submitBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      this.hideFormErrors();
      const customer = this.getFormData();
      if (customer) {
        if (!FormView.customerID) addHandler(customer);
        else editHandler(customer, FormView.customerID);
      }
    });
  };
}
