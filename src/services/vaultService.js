import api from './api';

// Photos
const getPhotos = async () => {
  const response = await api.get('/photos');
  return response.data;
};

const uploadPhotos = async (formData) => {
  const response = await api.post('/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deletePhoto = async (id) => {
  const response = await api.delete(`/photos/${id}`);
  return response.data;
};

// Documents
const getDocuments = async () => {
  const response = await api.get('/documents');
  return response.data;
};

const uploadDocuments = async (formData) => {
  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};

// Will
const getWill = async () => {
  const response = await api.get('/will');
  return response.data;
};

const saveWill = async (content) => {
  const response = await api.post('/will', { content });
  return response.data;
};

// Last Words
const getLastWords = async () => {
  const response = await api.get('/last-words');
  return response.data;
};

const saveLastWords = async (text, isForPostDeath) => {
  const response = await api.post('/last-words', { text, isForPostDeath });
  return response.data;
};

const deleteLastWords = async (id) => {
  const response = await api.delete(`/last-words/${id}`);
  return response.data;
};

// Post-Death Access
const checkPostDeathAccess = async (accessCode) => {
  const response = await api.post('/post-death-access', { accessCode });
  return response.data;
};

const vaultService = {
  getPhotos,
  uploadPhotos,
  deletePhoto,
  getDocuments,
  uploadDocuments,
  deleteDocument,
  getWill,
  saveWill,
  getLastWords,
  saveLastWords,
  deleteLastWords,
  checkPostDeathAccess,
};

export default vaultService;
