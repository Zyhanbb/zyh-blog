import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Ballpit from '../components/Ballpit';
import Magnet from '../components/Magnet';
import ImageTrail from '../components/ImageTrail';
import '../components/ImageTrail.css';
import photo1 from '../assets/images/photo/1.jpg'
import photo2 from '../assets/images/photo/2.jpg'
import photo3 from '../assets/images/photo/3.jpg'
import photo4 from '../assets/images/photo/4.jpg'
import photo5 from '../assets/images/photo/5.jpg'
import photo6 from '../assets/images/photo/6.jpg'
import photo7 from '../assets/images/photo/7.jpg'
import photo8 from '../assets/images/photo/8.jpg'
import photo9 from '../assets/images/photo/9.jpg'
import photo10 from '../assets/images/photo/10.jpg'
import photo11 from '../assets/images/photo/11.jpg'
import photo12 from '../assets/images/photo/12.jpg'
import photo13 from '../assets/images/photo/13.jpg'
import DecryptedText from '../components/DecryptedText';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EnterButton = styled.button`
  padding: 1.2rem 2.5rem;
  font-size: 1.4rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  font-weight: 500;
  letter-spacing: 1px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BallpitContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 1.5s ease-in-out;
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
`;

const ImageTrailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: #000;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  border-radius: 8px;
  background: transparent;
  overflow: visible;
`;

const ImageItem = styled.div`
  width: 190px;
  aspect-ratio: 1.1;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  will-change: transform, filter;
`;

const ImageInner = styled.div`
  background-position: 50% 50%;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  position: absolute;
  top: calc(-1 * 20px / 2);
  left: calc(-1 * 20px / 2);
`;

const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBallpit, setShowBallpit] = useState(true);
  const [showImageTrail, setShowImageTrail] = useState(false);
  const [showDecryptedText, setShowDecryptedText] = useState(false);

  // 判断屏幕宽度
  let ballpitCount = 100;
  if (typeof window !== 'undefined') {
    if (window.matchMedia('(max-width: 440px)').matches) {
      ballpitCount = 25;
    } else if (window.matchMedia('(max-width: 768px)').matches) {
      ballpitCount = 50;
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBallpit(false);
      setTimeout(() => {
        setShowImageTrail(true);
      }, 1000);
    }, 5000);

    // 新增：页面加载3秒后显示DecryptedText
    const decryptedTimer = setTimeout(() => {
      setShowDecryptedText(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(decryptedTimer);
    };
  }, []);

  const handleEnter = () => {
    navigate('/main');
  };

  const images = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11,
    photo12,
    photo13,
    // 'https://picsum.photos/id/287/300/300',
    // 'https://picsum.photos/id/1001/300/300',
    // 'https://picsum.photos/id/1025/300/300',
    // 'https://picsum.photos/id/1026/300/300',
    // 'https://picsum.photos/id/1027/300/300',
    // 'https://picsum.photos/id/1028/300/300',
    // 'https://picsum.photos/id/1029/300/300',
    // 'https://picsum.photos/id/1030/300/300',
  ];

  return (
    <IntroContainer>
      <ImageTrailContainer>
        <ContentWrapper>
          {images.map((src, index) => (
            <ImageItem key={index} className="content__img">
              <ImageInner 
                className="content__img-inner"
                style={{ backgroundImage: `url(${src})` }}
              />
            </ImageItem>
          ))}
          {showImageTrail && <ImageTrail items={images} variant={1} enableClick={true} />}
        </ContentWrapper>
      </ImageTrailContainer>
      <BallpitContainer visible={showBallpit}>
        <Ballpit
          followCursor={true}
          colors={['rgb(233, 62, 147)', 'rgb(255, 255, 255)']}
          count={ballpitCount}
          maxSize={1.2}
          minSize={0.5}
          gravity={0.3}
          friction={0.998}
          wallBounce={0.9}
          maxVelocity={0.2}
        />
      </BallpitContainer>
      <ContentContainer>
      <Title>生日快乐！</Title>
      {showDecryptedText && (
        <Title>
          <DecryptedText
            text="欢迎来到韩雨辰的博客"
            animateOn="view"
            speed={100}
            maxIterations={100}
            sequential={true}
            revealDirection="start"
            useOriginalCharsOnly={true}
          />
        </Title>
      )}
        
        <Magnet 
          padding={80} 
          disabled={false} 
          magnetStrength={30}
          activeTransition="transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          inactiveTransition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        >
        {showImageTrail && (
          <EnterButton onClick={handleEnter}>
            进入主页
          </EnterButton>
        )}
        </Magnet>
      </ContentContainer>
    </IntroContainer>
  );
};

export default IntroPage;
