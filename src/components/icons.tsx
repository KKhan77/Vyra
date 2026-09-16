import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
export function ArrowUpRight({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M5 19 19 5M5 5h14v14" /></svg>;
}
export function ArrowRight({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}
export function ArrowLeft({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M20 12H4m6-6-6 6 6 6" /></svg>;
}
export function Play({ size = 18, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="m9 5 11 7-11 7V5Z" /></svg>;
}
export function Plus({ size = 22, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M12 4v16M4 12h16" /></svg>;
}
export function Close({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="m6 6 12 12M6 18 18 6" /></svg>;
}
export function Check({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m5 12 4 4L19 6" /></svg>;
}
export function Upload({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5" /></svg>;
}
export function Spark({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}><path d="M16 0v32M0 16h32M4.7 4.7l22.6 22.6M4.7 27.3 27.3 4.7" /></svg>;
}
