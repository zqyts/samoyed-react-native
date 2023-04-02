import { useState, forwardRef, useImperativeHandle, memo } from "react";
import { PixelRatio, StyleSheet, Text, TextInput, View } from "react-native";
type IRNVerificationCodeInputProps = {
  inputSize?: number;
  label?: string;
  autoFocus?: boolean;
};
export type IRNVerificationCodeInputRefProps = {
  getCodeNum: () => string;
  setCodeNum: (str: string) => void;
};
const RNVerificationCodeInput = forwardRef<IRNVerificationCodeInputRefProps, IRNVerificationCodeInputProps>((props, ref) => {
  const { inputSize = 6, label, autoFocus = false } = props;
  const [textString, setTextString] = useState("");
  const textInputList = () => {
    let inputs = [];
    for (let i = 0; i < inputSize; i++) {
      inputs.push(
        <Text
          style={[
            styles.text,
            textString.length === i ? styles.focusText : null,
          ]}
          key={i + ""}
        >
          {textString[i]}
        </Text>
      );
    }
    return inputs;
  };
  // 子组件的值转发给父组件
  useImperativeHandle(
    ref,
    () => ({
      getCodeNum: () => {
        return textString;
      },
      setCodeNum: (str: string) => {
        setTextString(str);
      },
    }),
    [textString]
  );
  return (
    <View style={styles.verificationCodeInputBox}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textBox}>{textInputList()}</View>
      <TextInput
        style={styles.intextInputStyle}
        onChangeText={(text) => {
          setTextString(text);
        }}
        underlineColorAndroid="transparent"
        maxLength={inputSize}
        autoFocus={autoFocus}
        keyboardType="numeric"
        selectionColor="transparent"
      />
    </View>
  );
});

export default memo(RNVerificationCodeInput);

const styles = StyleSheet.create({
  verificationCodeInputBox: {
    paddingVertical: 25,
    backgroundColor: "#FFFFFF",
    position: "relative",
    paddingHorizontal: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#D0D0D1",
  },
  label: {
    fontSize: 15,
    color: "rgba(0,0,0,0.85)",
    paddingBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    height: 50,
    width: 40,
    lineHeight: 50,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.15)",
    color: "#333333",
    fontSize: 24,
    marginHorizontal: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  focusText: {
    borderColor: "#26B3A3",
  },
  intextInputStyle: {
    position: "absolute",
    fontSize: 28,
    width: "100%",
    top: 70,
    color: "transparent",
  },
});
