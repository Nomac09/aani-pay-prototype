interface Props {
  className?: string;
}

export default function EstaWordmark({ className = "h-7" }: Props) {
  return (
    <svg
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Example Utilities"
    >
      {/* Gold E mark */}
      <rect x="0" y="6" width="14" height="3" rx="1.5" fill="#B89A6A" />
      <rect x="0" y="14.5" width="11" height="3" rx="1.5" fill="#B89A6A" />
      <rect x="0" y="23" width="14" height="3" rx="1.5" fill="#B89A6A" />
      <rect x="0" y="6" width="3" height="20" rx="1.5" fill="#B89A6A" />
      {/* Wordmark */}
      <text
        x="22"
        y="23"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="600"
        letterSpacing="-0.3"
        fill="#0A0E0F"
      >
        example
      </text>
      <text
        x="86"
        y="23"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="400"
        letterSpacing="0.5"
        fill="#5C6566"
      >
        UTILITIES
      </text>
    </svg>
  );
}
