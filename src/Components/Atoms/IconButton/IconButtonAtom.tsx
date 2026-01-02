// import * as React from "react";

// interface IconButtonAtomProps {
//   src?: string;
//   alt?: string;
//   icon?: React.ReactNode;
//   onClick: () => void;
//   disabled?: boolean;
//   className?: string;
//   imgClassName?: string;
//   label?: string;
// }

// const IconButtonAtom: React.FC<IconButtonAtomProps> = ({
//   src,
//   alt,
//   icon,
//   onClick,
//   disabled = false,
//   className = "",
//   imgClassName = "",
//   label = "",
// }) => {
//   return (
//     <button
//       className={`inline-flex items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//       type="button"
//     >
//       {icon ? (
//         <span className={imgClassName}>{icon}</span>
//       ) : src ? (
//         <img src={src} alt={alt} className={imgClassName} />
//       ) : null}
//       {label && <span className="ml-2 text-sm font-medium">{label}</span>}
//     </button>
//   );
// };

// export default IconButtonAtom;
