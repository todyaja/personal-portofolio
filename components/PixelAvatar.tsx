import Image from "next/image";

interface PixelAvatarProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  priority?: boolean;
}

const SIZE_MAP = { sm: 64, md: 128, lg: 192 } as const;

// Tiny blurred placeholder for progressive loading
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/EAH//2Q==";

export default function PixelAvatar({
  size = "md",
  animated = false,
  priority = false,
}: PixelAvatarProps) {
  const px = SIZE_MAP[size];
  const classes = [
    "pixel-avatar",
    `pixel-avatar-${size}`,
    "pixel-border",
    animated ? "pixel-avatar-animated" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="img" aria-label="Profile photo">
      <Image
        src="/assets/profile/pfp.jpeg"
        alt="Tody Prasetya pixel avatar"
        width={px}
        height={px}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        quality={85}
      />
    </div>
  );
}
