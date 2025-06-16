import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import profileImg from '../assets/images/hyc.png'; // 确保路径正确
import { GithubOutlined, ZhihuOutlined, BilibiliOutlined} from '@ant-design/icons';
import TabbedList from '../components/TabbedList.tsx';
import type { Tab, ListItem } from '../components/TabbedList.tsx';
import ExperienceCard from '../components/ExperienceCard.tsx'
const tabs: Tab[] = [
  { id: 'submitted', label: '在投', labelEn: 'Submitted' },
  { id: 'papers',   label: '论文', labelEn: 'Papers' },
  { id: 'patents',  label: '专利', labelEn: 'Patents' },
  { id: 'projects', label: '课题', labelEn: 'Projects' },
];

const sampleData: Record<string, ListItem[]> = {
  submitted: [
    { id: '1', title: 'Mapping Instruction to Text Diffusion Space for Diverse Text Generation',url:'https://ant.design/components/icon-cn' },
    { id: '2', title: 'From Expert-Driven to AI-Driven: A New Framework for User-Centric Psychological Scale Item Generation Using Large Language Models', url:'https://ant.design/components/icon-cn' },
    // …
  ],
  papers: [
    { id: '1', title: 'Exploring Word Composition Knowledge In Language Usages, KSEM 2024',url:'https://link.springer.com/chapter/10.1007/978-981-97-5501-1_5' },
    { id: '2', title: 'Unsupervised Paraphrasing under Syntax Knowledge, AAAI 2023', url:'https://dl.acm.org/doi/10.1609/aaai.v37i11.26558' },
    // …
  ],
  patents: [ /* … */ 
    { id: '1', title: '基于扩散模型的多样性可控文本生成方法和装置, ZL 2024 1 1008772.X',url:'https://zhuanli.tianyancha.com/c407b31ca078e74d9d7a0905beac05dc' },
    { id: '2', title: '一种面向数据增强的词汇组合知识建模方法及装置, ZL 2024 1 0330986.2', url:'https://splab.sdu.edu.cn/info/1015/2267.htm' },
    { id: '3', title: '一种基于子树库的多样性可控文本改写方法及装置, ZL 2024 1 0634369.1', url:'https://xueshu.baidu.com/usercenter/paper/show?paperid=173u0xt0nk3k0au0sv4q0ry0eb641909&site=xueshu_se' },
    // …
  ],
  projects: [ /* … */ 
    { id: '1', title: '基于扩散模型的多样性文本生成',url:'https://zhuanli.tianyancha.com/c407b31ca078e74d9d7a0905beac05dc' },
    { id: '2', title: '文本空间与指令空间对齐', url:'https://splab.sdu.edu.cn/info/1015/2267.htm' },
    { id: '3', title: '结构型知识融入的数据生成方法', url:'https://xueshu.baidu.com/usercenter/paper/show?paperid=173u0xt0nk3k0au0sv4q0ry0eb641909&site=xueshu_se' },
    { id: '4', title: '心理测试量表项目多维度评估框架', url:'https://xueshu.baidu.com/usercenter/paper/show?paperid=173u0xt0nk3k0au0sv4q0ry0eb641909&site=xueshu_se' },
    // …
  ],

};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center; /* 垂直居中 */
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center; /* 文本居中 */
  }
`;

const ProfileImage = styled.div`
  flex: 0 0 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--primary); /* 移除或注释掉背景色，以便图片显示 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--background);  /* 移除或注释掉颜色 */
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 添加阴影 */

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
    flex: none;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    text-align: center; /* 文本居中 */
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text);
  text-align: left;
  @media (max-width: 768px) {
    text-align: center; /* 文本居中 */
  }
`;

const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    justify-content: center; /* 社交图标居中 */
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: #fff; /* 直接设置为白色 */
  font-size: 1.2rem;
  transition: all 0.3s ease;
  /* text-decoration: none; */ /* 移除下划线，由GlobalStyles处理 */
  
  &:hover {
    background-color: var(--tab-bg); /* 定义一个默认的 accent */
    transform: translateY(-3px);
  }
`;

const BlogsSection = styled.section`
  margin-top: 3rem;
`;


const BlogCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.a` /* Changed from styled(Link) to styled.a */
  display: block;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: var(--card-bg); /* 使用 var(--card-bg) */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: var(--text); /* 使用 var(--text) */
  /* text-decoration: none; */ /* 移除下划线，由GlobalStyles处理 */
  border: 1px solid transparent; /* 添加一个透明边框防止hover时跳动 */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border-color: var(--primary); /* hover时显示边框颜色 */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  min-height: 4.5em; /* 保持最小高度，防止布局跳动 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const CardLink = styled.span`
  color: var(--primary);
  font-weight: 500;
`;

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container>
      <ProfileSection>
        <ProfileImage>
          <img src={profileImg} alt={t.author} />
        </ProfileImage>
        <ProfileInfo>
          <Name>{t.author}</Name>
          <Bio>{t.profile_desc}</Bio>
          <Bio>{t.bio}</Bio>

          <SocialLinks>
            <SocialIcon href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" title="GitHub">
              <GithubOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
            </SocialIcon>
            <SocialIcon href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer" title="Zhihu">
              <ZhihuOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
            </SocialIcon>
            <SocialIcon href="mailto:your-email@example.com" title="Email">
              <BilibiliOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
            </SocialIcon>
          </SocialLinks>
        </ProfileInfo>
      </ProfileSection>

      <ExperienceCard/>

     <div>
      {/* 你想要放的位置 */}
      <TabbedList
        tabs={tabs}
        data={sampleData}
        defaultTabId="latest"
      />
      {/* 其它内容… */}
    </div>
      <BlogsSection>
      
        <BlogCards>
          <BlogCard href="https://blog.csdn.net/qq_45104795?type=blog">
            <CardTitle>{t.tech_blog}</CardTitle>
            <CardDescription>{t.tech_blog_desc}</CardDescription>
            <CardFooter>
              <CardLink>{t.tech_blog_link}</CardLink>
            </CardFooter>
          </BlogCard>
          <BlogCard href="https://weibo.com/u/6885353494">
            <CardTitle>{t.life_blog}</CardTitle>
            <CardDescription>{t.life_blog_desc}</CardDescription>
            <CardFooter>
              <CardLink>{t.life_blog_link}</CardLink>
            </CardFooter>
          </BlogCard>
        </BlogCards>
      </BlogsSection>
    </Container>
  );
};

export default HomePage; 