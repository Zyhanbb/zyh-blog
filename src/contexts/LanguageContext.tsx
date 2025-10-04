import { createContext, useContext, useState, type ReactNode } from 'react';

interface Translation {
  home: string;
  tech_blog: string;
  life_blog: string;
  welcome: string;
  tech_blog_desc: string;
  life_blog_desc: string;
  profile_desc: string;
  author: string;
  tech_blog_link: string;
  life_blog_link: string;
  theme_toggle_label: string;
  lang_toggle_label: string;
  all_rights_reserved: string;
  education: string;
  work_experience: string;
  bio: string;
}

interface LanguageContextType {
  lang: 'zh' | 'en';
  t: Translation;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<'zh' | 'en', Translation> = {
  zh: {
    home: "首页",
    tech_blog: "技术博客",
    life_blog: "生活博客",
    welcome: "欢迎访问我的博客",
    tech_blog_desc: "技术趋势、经验教程、学习笔记。",
    life_blog_desc: "旅行经历、美食推荐、个人故事。",
    profile_desc:
      "目前就读于山东大学，正在苦苦秋招（前端），研究方向为自然语言处理。导师是刘磊教授。",
    author: "郑依涵",
    tech_blog_link: "技术博客 →",
    life_blog_link: "生活博客 →",
    theme_toggle_label: "主题",
    lang_toggle_label: "EN",
    all_rights_reserved: "保留所有权利。",
    education: "教育经历",
    work_experience: "工作经历",
    bio: "2000年3月27日 | 白羊座 | ESTJ | 浙江温州人",
  },
  en: {
    home: "Home",
    tech_blog: "Tech Blog",
    life_blog: "Life Blog",
    welcome: "Welcome to my blog",
    tech_blog_desc:
      "Technology, tutorials, learning notes...",
    life_blog_desc:
      "Travel, food, personal stories...",
    profile_desc:
      "Currently studying at Shandong University, looking for a job (Web Frontend). Research direction is NLP. Supervisor: Prof.Lei Liu.",
    author: "Yihan Zheng",
    tech_blog_link: "Tech Blog →",
    life_blog_link: "Life Blog →",
    theme_toggle_label: "Theme",
    lang_toggle_label: "中文",
    all_rights_reserved: "All rights reserved.",
    education: "Education",
    work_experience: "Work",
    bio: "2000.3.27 | Aries | ESTJ | Wenzhou, China",
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<'zh' | 'en'>(() => {
    const storedLang = localStorage.getItem('lang');
    return (storedLang as 'zh' | 'en') || 'zh';
  });

  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prevLang => {
      const newLang = prevLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
} 