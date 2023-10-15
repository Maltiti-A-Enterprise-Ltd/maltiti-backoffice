export const serverError = 'Server error...';

export const token = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('token')!);
  }
};

export const user = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user')!);
  }
};
