"use client";

interface AvatarProps {
  src: string;
  alt?: string;
}

export default function Avatar({ src, alt = "User avatar" }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
    />
  );
}