import { Flex, Space, Text } from '@/components/common/Wrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { color } from 'wowds-tokens';

import image1 from '/onboarding/image.png';
import image2 from '/onboarding/image-2.png';
import image3 from '/onboarding/image-3.png';
import image4 from '/onboarding/image-4.png';

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
    image: image1
  },
  {
    chip: '파트',
    desc: (
      <>
        GDG의 <Bold>파트</Bold> 스터디는 파트 리드를 필두로 더 깊게 공부하고
        싶은 분야를 함께 공부하는 <Bold>심화 학습</Bold> 스터디예요. 파트
        멤버들과 함께하는 스터디 외에도 세미나 등 다양한 시각에서 배우고 교류할
        활동이 열려요.
      </>
    ),
    image: image2
  },
  {
    chip: '프로젝트 트랙',
    desc: (
      <>
        프로젝트가 처음이신 분들, 혹은 이제 막 개발에 입문하신 분들!{' '}
        <Bold>프로젝트 트랙</Bold>에서 아이디어 구상부터 실제 서비스 배포까지
        개발의 전 과정을 경험하며 함께 멋진 개발자로 성장해 봐요.
      </>
    ),
    image: image3
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
    image: image4
  }
];

// 데스크탑에서 한 화면에 몇 개 보일지
const DESKTOP_VISIBLE = 3;
// 무한루프를 위해 앞/뒤에 몇 묶음 복제할지(여유있게)
const CLONE_SETS = 2;

