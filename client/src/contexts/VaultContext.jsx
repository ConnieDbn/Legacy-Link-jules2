import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import vaultService from '../services/vaultService';

export const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [will, setWill] = useState('');
  const [lastWords, setLastWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      // Clear data when user logs out
      setPhotos([]);
      setDocuments([]);
      setWill('');
      setLastWords([]);
      setLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadPhotos(),
        loadDocuments(),
        loadWill(),
        loadLastWords()
      ]);
    } catch (err) {
      setError('Failed to load vault data');
      console.error('Error loading vault data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async () => {
    try {
      const data = await vaultService.getPhotos();
      setPhotos(data);
    } catch (err) {
      console.error('Error loading photos:', err);
    }
  };

  const loadDocuments = async () => {
    try {
      const data = await vaultService.getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error('Error loading documents:', err);
    }
  };

  const loadWill = async () => {
    try {
      const data = await vaultService.getWill();
      setWill(data.content || '');
    } catch (err) {
      console.error('Error loading will:', err);
    }
  };

  const loadLastWords = async () => {
    try {
      const data = await vaultService.getLastWords();
      setLastWords(data);
    } catch (err) {
      console.error('Error loading last words:', err);
    }
  };

  // Photo operations
  const uploadPhotos = async (files) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
      }
      const newPhotos = await vaultService.uploadPhotos(formData);
      setPhotos(prev => [...prev, ...newPhotos]);
      return newPhotos;
    } catch (err) {
      setError('Failed to upload photos');
      console.error('Error uploading photos:', err);
      throw err;
    }
  };

  const deletePhoto = async (id) => {
    try {
      await vaultService.deletePhoto(id);
      setPhotos(prev => prev.filter(photo => photo._id !== id));
    } catch (err) {
      setError('Failed to delete photo');
      console.error('Error deleting photo:', err);
      throw err;
    }
  };

  // Document operations
  const uploadDocuments = async (files) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('documents', files[i]);
      }
      const newDocuments = await vaultService.uploadDocuments(formData);
      setDocuments(prev => [...prev, ...newDocuments]);
      return newDocuments;
    } catch (err) {
      setError('Failed to upload documents');
      console.error('Error uploading documents:', err);
      throw err;
    }
  };

  const deleteDocument = async (id) => {
    try {
      await vaultService.deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc._id !== id));
    } catch (err) {
      setError('Failed to delete document');
      console.error('Error deleting document:', err);
      throw err;
    }
  };

  // Will operations
  const saveWill = async (content) => {
    try {
      const updatedWill = await vaultService.saveWill(content);
      setWill(updatedWill.content);
      return updatedWill;
    } catch (err) {
      setError('Failed to save will');
      console.error('Error saving will:', err);
      throw err;
    }
  };

  // Last words operations
  const saveLastWords = async (text, isForPostDeath) => {
    try {
      const newMessage = await vaultService.saveLastWords(text, isForPostDeath);
      setLastWords(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError('Failed to save message');
      console.error('Error saving last words:', err);
      throw err;
    }
  };

  const deleteLastWords = async (id) => {
    try {
      await vaultService.deleteLastWords(id);
      setLastWords(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      setError('Failed to delete message');
      console.error('Error deleting last words:', err);
      throw err;
    }
  };

  // Post-death access
  const checkPostDeathAccess = async (accessCode) => {
    try {
      const postDeathMessages = await vaultService.checkPostDeathAccess(accessCode);
      return postDeathMessages;
    } catch (err) {
      console.error('Error checking post-death access:', err);
      throw err;
    }
  };

  return (
    <VaultContext.Provider value={{
      photos,
      documents,
      will,
      lastWords,
      loading,
      error,
      uploadPhotos,
      deletePhoto,
      uploadDocuments,
      deleteDocument,
      saveWill,
      saveLastWords,
      deleteLastWords,
      checkPostDeathAccess,
      loadAllData
    }}>
      {children}
    </VaultContext.Provider>
  );
};
