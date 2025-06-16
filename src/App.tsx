
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tech" element={<HomePage />} />
            <Route path="/life" element={<HomePage />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
