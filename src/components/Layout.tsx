import React, { type ReactNode } from 'react';
import Header from './Header';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <footer>© 2025 HYC Blog. {t.all_rights_reserved}</footer>
    </div>
  );
};

export default Layout; 