export default function CarouselInfiniteDesktop3() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // ---- responsive ----
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)');
    const handler = () => setDesktop(mql.matches);
    handler();
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  const baseSlides = slides;
  const baseCount = baseSlides.length;

  // ---- "무한"을 위해 앞뒤로 여러 세트 복제 ----
  const loopSlides = useMemo(() => {
    if (baseCount === 0) return [];
    const arr: typeof baseSlides = [];
    for (let i = 0; i < CLONE_SETS; i++) arr.push(...baseSlides);
    arr.push(...baseSlides);
    for (let i = 0; i < CLONE_SETS; i++) arr.push(...baseSlides);
    return arr;
  }, [baseCount]);

  // 중앙에 있는 "원본 영역" 시작 인덱스
  const middleStartIndex = baseCount * CLONE_SETS; // 앞에 붙인 세트 수만큼 건너뛰기

  // ---- active (dots/상단 텍스트) ----
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // ---- layout values ----
  const gap = desktop ? 40 : 0; // 스샷 느낌 gap
  const slideBasis = desktop
    ? `calc((100% - ${gap * (DESKTOP_VISIBLE - 1)}px) / ${DESKTOP_VISIBLE})`
    : '100%';

  const styles = useMemo(() => {
    return {
      scroller: {
        display: 'flex',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        outline: 'none',
        width: '100%',
        gap,
        scrollSnapType: desktop ? 'none' : 'x mandatory'
      } as React.CSSProperties,

      slide: {
        flex: `0 0 ${slideBasis}`,
        alignItems: 'flex-start',
        scrollSnapAlign: 'start'
      } as React.CSSProperties,

      card: {
        height: 210,
        width: '100%',
        borderRadius: 18,
        userSelect: 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      } as React.CSSProperties,

      dots: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        marginTop: 14
      } as React.CSSProperties,

      dot: {
        width: 8,
        height: 8,
        borderRadius: 999,
        border: 'none',
        background: color.primary,
        cursor: 'pointer',
        transition: 'opacity 160ms ease, transform 160ms ease',
        padding: 0
      } as React.CSSProperties
    };
  }, [desktop, gap, slideBasis]);

  // ---- scroll helpers ----
  const getSlideStep = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    // 첫번째 슬라이드 폭 + gap = 한 칸 이동 step
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    return first.getBoundingClientRect().width + gap;
  };

  const scrollToIndex = (
    index: number,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getSlideStep();
    el.scrollTo({ left: step * index, behavior });
  };

  // ---- 초기 위치: "중앙 원본 영역"의 첫번째로 점프 ----
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      scrollToIndex(middleStartIndex, 'auto');
    });
    // desktop/mobile 바뀌면 step이 바뀌니까 재정렬
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktop]);

  // ---- active 계산 + 무한 보정 ----
  const scrollEndTimerRef = useRef<number | null>(null);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);

    scrollEndTimerRef.current = window.setTimeout(() => {
      const step = getSlideStep();
      if (!step) return;

      const rawIndex = Math.round(el.scrollLeft / step);

      // 현재 rawIndex가 loopSlides 기준 어디에 있는지 -> base index로 변환
      const baseIndex =
        (((rawIndex - middleStartIndex) % baseCount) + baseCount) % baseCount;
      setActive(baseIndex);

      // ✅ 무한 루프 핵심: 너무 앞/뒤로 가면 중앙 영역으로 "티 안나게" 순간이동
      // 현재 rawIndex가 앞쪽 복제 영역에 너무 가까우면
      const leftThreshold = baseCount; // 앞쪽으로 한 세트 정도 남으면 당겨오기
      const rightThreshold = loopSlides.length - baseCount;

      if (rawIndex < leftThreshold) {
        // 중앙 영역 동일 baseIndex 위치로 점프
        const target = middleStartIndex + baseIndex;
        requestAnimationFrame(() => scrollToIndex(target, 'auto'));
      } else if (rawIndex > rightThreshold) {
        const target = middleStartIndex + baseIndex;
        requestAnimationFrame(() => scrollToIndex(target, 'auto'));
      }
    }, 80);
  };

  // ---- autoplay ----
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

  const startAutoPlay = () => {
    stopAutoPlay();
    autoTimerRef.current = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = getSlideStep();
      if (!step) return;

      const rawIndex = Math.round(el.scrollLeft / step);
      scrollToIndex(rawIndex + 1);
    }, AUTO_DELAY);
  };

  const pauseAndResumeLater = () => {
    stopAutoPlay();
    setIsAutoPlay(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(
      () => setIsAutoPlay(true),
      RESUME_DELAY
    );
  };

  useEffect(() => {
    if (isAutoPlay) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlay, desktop]);

  useEffect(() => {
    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- dots ----
  const onDotClick = (baseIndex: number) => {
    pauseAndResumeLater();
    // 중앙 영역의 해당 baseIndex로 이동
    scrollToIndex(middleStartIndex + baseIndex);
  };

  return (
    <Flex
      direction="column"
      css={css`
        width: 100%;
        max-width: 1200px; /* 스샷처럼 넓게 */
        margin: 0 auto;
      `}>
      <Space height={36} />

      {/* 데스크탑에서는 3개 카드 각각에 텍스트가 붙어야 스샷 느낌 */}
      <div
        ref={scrollerRef}
        style={styles.scroller}
        onScroll={onScroll}
        onTouchStart={pauseAndResumeLater}
        onMouseDown={pauseAndResumeLater}
        aria-label="GDG 활동 무한 캐러셀">
        {loopSlides.map((s, i) => (
          <div key={i} style={styles.slide}>
            <Text
              typo="h3"
              color="primary"
              css={css`
                background: white;
                padding: 7px 12px;
                border-radius: 8px;
                width: fit-content;
              `}>
              {s.chip}
            </Text>

            <Space height={12} />

            <Text
              typo="body1"
              color="sub"
              css={css`
                line-height: 160%;
                height: 110px;
              `}>
              {s.desc}
            </Text>

            <Space height={20} />

            <div
              style={{
                ...styles.card,
                backgroundImage: `url(${s.image})`
              }}
            />
          </div>
        ))}
      </div>

      {/* Dots (base only) */}
      <div style={styles.dots}>
        {Array.from({ length: baseCount }).map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDotClick(i)}
              style={{
                ...styles.dot,
                opacity: isActive ? 1 : 0.25,
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
              aria-current={isActive}
            />
          );
        })}
      </div>
    </Flex>
  );
}
