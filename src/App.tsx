import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/main" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="/tech" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="/life" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
