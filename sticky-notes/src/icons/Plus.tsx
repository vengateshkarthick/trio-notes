
function Plus({ size ="26"}) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        height={size}
        width={size}
        stroke="#ffffff"
        preserveAspectRatio="none"
        version="1.1"
        fill="none"
        // transform={showColors ? "rotate(45)" : "rotate(0"}
        strokeWidth="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    )
}

export default Plus;