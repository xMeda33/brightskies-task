type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-4",
};

export function Spinner({ size = "md", className = "" }: Props) {
  return (
    <span
      aria-label="Loading"
      className={[
        "inline-block animate-spin rounded-full border-gray-300 border-t-gray-900",
        sizeMap[size],
        className,
      ].join(" ")}
    />
  );
}
