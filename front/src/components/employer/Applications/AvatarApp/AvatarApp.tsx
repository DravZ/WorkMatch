import React from 'react';

interface AvatarProps {
  initials: string;
  size?: number;
  bgColor?: string;
}

export const AvatarApp: React.FC<AvatarProps> = ({
  initials,
  size = 48,
  bgColor = '#0f172a',
}) => {
  return (
    <div
      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        fontSize: `${size * 0.38}px`,
      }}
    >
      {initials}
    </div>
  );
};