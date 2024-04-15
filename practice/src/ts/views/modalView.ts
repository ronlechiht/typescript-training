export class ModalView {
  customerID: string | null;
  openModalBtn: HTMLElement;
  addUpdateModal: HTMLElement;
  modalTitle: HTMLElement;
  closeModalBtn: HTMLElement;
  addUpdateForm: HTMLElement;
  cancelBtn: HTMLElement;

  constructor() {
    this.openModalBtn = document.querySelector('.add-customer-btn')!;
    this.addUpdateModal = document.querySelector('.modal-add-update')!;
    this.modalTitle = this.addUpdateModal.querySelector('.modal-title')!;
    this.closeModalBtn = this.addUpdateModal.querySelector('.btn-close-modal')!;
    this.addUpdateForm = this.addUpdateModal.querySelector('.form-submit')!;
    this.cancelBtn = this.addUpdateForm.querySelector('.btn-cancel')!;

    this.bindOpenModal();
    this.bindCloseModal();
  }

  displayAddModal = () => {
    this.addUpdateModal.classList.add('element-visible');
    this.modalTitle.innerHTML = 'Add Customer';
  };

  hideModal = () => {
    this.addUpdateModal.classList.remove('element-visible');
  };

  bindOpenModal = () => {
    this.openModalBtn.addEventListener('click', () => {
      this.customerID = null;
      this.displayAddModal();
    });
  };

  bindCloseModal = () => {
    this.closeModalBtn.addEventListener('click', () => this.hideModal());
    this.cancelBtn.addEventListener('click', () => this.hideModal());
  };
}
