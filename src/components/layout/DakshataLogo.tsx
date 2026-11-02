import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'on-dark' | 'on-light';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  showTagline?: boolean;
  className?: string;
}

export const DakshataLogo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  // Size dimensions
  const dimensions = {
    sm: { icon: 26, text: 'text-xl', tag: 'text-[9px]' },
    md: { icon: 34, text: 'text-2xl', tag: 'text-[10px]' },
    lg: { icon: 44, text: 'text-3xl', tag: 'text-xs' },
    icon: { icon: 38, text: '', tag: '' },
  }[size];

  const isLightText = variant === 'dark' || variant === 'on-dark';

  return (
    <div className={`inline-flex items-center gap-2.5 font-serif select-none ${className}`}>
      {/* Symbolic D Motif with Diya / Lotus Spark */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="dakshataGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FACF6C" />
            <stop offset="50%" stopColor="#F2A31B" />
            <stop offset="100%" stopColor="#D9890C" />
          </linearGradient>
          <linearGradient id="dakshataIndigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D369D" />
            <stop offset="100%" stopColor="#2B1B5E" />
          </linearGradient>
        </defs>

        {/* Outer Circular Sacred Shield */}
        <circle cx="50" cy="50" r="46" stroke="url(#dakshataGoldGrad)" strokeWidth="3" strokeDasharray="3 3" opacity="0.65" />
        <circle cx="50" cy="50" r="42" fill={isLightText ? '#1A1438' : '#2B1B5E'} />

        {/* Stylized Classical 'D' Arch */}
        <path
          d="M32 24 H52 C65 24 74 34 74 50 C74 66 65 76 52 76 H32 V24 Z"
          fill="none"
          stroke="url(#dakshataGoldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Lotus Petal / Auspicious Diya Flame (The Spark of Skill) */}
        <path
          d="M50 36 C50 36 60 48 60 55 C60 60.5 55.5 65 50 65 C44.5 65 40 60.5 40 55 C40 48 50 36 50 36 Z"
          fill="url(#dakshataGoldGrad)"
        />

        {/* Golden Inner Light Core */}
        <ellipse cx="50" cy="55" rx="3.5" ry="5.5" fill="#FFF9E6" />
      </svg>

      {size !== 'icon' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight">
            <span
              className={`font-serif font-bold ${dimensions.text} ${
                isLightText ? 'text-white' : 'text-indigo-950 dark:text-white'
              }`}
            >
              Dakshata
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 ml-1 inline-block animate-pulse" />
          </div>
          {showTagline && (
            <span
              className={`font-sans tracking-widest uppercase font-semibold ${dimensions.tag} ${
                isLightText ? 'text-saffron-300' : 'text-saffron-600 dark:text-saffron-400'
              }`}
            >
              Skill is your power
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const TraditionalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center my-6 gap-3 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-saffron-400 to-indigo-900/30" />
    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-saffron-500 flex-shrink-0">
      <path
        d="M20 1 L24 6 L20 11 L16 6 Z M8 6 L12 6 M28 6 L32 6 M2 6 L4 6 M36 6 L38 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-saffron-400 to-indigo-900/30" />
  </div>
);

