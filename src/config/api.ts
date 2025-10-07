export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getApiUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export const getUploadUrl = (filename: string) => {
  return `${API_BASE_URL}/uploads/${filename}`;
};
