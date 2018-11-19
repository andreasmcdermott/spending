export const getCurrentPage = () => localStorage.getItem('currentPage');
export const setCurrentPage = path => localStorage.setItem('currentPage', path);
