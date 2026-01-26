export default function Card({ children, className = '' }) {
  return (
    <div className={`pet-card ${className}`}>
      {children}
    </div>
  );
}
