import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #fff;
    --text:  #181818;
    --hover-text: rgb(233, 8, 8);
    --card-bg: #fff;
    --card-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    --primary: rgb(237, 132, 185); 
    --accent: rgb(98, 86, 92); /* 与light模式的accent保持一致 */
    --tab-bg: rgb(231, 226, 228);
  }

  body[data-theme="dark"] {
    --bg: #181818;
    --text: #f8f8f8;
    --hover-text: rgb(233, 8, 8);
    --card-bg: #232323;
    --card-shadow: 0 15px 15px rgba(0,0,0,0.3);
    --primary: rgb(237, 132, 185); /* 保持primary一致 */
    --accent: #f7e8e8; /* 与dark模式的accent保持一致 */
    --tab-bg:rgb(26, 26, 26);
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans', Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s, color 0.3s;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: var(--primary); /* 使用primary作为链接默认颜色 */
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--accent);
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background-color: var(--primary);
    color: var(--background); /* 使用background，因为在styled components中background是主题相关的 */
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  button:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    body {
      font-size: 16px;
    }
  }
`;

export default GlobalStyles; 