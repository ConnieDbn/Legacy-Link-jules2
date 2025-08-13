import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';
import PhotosSection from './components/sections/PhotosSection';
import DocumentsSection from './components/sections/DocumentsSection';
import WillSection from './components/sections/WillSection';
import LastWordsSection from './components/sections/LastWordsSection';
import PostDeathSection from './components/sections/PostDeathSection';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { VaultProvider } from './contexts/VaultContext';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FontSizeProvider>
          <VaultProvider>
            <div className="app">
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <MainContainer />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/photos" replace />} />
                  <Route path="photos" element={<PhotosSection />} />
                  <Route path="documents" element={<DocumentsSection />} />
                  <Route path="will" element={<WillSection />} />
                  <Route path="last-words" element={<LastWordsSection />} />
                  <Route path="post-death" element={<PostDeathSection />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
          </VaultProvider>
        </FontSizeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
