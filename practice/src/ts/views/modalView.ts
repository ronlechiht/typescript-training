import { FormView } from './formView.ts';
import { displaySnackbar } from '../helpers/snackbar.ts';
import { SNACKBAR_MSG, SNACKBAR_STATUS } from '../constants/constants.ts';
import { displayLoading, hideLoading } from '../helpers/loading.ts';

export class ModalView {
  openModalBtn: HTMLElement;
  addUpdateModal: HTMLElement;
  removeModal: HTMLElement;
  modalTitle: HTMLElement;
  closeModalBtn: HTMLElement;
  closeRemoveModalBtn: HTMLElement;
  acceptRemoveBtn: HTMLElement;
  denyRemoveBtn: HTMLElement;
  formView: FormView;

  constructor() {
    this.openModalBtn = document.querySelector('.add-customer-btn')!;
    this.addUpdateModal = document.querySelector('.modal-add-update')!;
    this.removeModal = document.querySelector('.modal-remove')!;
    this.modalTitle = this.addUpdateModal.querySelector('.modal-title')!;
    this.closeModalBtn = this.addUpdateModal.querySelector('.btn-close-modal')!;
    this.closeRemoveModalBtn = this.removeModal.querySelector(
      '.btn-close-remove-modal',
    )!;
    this.acceptRemoveBtn =
      this.removeModal.querySelector('.btn-accept-remove')!;
    this.denyRemoveBtn = this.removeModal.querySelector('.btn-deny-remove')!;

    this.formView = new FormView();

    this.bindOpenModal();
    this.bindCloseModal();
  }

  displayAddModal = () => {
    FormView.customerID = null;
    this.addUpdateModal.classList.add('element-visible');
    this.modalTitle.innerHTML = 'Add Customer';
  };

  displayEditModal = (id: string) => {
    FormView.customerID = id;
    this.addUpdateModal.classList.add('element-visible');
    this.modalTitle.innerHTML = 'Update Customer';
    //Get customer row
    const customerRow = document.getElementById(id)!;
    for (const inputField of this.formView.inputFields) {
      const key = inputField.name;
      inputField.value = customerRow.querySelector(
        '.' + key + '-cell',
      )!.innerHTML;
    }
    //Get customer status
    this.formView.inputStatus.checked =
      !!customerRow.querySelector('.status-active');
  };

  displayRemoveModal = (id: string) => {
    FormView.customerID = id;
    this.removeModal.classList.add('element-visible');
  };

  hideModal = () => {
    this.addUpdateModal.classList.remove('element-visible');
    this.formView.hideFormErrors();
    this.formView.resetInput();
  };

  hideRemoveModal = () => {
    this.removeModal.classList.remove('element-visible');
  };

  bindOpenModal = () => {
    this.openModalBtn.addEventListener('click', () => {
      this.displayAddModal();
    });
  };

  bindCloseModal = () => {
    this.closeModalBtn.addEventListener('click', () => this.hideModal());
    this.formView.cancelBtn.addEventListener('click', () => this.hideModal());

    this.closeRemoveModalBtn.addEventListener('click', () =>
      this.hideRemoveModal(),
    );
    this.denyRemoveBtn.addEventListener('click', () => this.hideRemoveModal());
  };

  bindSubmitModal = (
    addHandler: CallableFunction,
    editHandler: CallableFunction,
    deleteHandler: CallableFunction,
  ) => {
    this.formView.submitBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      this.formView.hideFormErrors();
      const customer = this.formView.getFormData();
      if (!customer) return;

      displayLoading();

      if (!FormView.customerID) {
        try {
          await addHandler(customer);
          this.hideModal();
          displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successAdd);
        } catch (error) {
          hideLoading();
          displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed);
        }
      } else {
        try {
          await editHandler(customer, FormView.customerID);
          this.hideModal();
          displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successEdit);
        } catch (error) {
          hideLoading();
          displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed);
        }
      }
    });

    this.acceptRemoveBtn.addEventListener('click', async () => {
      displayLoading();
      try {
        await deleteHandler(FormView.customerID);
        this.hideRemoveModal();
        displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successDelete);
      } catch (error) {
        hideLoading;
        displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed);
      }
    });
  };
}
