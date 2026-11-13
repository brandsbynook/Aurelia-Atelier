import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Serein Dermal & Hair Studio',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAEEF0] via-[#F4F6F7] to-[#DCE2E5] text-[#525C62] p-6 text-center ${className}`}
      >
        <Sparkles className="w-6 h-6 text-[#2A5C63] mb-2" strokeWidth={1.5} />
        <span className="text-base font-semibold tracking-tight text-[#121517]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
