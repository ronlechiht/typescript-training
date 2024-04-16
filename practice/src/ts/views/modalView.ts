import { FormView } from './formView';

export class ModalView {
  customerID: string | null;
  openModalBtn: HTMLElement;
  addUpdateModal: HTMLElement;
  removeModal: HTMLElement;
  modalTitle: HTMLElement;
  closeModalBtn: HTMLElement;
  addUpdateForm: HTMLElement;
  formView: FormView;

  constructor() {
    this.customerID = null;
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
    this.addUpdateModal.classList.add('element-visible');
    this.modalTitle.innerHTML = 'Add Customer';
  };

  displayEditModal = (id: string) => {
    this.addUpdateModal.classList.add('element-visible');
    this.modalTitle.innerHTML = 'Update Customer';
    for (const inputField of this.formView.inputFields) {
      const key = inputField.name;
      inputField.value = document
        .getElementById(id)!
        .querySelector('.' + key + '-cell')!.innerHTML;
    }
    this.formView.inputStatus.checked = true;
  };

  displayRemoveModal = () => {
    this.removeModal.classList.add('element-visible');
  };

  hideModal = () => {
    this.addUpdateModal.classList.remove('element-visible');
    this.formView.hideFormErrors();
    this.formView.resetInput();
  };

  bindOpenModal = () => {
    this.openModalBtn.addEventListener('click', () => {
      this.customerID = null;
      this.displayAddModal();
    });
  };

  bindCloseModal = () => {
    this.closeModalBtn.addEventListener('click', () => this.hideModal());
    this.formView.cancelBtn.addEventListener('click', () => this.hideModal());
  };
}
