import { SNACKBAR_DELAY } from '../constants/constants.ts';

const snackbar = document.querySelector('.snackbar')!;
const snackbarMsg = snackbar.querySelector('.snackbar-msg')!;

export const displaySnackbar = (status: string, message: string) => {
  snackbar.classList.add(status);
  snackbarMsg.innerHTML = message;
  setTimeout(() => {
    snackbarMsg.innerHTML = '';
    snackbar.classList.remove(status);
  }, SNACKBAR_DELAY);
};
