import { FC, memo, useCallback } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
interface IRNPressable extends PressableProps {
  style?: StyleProp<ViewStyle>;
}
import { throttle } from "lodash";

const RNPressable: FC<IRNPressable> = memo(({ style, onPress, ...rest }) => {
  const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
  let throttleOnPress = undefined;
  if (typeof onPress === "function") {
    throttleOnPress = useCallback(
      throttle(onPress, 1000, { leading: true, trailing: false }),
      [onPress]
    );
  }
  return (
    <Pressable onPress={throttleOnPress} style={touchableStyle} {...rest} />
  );
});

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default RNPressable;
