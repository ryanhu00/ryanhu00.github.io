import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  shineOnHover?: boolean;
  followCursor?: boolean;
  cursorShineWidth?: number;
  shineCoreColor?: string;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  shineOnHover = false,
  followCursor = false,
  cursorShineWidth = 22,
  shineCoreColor,
  direction = 'left',
  delay = 0
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorX, setCursorX] = useState(50);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const rootRef = useRef<HTMLSpanElement>(null);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;
  const useCursorShine = shineOnHover && followCursor;
  const shineActive = shineOnHover ? isHovering : true;

  useAnimationFrame(time => {
    if (useCursorShine || disabled || isPaused || !shineActive) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!useCursorShine || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      setCursorX(Math.max(0, Math.min(100, x)));
    },
    [useCursorShine]
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && !useCursorShine) setIsPaused(true);
    if (shineOnHover) {
      elapsedRef.current = 0;
      progress.set(0);
      lastTimeRef.current = null;
      setIsHovering(true);
    }
  }, [pauseOnHover, shineOnHover, useCursorShine, progress]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && !useCursorShine) setIsPaused(false);
    if (shineOnHover) {
      setIsHovering(false);
      elapsedRef.current = 0;
      progress.set(0);
      lastTimeRef.current = null;
    }
  }, [pauseOnHover, shineOnHover, useCursorShine, progress]);

  const half = cursorShineWidth / 2;
  const inner = half * 0.35;
  const hoverGradient = shineCoreColor
    ? `linear-gradient(
        90deg,
        ${color} 0%,
        ${color} ${Math.max(0, cursorX - half)}%,
        ${shineColor} ${Math.max(0, cursorX - inner)}%,
        ${shineCoreColor} ${cursorX}%,
        ${shineColor} ${Math.min(100, cursorX + inner)}%,
        ${color} ${Math.min(100, cursorX + half)}%,
        ${color} 100%
      )`
    : `linear-gradient(
        90deg,
        ${color} 0%,
        ${color} ${Math.max(0, cursorX - half)}%,
        ${shineColor} ${cursorX}%,
        ${color} ${Math.min(100, cursorX + half)}%,
        ${color} 100%
      )`;

  const cursorGradientStyle: React.CSSProperties = {
    backgroundImage: isHovering
      ? hoverGradient
      : `linear-gradient(90deg, ${color} 0%, ${color} 100%)`,
    backgroundSize: '100% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'default',
  };

  const sweepGradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: shineOnHover ? 'default' : undefined,
  };

  return (
    <motion.span
      ref={rootRef}
      className={`shiny-text ${className}${shineOnHover ? ' shiny-text--hover' : ''}${useCursorShine ? ' shiny-text--follow' : ''}`}
      style={
        useCursorShine
          ? cursorGradientStyle
          : { ...sweepGradientStyle, backgroundPosition }
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerMove={handlePointerMove}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
