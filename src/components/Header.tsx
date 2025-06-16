import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto; /* Logo / 导航 / 控件 */
  align-items: center;
  gap: 2rem; /* 调整列之间的间距 */
  padding: 1rem 2rem;
  background-color: var(--bg); /* 使用CSS变量 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    grid-template-columns: auto auto auto; /* Logo / 控件 / 汉堡菜单  */
    padding: 0rem 1rem;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text); /* 确保Logo颜色适应主题 */
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end; /* 在大屏幕上将导航链接推到右侧 */
  grid-column: 2 / 3; /* 在大屏幕上占据第二列 */

  @media (max-width: 768px) {
    flex-direction: column;
    grid-column: 3 / 4;
    position: absolute;
    top: 100%;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    background-color: var(--bg); /* 使用CSS变量 */
    padding: 1rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    width: 100%; /* 确保在移动视图下占据全宽 */
    text-align: center; /* 菜单项居中 */
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; /* 在移动视图下根据isOpen显示/隐藏 */
    left: 0;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledLink = styled(Link)` 
  color: var(--text);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  width: 75px; /* 设置固定宽度 */
  text-align: center; /* 文本居中 */

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    width: 100%; /* 确保在移动视图下占据全宽 */
    display: block;
  }
`;

const StyledLink2 = styled.a` 
  color: var(--text);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  width: 75px; /* 设置固定宽度 */
  text-align: center; /* 文本居中 */

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    width: 100%; /* 确保在移动视图下占据全宽 */
    display: block;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  grid-column: 3 / 4; /* 在大屏幕上将Controls放置在第三列 */
  
  @media (max-width: 768px) {
    display: none; /* 在小屏幕上隐藏 */
  }
`;

const BurgerMenu = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  justify-self: end; /* 将汉堡菜单推到右侧 */
  grid-column: 3 / 4; /* 在大屏幕上不显示，但在小屏幕上占据第二列（实际位置由media query控制） */
  
  @media (max-width: 768px) {
    display: block;
    grid-column:  3 / 4; /* 在小屏幕上放置在第二列 */
    &:focus {
      outline: none; /* 移除点击后的黑色边框 */
    }
  }
`;

const ToggleButton = styled.button`  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--text);
  padding: 0.3em 0.7em;
  border-radius: 6px;
  transition: background 0.2s;
  width: 50px; /* 设置固定宽度 */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--primary);
    color: #fff;
  }

  &:focus {
    outline: none; /* 移除点击后的黑色边框 */
  }
`;

const LanguageToggleButton = styled(ToggleButton)`
  width: 75px; /* 根据内容调整 */
`;

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Logo>HYC Blog</Logo>
      <BurgerMenu onClick={toggleMenu}>
        ☰ 
      </BurgerMenu>
      <Nav isOpen={isOpen} onMouseLeave={() => setIsOpen(false)}>
        <NavItems>
          <StyledLink to="/" onClick={() => setIsOpen(false)}>{t.home}</StyledLink>
          {/* <StyledLink to="/tech" onClick={() => setIsOpen(false)}>{t.tech_blog}</StyledLink>
          <StyledLink to="/life" onClick={() => setIsOpen(false)}>{t.life_blog}</StyledLink> */}
          <StyledLink2 href="https://weibo.com/u/6885353494" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>{t.tech_blog}</StyledLink2>
          <StyledLink2 href="https://blog.csdn.net/qq_45104795?type=blog" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>{t.life_blog}</StyledLink2>
        </NavItems>
      </Nav>
      <Controls>
        <ToggleButton onClick={toggleTheme} title={t.theme_toggle_label}>
          {theme === 'light' ? '🌙' : '☀️'}
        </ToggleButton>
        <LanguageToggleButton onClick={toggleLanguage}>
          {t.lang_toggle_label}
        </LanguageToggleButton>
      </Controls>
    </HeaderContainer>
  );
};

export default Header; 
