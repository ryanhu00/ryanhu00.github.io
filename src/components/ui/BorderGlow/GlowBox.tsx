import React, { type ReactNode } from 'react';
import BorderGlow from './BorderGlow';
import { useTheme } from '../../layout/theme';

/** Purple, orange, baby blue — site accent mesh for BorderGlow */
export const GLOW_COLORS = ['#bb80e0', '#e87a2f', '#89CFF0'];
/** Richer accents for light mode (more chroma against white) */
export const GLOW_COLORS_LIGHT = ['#9b4fd6', '#d96512', '#4aa8d8'];
/** Soft purple HSL edge light */
export const GLOW_EDGE = '277 58 69';
export const GLOW_EDGE_LIGHT = '277 72 48';

type GlowBoxProps = {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
  glowRadius?: number;
  fillOpacity?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
};

const GlowBox: React.FC<GlowBoxProps> = ({
  children,
  className = '',
  borderRadius = 20,
  glowRadius = 28,
  fillOpacity,
  backgroundColor,
  style,
}) => {
  const { isDarkMode } = useTheme();
  const resolvedBackground =
    backgroundColor ??
    (isDarkMode ? 'rgba(20, 18, 14, 0.92)' : 'rgba(255, 255, 255, 0.96)');

  return (
    <BorderGlow
      className={className}
      colors={isDarkMode ? GLOW_COLORS : GLOW_COLORS_LIGHT}
      glowColor={isDarkMode ? GLOW_EDGE : GLOW_EDGE_LIGHT}
      backgroundColor={resolvedBackground}
      borderRadius={borderRadius}
      glowRadius={isDarkMode ? glowRadius : glowRadius + 6}
      glowIntensity={isDarkMode ? 1.05 : 1.35}
      coneSpread={isDarkMode ? 22 : 28}
      edgeSensitivity={isDarkMode ? 26 : 18}
      fillOpacity={fillOpacity ?? (isDarkMode ? 0.42 : 0.62)}
      lightSurface={!isDarkMode}
      style={style}
    >
      {children}
    </BorderGlow>
  );
};

export default GlowBox;
