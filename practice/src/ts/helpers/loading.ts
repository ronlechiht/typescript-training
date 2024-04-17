const loading = document.querySelector('.overlay')!;

export const displayLoading = () => {
  loading.classList.add('element-visible');
};

export const hideLoading = () => {
  loading.classList.remove('element-visible');
};
