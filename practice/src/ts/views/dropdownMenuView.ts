export class DropdownMenuView {
  bindClickDropdownBtn = (
    displayEditModal: CallableFunction,
    displayRemoveModal: CallableFunction,
  ) => {
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

          //Bind event display edit modal
          editOption.addEventListener('click', (event) => {
            (
              (event.target! as Element).parentNode! as Element
            ).classList.remove('element-visible');
            displayEditModal(id);
          });

          //Bind event display remove modal
          removeOption.addEventListener('click', (event) => {
            (
              (event.target! as Element).parentNode! as Element
            ).classList.remove('element-visible');
            displayRemoveModal(id);
          });
        }
      }
    });
  };
}
