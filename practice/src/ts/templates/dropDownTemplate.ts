function genBtn(): string {
  return `
    <div class="btn-dropdown">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;
}

function genMenu(): string {
  return `
    <ul class="dropdown-menu">
      <li class="edit-customer">Edit</li>
      <li class="remove-customer">Remove</li>
    </ul>
  `;
}

export function genDropDownMenuContainer(): string {
  return `
    <div class="dropdown-menu-container">
      ${genBtn()}
      ${genMenu()}
    </div>
  `;
}
