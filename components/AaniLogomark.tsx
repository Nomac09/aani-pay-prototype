interface Props {
  size?: number;
  className?: string;
}

export default function AaniLogomark({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Interlocking circles motif */}
      <circle cx="8.5" cy="12" r="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <circle cx="15.5" cy="12" r="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      {/* Intersection highlight */}
      <path
        d="M12 7.27a6 6 0 0 1 0 9.46A6 6 0 0 1 12 7.27Z"
        fill="rgba(255,255,255,0.35)"
      />
    </svg>
  );
}
