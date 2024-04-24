import { SNACKBAR_DELAY } from '../constants/constants';

//Get snackbar element
const snackbar = document.querySelector('.snackbar')!;
//Get snackbar message element
const snackbarMsg = snackbar.querySelector('.snackbar-msg')!;

/**
 * Display snackbar
 * @param status status of snackbar success/failed
 * @param message message displayed
 */
export const displaySnackbar = (status: string, message: string) => {
  snackbar.classList.add(status);
  snackbarMsg.innerHTML = message;
  setTimeout(() => {
    snackbarMsg.innerHTML = '';
    snackbar.classList.remove(status);
  }, SNACKBAR_DELAY);
};
