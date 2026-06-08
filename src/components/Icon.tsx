import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, className, size }) => {
  switch (name) {
    case 'chevron-down':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
        </svg>
      );
    case 'mail-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          <path d="M112 160l144 112 144-112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    case 'phone-portrait-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <rect x="128" y="16" width="256" height="480" rx="48" ry="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          <path d="M176 16h160M160 432h192M256 384h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    case 'calendar-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <rect x="48" y="80" width="416" height="384" rx="48" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/>
          <path d="M128 48v32M384 48v32M464 160H48M304 260h32v32h-32zm-80 0h32v32h-32zm-80 0h32v32h-32zm240 80h32v32h-32zm-80 0h32v32h-32zm-80 0h32v32h-32zm-80 0h32v32h-32zm240 80h32v32h-32zm-80 0h32v32h-32zm-80 0h32v32h-32zm-80 0h32v32h-32z" fill="currentColor"/>
        </svg>
      );
    case 'location-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M256 48c-79.5 0-144 61.39-144 137 0 87 144 279 144 279s144-192 144-279c0-75.61-64.5-137-144-137z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    case 'logo-facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.5 17.26-36.5 35v42h62.12l-9.93 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fillRule="evenodd"/>
        </svg>
      );
    case 'logo-twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.58 43.4-98.58 96.9a93.94 93.94 0 002.56 22 282.91 282.91 0 01-203.8-101.6 94.74 94.74 0 00-13.41 48.7c0 33.6 17.2 63.3 43.3 80.4a99.64 99.64 0 01-44.7-12.2v1.2c0 47 34 86.1 79 94.8a100.67 100.67 0 01-44.5 1.7c12.5 38.3 48.5 66.2 91 67a200.15 200.15 0 01-122.2 41.6 196.17 196.17 0 01-23.5-1.4A280.06 280.06 0 00148.81 448c181.9 0 281.3-148.1 281.3-276.5 0-4.2-.1-8.4-.3-12.5A198.8 198.8 0 00496 109.5z"/>
        </svg>
      );
    case 'logo-instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M349.37 68H162.63C110.44 68 68 110.44 68 162.63v186.75C68 401.56 110.44 444 162.63 444h186.75C401.56 444 444 401.56 444 349.37V162.63C444 110.44 401.56 68 349.37 68zM256 348c-50.72 0-92-41.28-92-92s41.28-92 92-92 92 41.28 92 92-41.28 92-92 92zm112-180a24 24 0 1124-24 24 24 0 01-24 24z"/>
          <circle cx="256" cy="256" r="64"/>
        </svg>
      );
    case 'logo-github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M256 32C132.3 32 32 134.8 32 261.7c0 101.5 64.2 187.5 153.2 217.9 11.2 2 15.3-5 15.3-11.1 0-5.5-.2-19.9-.3-39.1-62.3 13.9-75.5-30.8-75.5-30.8-10.2-26.5-24.9-33.6-24.9-33.6-20.3-14.3 1.5-14 1.5-14 22.5 1.6 34.3 23.7 34.3 23.7 20 35.1 52.4 25 65.2 19.1 2-14.8 7.8-25 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 18.8-6.2 61.6 23.5 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 42.8-29.7 61.5-23.5 61.5-23.5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 6.1 4 13.3 15.4 11C415.9 449.1 480 363.1 480 261.7 480 134.8 379.7 32 256 32z"/>
        </svg>
      );
    case 'logo-linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M444.17 32H67.83C48.04 32 32 48.04 32 67.83v376.34C32 463.96 48.04 480 67.83 480h376.34c19.79 0 35.83-16.04 35.83-35.83V67.83C480 48.04 463.96 32 444.17 32zM170.87 405.43h-70.5V178.2h70.5v227.23zM135.62 147.27c-22.58 0-40.87-18.3-40.87-40.88 0-22.59 18.3-40.88 40.87-40.88 22.59 0 40.88 18.3 40.88 40.88 0 22.58-18.3 40.88-40.88 40.88zm305.43 258.16h-70.5V294.62c0-26.43-.48-60.43-36.83-60.43-36.87 0-42.52 28.81-42.52 58.52v112.72h-70.5V178.2h67.67v31.02h.96c9.43-17.87 32.48-36.72 66.88-36.72 71.54 0 84.79 47.09 84.79 108.31v124.62z"/>
        </svg>
      );
    case 'logo-kaggle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M103.3 32v448h54.7V311.4L325.2 480h78.2L244.3 268 394 32h-75.1L170.8 198.7V32h-67.5z"/>
        </svg>
      );
    case 'logo-leetcode':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width={size} height={size} fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.411L7.11 5.826a1.374 1.374 0 0 0-.012 1.939L12.2 12.9a1.374 1.374 0 0 0 1.947-.026l5.42-5.42a1.374 1.374 0 0 0-.012-1.939L14.453.411A1.374 1.374 0 0 0 13.483 0zm-.088 1.91l4.47 4.47-4.47 4.47-4.47-4.47zM3.483 10.024a1.374 1.374 0 0 0-.961.411L.411 12.547a1.374 1.374 0 0 0 0 1.939l7.059 7.059a1.374 1.374 0 0 0 1.939 0l7.059-7.059a1.374 1.374 0 0 0 0-1.939l-2.112-2.112a1.374 1.374 0 0 0-1.939 0l-4.47 4.47-4.47-4.47a1.374 1.374 0 0 0-.961-.411zm.088 1.91l4.47 4.47-4.47 4.47-4.47-4.47z"/>
        </svg>
      );
    case 'close-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M368 368L144 144M368 144L144 368"/>
        </svg>
      );
    case 'book-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M256 160v288M256 160c-35-10-80-20-120-20H64v288h72c40 0 88 18 120 32M256 160c35-10 80-20 120-20h72v288-72c-40 0-88 18-120 32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    case 'eye-outline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M256 80c-112 0-208 80-256 176 48 96 144 176 256 176s208-80 256-176C464 160 368 80 256 80z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    case 'paper-plane':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width={size} height={size} fill="currentColor">
          <path d="M473 39.05a24 24 0 00-24.5-5.83l-419 146.9a24 24 0 00-3.37 45.16l172.9 83.1 83.1 172.9a24 24 0 0045.16-3.37l146.9-419a24 24 0 00-5.83-24.5zM358.57 153.43L205.15 306.85M358.57 153.43v102.43M358.57 153.43H256.14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
        </svg>
      );
    default:
      return null;
  }
};
