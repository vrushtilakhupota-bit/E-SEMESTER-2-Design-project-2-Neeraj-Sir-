export default function Logo({ size = 80 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <text x="6" y="52" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="48" fill="#E91E8C">S</text>
        <text x="34" y="52" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="32" fill="#B8962E">H</text>
        <text x="8" y="68" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="11" letterSpacing="3" fill="#888">SAFE HER</text>
      </svg>
    </div>
  );
}
