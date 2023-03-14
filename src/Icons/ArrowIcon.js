export default function ArrowIcon({ right }) {
  return (
    <svg
      className={`pagination__arrow ${right ? 'pagination__arrow--right' : ''}`}
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></path>
    </svg>
  );
}
