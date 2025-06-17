import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const ExperienceCard: React.FC = () => {
  const { t } = useLanguage();
  return (
    <CardContainer>
      <StyledCard title={t.education}>
        <ContentWrapper>
          <TimeText>2018.9-2022.6</TimeText>
          <ContentText>浙大宁波理工学院-信息与计算科学专业-理学学士</ContentText>

          <TimeText>2022.9-至今</TimeText>
          <ContentText>山东大学-软件工程专业-工学博士</ContentText>
        </ContentWrapper>
      </StyledCard>
      <StyledCard title={t.work_experience}>
        <ContentWrapper>
          <TimeText>2018.9-至今</TimeText>
          <ContentText>郑依涵管理员</ContentText>

          <TimeText>2003.9-至今</TimeText>
          <ContentText>学生</ContentText>
        </ContentWrapper>
      </StyledCard>
    </CardContainer>
  );
};

// 样式组件定义
const StyledCard = styled(Card)`
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background: var(--bg);
  border-radius: 12px;
  height: 100%; /* 确保卡片占满容器高度 */
  display: flex;
  flex-direction: column;
  
  .ant-card-head {
    min-height: 50px;
    border-bottom: 1px solid var(--border);
    color: var(--text);
  }
  .ant-card-body{
    padding: 0 24px 20px;
    flex: 1; /* 让内容区域自动填充剩余空间 */
  }
  .ant-card-head-title {
    color: var(--text);
    font-weight: 600;
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    height: auto; /* 在移动端自适应高度 */
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
`;

const TimeText = styled.div`
  color: var(--primary);
  font-weight: bold;
  font-size: 0.9rem;
`;

const ContentText = styled.div`
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
`;

// 在父容器中添加样式
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列布局 */
  gap: 20px; /* 卡片之间的间距 */
  
  
`;

export default ExperienceCard;