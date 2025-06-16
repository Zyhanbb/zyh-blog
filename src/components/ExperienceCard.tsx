import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const ExperienceCard: React.FC = () => {
  const { t } = useLanguage();
  return (
  <Row gutter={16}>
    <Col span={12}>
      <StyledCard title={t.education}>
        <ContentWrapper>
          <TimeText>2018.9-2022.6</TimeText>
          <ContentText>浙大宁波理工学院-信息与计算科学专业-理学学士</ContentText>

          <TimeText>2022.9-至今</TimeText>
          <ContentText>山东大学-软件工程专业-工学博士</ContentText>
        </ContentWrapper>
      </StyledCard>
    </Col>
    <Col span={12}>
      <StyledCard title={t.work_experience}>
        <ContentWrapper>
          <TimeText>2018.9-至今</TimeText>
          <ContentText>郑依涵管理员</ContentText>

          <TimeText>2003.9-至今</TimeText>
          <ContentText>学生</ContentText>
        </ContentWrapper>
      </StyledCard>
    </Col>
    {/* <Col span={8}>
      <Card title="Card title" style={{ boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.1)' }}>
        Card content
      </Card>
    </Col> */}
  </Row>
  );
};

// 样式组件定义
const StyledCard = styled(Card)`
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background: var(--bg);
  border-radius: 12px;
  
  .ant-card-head {
    border-bottom: 1px solid var(--border);
    color: var(--text);
  }

  .ant-card-head-title {
    color: var(--text);
    font-weight: 600;
    font-size: 1.2rem;
    
  }
  @media (max-width: 768px) {
   height: 280px;
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

export default ExperienceCard;