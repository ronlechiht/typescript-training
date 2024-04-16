import { ModalView } from './modalView';

export class DropdownMenuView {
  modalView: ModalView;

  constructor() {
    this.modalView = new ModalView();
    this.bindClickDropdownBtn();
  }
  bindClickDropdownBtn = () => {
    const customersTable = document.querySelector('.customers-table-body')!;
    customersTable.addEventListener('click', (event) => {
      if (
        (event.target as Element).className === 'dot' ||
        (event.target as Element).className === 'btn-dropdown'
      ) {
        const clickedDropdownBtn = (event.target! as Element).closest(
          '.btn-dropdown',
        );
        const dropdownMenu = (clickedDropdownBtn as Element)
          .nextElementSibling!;
        const editOption = dropdownMenu.querySelector('.edit-customer')!;
        const removeOption = dropdownMenu.querySelector('.remove-customer')!;
        if (dropdownMenu.classList.contains('element-visible')) {
          dropdownMenu.classList.remove('element-visible');
        } else {
          dropdownMenu.classList.add('element-visible');
          this.bindDropdownMenuOptions(editOption, removeOption);
        }
      }
    });
  };

  bindDropdownMenuOptions = (editOption: Element, removeOption: Element) => {
    editOption.addEventListener('click', (event) => {
      ((event.target! as Element).parentNode! as Element).classList.remove(
        'element-visible',
      );
      this.modalView.displayEditModal('26');
    });

    removeOption.addEventListener('click', (event) => {
      ((event.target! as Element).parentNode! as Element).classList.remove(
        'element-visible',
      );
      this.modalView.displayRemoveModal();
    });
  };
}
