import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotesProvider } from './context/NotesContext';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import PDFViewerPage from './pages/PDFViewerPage';
import CategoriesPage from './pages/CategoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <NotesProvider>
          <Routes>
            {/* Landing Page at root — no sidebar/topbar */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Notes App Shell at /app */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="viewer/:id" element={<PDFViewerPage />} />
            </Route>
          </Routes>
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
