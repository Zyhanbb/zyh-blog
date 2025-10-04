import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import profileImg from '../assets/images/zyh.jpg'; // 确保路径正确
import { GithubOutlined, ZhihuOutlined, BilibiliOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import TabbedList from '../components/TabbedList.tsx';
import type { Tab, ListItem } from '../components/TabbedList.tsx';
import ExperienceCard from '../components/ExperienceCard.tsx'
import MyContext from '../contexts/Context.tsx';
import Love from '../components/Love/index.tsx'
import ImageCarousel from '../components/Carousel.tsx';

// 使用路径字符串实现懒加载，减少初始bundle大小
const tabs: Tab[] = [
  { id: 'submitted', label: '科研成果', labelEn: 'Research Achievements' },
  { id: 'papers', label: '一些特长', labelEn: 'Skills & Hobbies' },
  { id: 'patents', label: '个人缺点', labelEn: 'Personal Weaknesses' },
  //{ id: 'projects', label: '课题', labelEn: 'Projects' },
];

const sampleData: Record<string, ListItem[]> = {
  submitted: [
    { id: '1', title: '论文：A Hybrid Pipeline and Large Language Model System for Task-Oriented Dialogue（CCFC类会议，第一作者）', url: 'https://ant.design/components/icon-cn' },
    { id: '2', title: '专利：基于知识图谱嵌入和大语言模型的链接预测方法及系统（专利号：202510291117）', url: 'https://xueshu.baidu.com/ndscholar/browse/detail?paperid=1n090cf01w2q0g205r2k0pc0ac026064' },
    // …
  ],
  papers: [
    { 
      id: '1', 
      title: '铅笔微雕', 
      type: 'carousel',
      images: [
        '/images/weidiao/1.jpg',
        '/images/weidiao/2.jpg',
        '/images/weidiao/3.jpg',
        '/images/weidiao/4.jpg',
        '/images/weidiao/5.jpg',
        '/images/weidiao/6.jpg',
        '/images/weidiao/7.jpg'
      ]
    },
    { 
      id: '2', 
      title: '田径', 
      type: 'carousel',
      images: [
        '/images/tianjing/1.jpg',
        '/images/tianjing/2.jpg'
      ] 
    },
    { 
      id: '3', 
      title: '摄影', 
      type: 'carousel',
      images: [
        '/images/sheying/1.jpg',
        '/images/sheying/2.jpg',
        '/images/sheying/3.jpg',
        '/images/sheying/4.jpg',
        '/images/sheying/5.jpg',
        '/images/sheying/6.jpg'
      ]
    },
    // …
  ],
  patents: [ /* … */
    { id: '1', title: '无' } // …
  ],
  projects: [ /* … */
    { id: '1', title: '无' },
   
    // …
  ],

};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
`;



const ProfileSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center; /* 垂直居中 */
  
  @media (max-width: 768px) {
    margin-bottom: 0;
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
  grid-template-columns: 1fr 1fr; /* 始终两列 */
  
  gap: 1rem;
  width: 100%;
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
  @media(max-width: 440px){
    font-size: 1.2rem;
  }
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
  @media(max-width: 440px){
    font-size: 0.9rem;
  }
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
  @media(max-width: 440px){
    font-size: 0.9rem;
  }
`;

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<boolean>(false);
  const [liked, setLiked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 模态框相关状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return; // 防止在挂载时执行
    }
    else if (!liked) {
      setLiked(true); // 第一次点击变红
      console.log("datalike", liked)
    } else {

      console.log("datashake", data)
    }

  }, [data])

  // 处理列表项点击事件
  const handleItemClick = (item: ListItem) => {
    if (item.type === 'carousel' && item.images) {
      setSelectedImages(item.images);
      setSelectedTitle(item.title);
      setIsModalVisible(true);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileImage>
          <img src={profileImg} alt={t.author} />
        </ProfileImage>
        <ProfileInfo>
          <div style ={{display: 'flex'}}>
            <Name>{t.author}</Name>
            <MyContext.Provider value={{ data, setData }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  height: '44px',
                  padding: '10px 0 0'
                }}
              >
                <Love />
                <p style={{ margin: "10px 0px" }}>点击小心心</p>

              </div>
            </MyContext.Provider>
          </div>
          <Bio>{t.profile_desc}</Bio>
          <Bio>{t.bio}</Bio>

          <SocialLinks>
            <SocialIcon href="https://github.com/Zyhanbb" target="_blank" rel="noopener noreferrer" title="GitHub">
              <GithubOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            </SocialIcon>
            <SocialIcon href="https://www.zhihu.com/people/yi-xie-zhi-qiu-41-95" target="_blank" rel="noopener noreferrer" title="Zhihu">
              <ZhihuOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            </SocialIcon>
            <SocialIcon href="https://space.bilibili.com/486529119?spm_id_from=333.1007.follow.user_card.click" title="Email">
              <BilibiliOutlined style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            </SocialIcon>
          </SocialLinks>
        </ProfileInfo>

      </ProfileSection>

      <ExperienceCard />

      <div>
        {/* 你想要放的位置 */}
        <TabbedList
          tabs={tabs}
          data={sampleData}
          defaultTabId="latest"
          onItemClick={handleItemClick}
        />
        {/* 其它内容… */}
      </div>
      <BlogsSection>

        <BlogCards>
          <BlogCard href="https://blog.csdn.net/YiHanXii?type=blog" target="_blank" rel="noopener noreferrer">
            <CardTitle>{t.tech_blog}</CardTitle>
            <CardDescription>{t.tech_blog_desc}</CardDescription>
            <CardFooter>
              <CardLink>{t.tech_blog_link}</CardLink>
            </CardFooter>
          </BlogCard>
          <BlogCard href="https://weibo.com/u/5579929001" target="_blank" rel="noopener noreferrer">
            <CardTitle>{t.life_blog}</CardTitle>
            <CardDescription>{t.life_blog_desc}</CardDescription>
            <CardFooter>
              <CardLink>{t.life_blog_link}</CardLink>
            </CardFooter>
          </BlogCard>
        </BlogCards>
      </BlogsSection>

      {/* 图片轮播模态框 */}
      <Modal
        title={selectedTitle}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width="800px"
        centered
        destroyOnClose
      >
        <ImageCarousel 
          images={selectedImages}
          height="550px"
          autoplay={true}
          autoplaySpeed={3000}
        />
      </Modal>
    </Container>
  );
};

export default HomePage; 