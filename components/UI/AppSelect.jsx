import { Animated, Dimensions, Keyboard, Modal, PanResponder, Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

export default function AppSelect({
  label,
  modalTitle,
  value,
  options = [],
  placeholder = "Select...",
  onChange,
  errorText,
  hasError = false,
  labelClassName = "",
  className = "",
  sheetHeightRatio = 0.28,
  showRequired = false,
}) {
  const [open, setOpen] = useState(false);

  const sheetHeight = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return Math.max(200, Math.round(windowHeight * sheetHeightRatio));
  }, [sheetHeightRatio]);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!open) return;
    overlayOpacity.setValue(0);
    sheetTranslateY.setValue(sheetHeight);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, overlayOpacity, sheetHeight, sheetTranslateY]);

  const closeModal = () => {
    if (!open) return;
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: sheetHeight,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(false));
  };

  const handlePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 4,
      onMoveShouldSetPanResponderCapture: (_, gesture) => Math.abs(gesture.dy) > 4,
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 30) {
          closeModal();
        }
      },
    })
  ).current;

  const selectedLabel = useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found?.label || "";
  }, [options, value]);

  return (
    <View className={twMerge("w-full", className)}>
      {!!label && (
        <Text className={twMerge("text-sm font-medium text-gray-800 mb-1", labelClassName)}>
          {label}
          {showRequired ? <Text className="text-red-500">*</Text> : null}
        </Text>
      )}

      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setOpen(true);
        }}
        className={twMerge(
          "w-full px-4 py-3 border rounded-lg bg-white flex-row items-center justify-between",
          hasError || errorText ? "border-red-500" : "border-gray-300"
        )}
      >
        <Text style={{ color: selectedLabel ? "#111827" : "#6b7280" }}>
          {selectedLabel || placeholder}
        </Text>
        <FontAwesome name="chevron-down" size={16} color="#6b7280" />
      </Pressable>

      {!!errorText && <Text className="text-red-500 mt-1">{errorText}</Text>}

      <Modal visible={open} transparent animationType="none" onRequestClose={closeModal}>
        <View className="flex-1 justify-end">
          <Animated.View
            className="absolute inset-0 bg-black/60"
            style={{ opacity: overlayOpacity }}
          />
          <Pressable onPress={closeModal} className="absolute inset-0" />
          <Animated.View
            className="w-full bg-white rounded-t-2xl px-4 pt-3 pb-[25px]"
            style={{ height: sheetHeight, transform: [{ translateY: sheetTranslateY }] }}
          >
            <View
              className="mb-3"
              {...handlePanResponder.panHandlers}
              hitSlop={{ top: 16, bottom: 16, left: 24, right: 24 }}
            >
              <Pressable onPress={closeModal}>
                <View className="items-center mb-2">
                  <View className="h-1 w-12 rounded-full bg-gray-300" />
                </View>
                <Text className="text-base font-semibold text-gray-900">
                  {modalTitle || label || "Select"}
                </Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 8 }}>
              {options.map((opt, index) => (
                <Pressable
                  key={`${String(opt.value)}-${String(opt.label)}-${index}`}
                  onPress={() => {
                    onChange?.(opt.value);
                    closeModal();
                  }}
                  className={twMerge(
                    "py-3 flex-row items-center justify-between px-3",
                    opt.value === value ? "bg-green-700 rounded-lg" : ""
                  )}
                >
                  <Text
                    className={twMerge(
                      "text-gray-900",
                      opt.value === value ? "text-white font-semibold" : ""
                    )}
                  >
                    {opt.label}
                  </Text>
                  {opt.value === value && <FontAwesome name="check" size={16} color="#ffffff" />}
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}


