import { Flex, Space, Text } from '@/components/common/Wrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { color } from 'wowds-tokens';

const Bold = styled.span`
  color: ${color.textBlack};
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

export default function Carousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const slideCount = slides.length;

  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // ---- Auto play ----
  const AUTO_DELAY = 3000;
  const RESUME_DELAY = 5000;

  const autoTimerRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const stopAutoPlay = () => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const getSlideWidth = () => scrollerRef.current?.clientWidth ?? 1;

  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    el.scrollTo({ left: w * index, behavior: 'smooth' });
  };

  const startAutoPlay = () => {
    stopAutoPlay();

    autoTimerRef.current = window.setInterval(() => {
      // auto에서는 setActive 하지 말고 scrollTo만!
      const next = (activeRef.current + 1) % slideCount;
      scrollTo(next);
    }, AUTO_DELAY);
  };

  const pauseAndResumeLater = () => {
    stopAutoPlay();
    setIsAutoPlay(false);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    resumeTimerRef.current = window.setTimeout(() => {
      setIsAutoPlay(true);
    }, RESUME_DELAY);
  };

  useEffect(() => {
    if (isAutoPlay) startAutoPlay();
    else stopAutoPlay();

    return () => stopAutoPlay();
    // slideCount는 상수라 굳이 deps에 안 넣어도 되는데, lint면 넣어도 OK
  }, [isAutoPlay]);

  // ---- Scroll end debounce (버벅임 해결 핵심) ----
  const scrollEndTimerRef = useRef<number | null>(null);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    if (scrollEndTimerRef.current) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    // 스크롤이 "멈춘 뒤"에만 active 갱신
    scrollEndTimerRef.current = window.setTimeout(() => {
      const w = getSlideWidth();
      // round보다 튐 덜한 중앙 기준
      const next = Math.floor((el.scrollLeft + w / 2) / w);
      const clamped = Math.max(0, Math.min(slideCount - 1, next));
      setActive(clamped);
    }, 90);
  };

  // resize 시 active 재계산
  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = getSlideWidth();
      const next = Math.floor((el.scrollLeft + w / 2) / w);
      setActive(Math.max(0, Math.min(slideCount - 1, next)));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [slideCount]);

  // cleanup (타이머 누수 방지)
  useEffect(() => {
    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

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
          onTouchStart={pauseAndResumeLater}
          onMouseDown={pauseAndResumeLater}
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
                onClick={() => {
                  pauseAndResumeLater(); // dot 클릭도 사용자 조작으로 보고 잠깐 멈추기
                  scrollTo(i);
                }}
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
      </Flex>
    </Flex>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
    flex: '0 0 100%',
    scrollSnapAlign: 'start'
  },
  card: {
    height: 210,
    borderRadius: 18,
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
