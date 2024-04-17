import { FormView } from './formView.ts';

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
      if (customer) {
        if (!FormView.customerID) {
          await addHandler(customer);
          this.hideModal();
        } else {
          await editHandler(customer, FormView.customerID);
          this.hideModal();
        }
      }
    });

    this.acceptRemoveBtn.addEventListener('click', async () => {
      await deleteHandler(FormView.customerID);
      this.hideRemoveModal();
    });
  };
}
