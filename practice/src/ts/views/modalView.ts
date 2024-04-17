import { FormView } from './formView.ts';

export class ModalView {
  openModalBtn: HTMLElement;
  addUpdateModal: HTMLElement;
  removeModal: HTMLElement;
  modalTitle: HTMLElement;
  closeModalBtn: HTMLElement;
  addUpdateForm: HTMLElement;
  formView: FormView;

  constructor() {
    this.openModalBtn = document.querySelector('.add-customer-btn')!;
    this.addUpdateModal = document.querySelector('.modal-add-update')!;
    this.removeModal = document.querySelector('.modal-remove')!;
    this.modalTitle = this.addUpdateModal.querySelector('.modal-title')!;
    this.closeModalBtn = this.addUpdateModal.querySelector('.btn-close-modal')!;
    this.addUpdateForm = this.addUpdateModal.querySelector('.form-submit')!;
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

  bindOpenModal = () => {
    this.openModalBtn.addEventListener('click', () => {
      this.displayAddModal();
    });
  };

  bindCloseModal = () => {
    this.closeModalBtn.addEventListener('click', () => this.hideModal());
    this.formView.cancelBtn.addEventListener('click', () => this.hideModal());
  };
}
