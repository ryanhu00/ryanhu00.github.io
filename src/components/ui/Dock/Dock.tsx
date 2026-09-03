import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import './Dock.css';

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
  orientation?: 'horizontal' | 'vertical';
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mousePos: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  label?: string;
  orientation: 'horizontal' | 'vertical';
};

function DockItem({
  children,
  className = '',
  onClick,
  mousePos,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  orientation,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mousePos, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    if (orientation === 'vertical') {
      return val - rect.y - rect.height / 2;
    }
    return val - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child as React.ReactElement<{
                isHovered?: MotionValue<number>;
                orientation?: 'horizontal' | 'vertical';
              }>,
              { isHovered, orientation }
            )
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  orientation?: 'horizontal' | 'vertical';
};

function DockLabel({
  children,
  className = '',
  isHovered,
  orientation = 'horizontal',
}: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const isVertical = orientation === 'vertical';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            x: isVertical ? 0 : '-50%',
            y: isVertical ? '-50%' : 0,
          }}
          animate={{
            opacity: 1,
            x: isVertical ? 8 : '-50%',
            y: isVertical ? '-50%' : -10,
          }}
          exit={{
            opacity: 0,
            x: isVertical ? 0 : '-50%',
            y: isVertical ? '-50%' : 0,
          }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${isVertical ? 'dock-label--vertical' : ''} ${className}`.trim()}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  orientation?: 'horizontal' | 'vertical';
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 140,
  baseItemSize = 50,
  orientation = 'horizontal',
}: DockProps) {
  const mousePos = useMotionValue(Infinity);

  return (
    <div className={`dock-outer dock-outer--${orientation}`}>
      <div
        onMouseMove={(event) => {
          mousePos.set(orientation === 'vertical' ? event.pageY : event.pageX);
        }}
        onMouseLeave={() => {
          mousePos.set(Infinity);
        }}
        className={`dock-panel dock-panel--${orientation} ${className}`.trim()}
        role="toolbar"
        aria-label="Social links"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mousePos={mousePos}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            orientation={orientation}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel orientation={orientation}>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
