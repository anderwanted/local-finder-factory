export default function Card({ children, className = '' }) {
  return (
    <div className={`card card-padding ${className}`}>
      {children}
    </div>
  );
}
