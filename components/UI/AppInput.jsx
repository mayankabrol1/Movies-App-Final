import { TextInput } from "react-native";
import { twMerge } from "tailwind-merge";

const AppInput = ({ className = "", ...props }) => {
  return (
    <TextInput
      className={twMerge(
        "w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 bg-white placeholder:text-gray-500",
        className
      )}
      autoCapitalize="none"
      {...props}
    />
  );
};

export default AppInput;


