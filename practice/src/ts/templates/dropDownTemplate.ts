export function genDropDownMenuContainer(): string {
  return `
    <div class="dropdown-menu-container">
      <div class="btn-dropdown">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <ul class="dropdown-menu">
        <li class="edit-customer">Edit</li>
        <li class="remove-customer">Remove</li>
      </ul>
    </div>
  `;
}
