// import * as React from "react";

// interface ButtonAtomProps {
//     label: string
//     onClick: () => void
//     disabled?: boolean
//     className?: string
// }


// const ButtonAtom : React.FC<ButtonAtomProps> = ({
//     label,
//     onClick,
//     disabled = false,
//     className = "",
// }) => {
//     return (
//         <button
//             className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
//             onClick={onClick}
//             disabled={disabled}
//         >
//             {label}
//         </button>
//     )
// }

// export default ButtonAtom