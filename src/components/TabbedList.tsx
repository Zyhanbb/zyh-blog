// components/TabbedList.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';  // 导入语言上下文

// 定义标签页的接口
export interface Tab {
  id: string;      // 标签页的唯一标识符
  label: string;   // 中文标签
  labelEn: string; // 英文标签
}

// 定义列表项的接口
export interface ListItem {
  id: string;      // 列表项的唯一标识符
  title: string;   // 列表项的标题
  url: string;     // 列表项点击后跳转的URL

}

// 组件的属性接口
interface TabbedListProps {
  tabs: Tab[];     // 标签页数组
  data: Record<string, ListItem[]>;  // 数据对象，key是标签页id，value是对应的列表数据
  defaultTabId?: string;             // 默认选中的标签页id
  itemsPerPage?: number;             // 每页显示的项目数量
}

// TabbedList组件：一个带有标签页的列表组件
const TabbedList: React.FC<TabbedListProps> = ({
  tabs,
  data,
  itemsPerPage = 4,  // 默认每页显示5条
}) => {
  const { lang } = useLanguage();  // 获取当前语言
  // 使用useState管理当前激活的标签页
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  // 获取当前激活标签页对应的数据列表
  const list = data[activeTab] || [];
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / itemsPerPage);
  
  // 计算当前页的数据
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = list.slice(startIndex, endIndex);

  // 切换标签页时重置页码
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <Container>
      {/* 标签页导航区域 */}
      <TabsWrapper>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            $isActive={tab.id === activeTab}
            onClick={() => handleTabChange(tab.id)}
            $isEnglish={lang === 'en'}
          >
            {lang === 'en' ? tab.labelEn : tab.label}
          </TabButton>
        ))}
      </TabsWrapper>

      {/* 列表内容区域 */}
      {/* 列表容器 */}
      <ListContainer>
        {/* 列表内容 */}
        <List>
          {currentItems.map(item => (
            <ListItemRow 
              key={item.id}
              onClick={() => window.location.href = item.url}
              role="link"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = item.url;
                }
              }}
            >
              {/* 项目标题 */}
              <ItemTitle>{item.title}</ItemTitle>
              {/* 项目日期 */}
              
            </ListItemRow>
          ))}
        </List>
        
        {/* 分页控制区域 - 仅当总页数大于1时显示 */}
        {totalPages > 1 && (
          <Pagination>
            {/* 上一页按钮 */}
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              上一页
            </PageButton>
            {/* 页码信息 */}
            <PageInfo>
              {currentPage} / {totalPages}
            </PageInfo>
            {/* 下一页按钮 */}
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              下一页
            </PageButton>
          </Pagination>
        )}
      </ListContainer>
    </Container>
  );
};

export default TabbedList;

/* —— styled-components 样式定义 —— */

// 最外层容器样式
const Container = styled.div`
  background: var(--card-bg);      /* 背景颜色 */
  border-radius: 12px;            /* 圆角大小 */
  padding: 1rem;                  /* 内边距 */
  box-shadow: var(--card-shadow); /* 阴影效果 */
  width: 100%;
  margin: 40px auto 15px;             /* 外边距 */
  /* border: 1px solid var(--primary); 边框样式：1px实线，使用主题色 */
`;

// 标签页导航容器样式
const TabsWrapper = styled.div`
  display: flex;
  //background: var(--bg);
  border-radius: 8px;
  padding: 0.25rem;
  margin-bottom: 1rem;
`;

// 标签按钮样式
const TabButton = styled.button<{ $isActive: boolean; $isEnglish: boolean }>`
  flex: 1;
  
  background: ${({ $isActive }) => ($isActive ? 'var(--tab-bg)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'var(--text)' : 'var(--accent)')};
  border: none;
  padding: 0.5rem 0;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;  /* 移除点击时的黑框 */
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: ${({ $isEnglish }) => $isEnglish ? '0.9rem' : '1rem'};
  }

  // 鼠标悬停时的样式
  &:hover {
    color: var(--primary);
    font-weight: 600;
  }

  &:focus {
    outline: none;  /* 确保在focus状态下也没有黑框 */
  }
  
`;

// 列表容器样式
const ListContainer = styled.div`
  height: 235px;  // 固定高度
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

// 列表样式
const List = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.5rem;  // 为滚动条留出空间

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 3px;
  }
`;

// 列表项行样式
const ListItemRow = styled.div`
  background: var(--tab-bg);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    /* 鼠标悬停时改变文字颜色和粗细 */
    color: var(--primary);
    font-weight: 600;
  }
`;

// 列表项标题样式
const ItemTitle = styled.div`
  color: var(--text);
  flex: 1;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;



// 分页控制样式
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0;
`;

const PageButton = styled.button`
  background: var(--bg);
  color: var(--text);
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }

  &:hover:not(:disabled) {
    background: var(--accent);
    color: var(--bg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  color: var(--text);
`;
