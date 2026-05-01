import { useState, useEffect } from 'react';
import { TEA_START, CUPS_PER_DAY } from './timelineData';

// #region Graph geometry
export function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 480);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 480);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

export function getLaneW(mobile: boolean) { return mobile ? 24 : 36; }
export function getSvgW(mobile: boolean)  { return getLaneW(mobile) * 2 + 20; }
export function laneX(lane: number, laneW: number) { return 14 + lane * laneW; }
export function shortSha(sha: string) { return sha.slice(0, 7); }
// #endregion

// #region Tea count
export function teaCupsNow() {
  const days = Math.floor((Date.now() - TEA_START.getTime()) / 86_400_000);
  return Math.max(0, days * CUPS_PER_DAY);
}
// #endregion
