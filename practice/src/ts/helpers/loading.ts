//Get overlay element
const loading = document.querySelector('.overlay')!;

/**
 * Display loading screen
 */
export const displayLoading = () => {
  loading.classList.add('element-visible');
};

/**
 * Hide loading screen
 */
export const hideLoading = () => {
  loading.classList.remove('element-visible');
};
