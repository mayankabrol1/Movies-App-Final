import { Pressable, Text } from "react-native";
import { twMerge } from "tailwind-merge";

const AppButton = ({ className = "", children, disabled, variant = "primary", ...props }) => {
  let variantClasses = "bg-blue-600 border-blue-600";
  let textColor = "#ffffff";
  if (variant === "secondary") {
    variantClasses = "bg-gray-100 border-gray-300";
    textColor = "#111827";
  } else if (variant === "danger") {
    variantClasses = "bg-red-100 border-red-300";
    textColor = "#111827";
  } else if (variant === "info") {
    variantClasses = "bg-blue-100 border-blue-300";
    textColor = "#1d4ed8";
  }
  return (
    <Pressable
      className={twMerge(
        `w-full px-4 py-4 border ${variantClasses} ${disabled ? "opacity-60" : ""} rounded mb-2 text-center items-center justify-center gap-2`,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {typeof children === "string" ? <Text style={{ color: textColor, fontWeight: "600" }}>{children}</Text> : children}
    </Pressable>
  );
};

export default AppButton;


