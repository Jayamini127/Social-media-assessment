interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
px-4
py-2
rounded-xl
bg-[var(--primary)]
hover:bg-[var(--primary-hover)]
transition
text-[var(--primary-foreground)]
font-medium
"
    >
      {children}
    </button>
  );
}