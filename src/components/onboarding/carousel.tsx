import React, { useEffect, useRef, useState } from 'react';
import { Flex, Space, Text } from '@/components/common/Wrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Bold = styled.span`
  color: #001a51;
`;
const slides = [
  {
    chip: '정규 스터디',
    desc: (
      <>
        GDG의 <Bold>정규 스터디</Bold>는 초심자들에게 개발에 쉽게 입문할 수 있는
        기회를 제공하기 위해 기초적인 내용 위주로 진행돼요.
      </>
    ),
    color: '#d9d9d9'
  },
  {
    chip: '파트 스터디',
    desc: (
      <>
        GDG의 <Bold>파트 스터디</Bold>는 파트 리드를 필두로 더 깊게 공부하고
        싶은 분야를 함께 공부하는 <Bold>심화 학습 스터디</Bold>예요. 파트
        멤버들과 함께하는 스터디 외에도 세미나 등 다양한 시각에서 배우고 교류할
        활동이 열려요.
      </>
    ),
    color: '#e6e6e6'
  },
  {
    chip: '프로젝트 트랙',
    desc: (
      <>
        프로젝트가 처음이신 분들, 혹은 이제 막 개발에 입문하신 분들!
        <Bold> 프로젝트 트랙</Bold>에서 아이디어 구상부터 실제 서비스 배포까지
        개발의 전 과정을 경험하며 함께 멋진 개발자로 성장해 봐요.
      </>
    ),
    color: '#d0d0d0'
  },
  {
    chip: 'GDG 연합 활동',
    desc: (
      <>
        한국에는 2025년도 44개의 GDG 챕터가 있어요. 각 GDG는 개별 활동뿐만
        아니라 연합 활동에도 큰 관심을 보이며, 매년 많은 연합 행사가 기획되고
        있어요.
      </>
    ),
    color: '#ededed'
  }
];

export default function DirectCarouselDemo() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const slideCount = slides.length;

  // Compute the slide width on demand (container's clientWidth)
  const getSlideWidth = () => scrollerRef.current?.clientWidth ?? 1;

  // Update active dot while scrolling (throttled via rAF)
  const rafRef = useRef<number | null>(null);
  const onScroll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollerRef.current;
      if (!el) return;
      const w = getSlideWidth();
      const next = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(slideCount - 1, next)));
    });
  };

  // Keep active dot correct when the viewport changes size
  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = getSlideWidth();
      const next = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(slideCount - 1, next)));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [slideCount]);

  // Scroll to slide (dot click)
  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    el.scrollTo({ left: w * index, behavior: 'smooth' });
  };

  // Keyboard accessibility (optional)
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowLeft') scrollTo(Math.max(0, active - 1));
    if (e.key === 'ArrowRight') scrollTo(Math.min(slideCount - 1, active + 1));
  };

  return (
    <Flex direction="column">
      <Flex direction="column">
        <Flex direction="column" gap="md" align="flex-start">
          <Text
            typo="h2"
            color="primary"
            css={css`
              background: white;
              padding: 7px 12px;
              border-radius: 8px;
            `}>
            {slides[active].chip}
          </Text>

          <Text typo="body1" color="sub">
            {slides[active].desc}
          </Text>
        </Flex>

        <Space height={24} />
        <div
          ref={scrollerRef}
          style={styles.scroller}
          onScroll={onScroll}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="GDG 활동 슬라이더">
          {slides.map((s, i) => (
            <div
              key={i}
              style={styles.slide}
              aria-label={`${i + 1} / ${slideCount}`}>
              <div style={{ ...styles.card, background: s.color }}>
                <div style={styles.cardInnerHint}>이미지/콘텐츠 영역</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={styles.dots} role="tablist" aria-label="슬라이드 선택">
          {Array.from({ length: slideCount }).map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                style={{
                  ...styles.dot,
                  opacity: isActive ? 1 : 0.25,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
                aria-label={`${i + 1}번째 슬라이드로 이동`}
                aria-current={isActive}
              />
            );
          })}
        </div>

        <div style={styles.tip}>
          Tip: 모바일은 스와이프, 데스크톱은 트랙패드/휠 + 키보드(←/→)로도 넘길
          수 있어요.
        </div>
      </Flex>
    </Flex>
  );
}

const styles: Record<string, React.CSSProperties> = {
  chipRow: {
    marginTop: 18
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: 12,
    background: '#eaf2ff',
    color: '#2563eb',
    fontWeight: 700,
    fontSize: 16
  },
  desc: {
    marginTop: 14,
    marginBottom: 18,
    color: '#6b7280',
    lineHeight: 1.6,
    fontSize: 15
  },

  // The important part: scroll-snap carousel
  scroller: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    borderRadius: 18,
    outline: 'none'
  },
  slide: {
    flex: '0 0 100%', // each slide is exactly 1 page wide
    scrollSnapAlign: 'start',
    paddingRight: 0
  },
  card: {
    height: 210,
    borderRadius: 18,
    background: '#d9d9d9',
    display: 'grid',
    placeItems: 'center',
    userSelect: 'none'
  },
  cardInnerHint: {
    fontSize: 14,
    color: 'rgba(17,24,39,0.55)',
    fontWeight: 600
  },

  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginTop: 14
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    border: 'none',
    background: '#3b82f6',
    cursor: 'pointer',
    transition: 'opacity 160ms ease, transform 160ms ease',
    padding: 0
  },
  tip: {
    marginTop: 16,
    fontSize: 12,
    color: '#9ca3af'
  }
};
