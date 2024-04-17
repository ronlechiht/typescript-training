import { ModalView } from './modalView.ts';
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
          //Get customer row element
          const id = (dropdownMenu.parentNode!.parentNode! as Element).id;
          this.bindDropdownMenuOptions(editOption, removeOption, id);
        }
      }
    });
  };

  bindDropdownMenuOptions = (
    editOption: Element,
    removeOption: Element,
    id: string,
  ) => {
    editOption.addEventListener('click', (event) => {
      ((event.target! as Element).parentNode! as Element).classList.remove(
        'element-visible',
      );
      this.modalView.displayEditModal(id);
    });

    removeOption.addEventListener('click', (event) => {
      ((event.target! as Element).parentNode! as Element).classList.remove(
        'element-visible',
      );
      this.modalView.displayRemoveModal(id);
    });
  };
}
