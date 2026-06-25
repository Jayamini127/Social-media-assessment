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
bg-purple-600
hover:bg-purple-700
transition
text-white
font-medium
"
    >
      {children}
    </button>
  );
}