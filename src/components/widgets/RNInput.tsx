import { InputItem, Toast, Flex } from "@ant-design/react-native";
import { InputItemPropsType } from "@ant-design/react-native/lib/input-item/PropsType";
import { Control, Controller } from "react-hook-form";
import {
  GestureResponderEvent,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

interface IRNProps extends InputItemPropsType {
  name: string;
  control: Control<any, any>;
  placeholder?: string;
  errors?: any;
  label?: string;
  required?: boolean;
  onBlur?(val: string | undefined): void;
  onChange?(val: string | undefined): void;
  onExtraClick?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export default function RNInput(props: IRNProps) {
  const {
    control,
    name,
    placeholder = "请输入内容",
    errors,
    label,
    required,
    ...rest
  } = props;
  const onShowErr = () => {
    Toast.fail(errors[name].message);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <InputItem
            placeholder={
              rest.editable || rest.editable === undefined
                ? placeholder || "请输入内容"
                : ""
            }
            value={typeof value === "number" ? value.toString() : value}
            error={!!errors[name]}
            onBlur={onBlur}
            onChange={onChange}
            onErrorClick={onShowErr}
            {...rest}
            style={[styles.labelText, rest.style ? rest.style : null]}
            // clear={true}
          >
            {label ? (
              <Flex>
                {required ? (
                  <Text style={{ color: "rgb(255, 85, 0)" }}>*</Text>
                ) : null}
                <Text style={styles.labelText}>{label}</Text>
              </Flex>
            ) : null}
          </InputItem>
          {/* {errors[name] && <Text style={styles.errText}>{errors[name].message}</Text>} */}
        </>
      )}
    />
  );
}
const styles = StyleSheet.create({
  errText: {
    color: "rgb(255, 85, 0)",
    paddingLeft: 15,
    paddingVertical: 5,
    fontSize: 12,
  },
  labelText: {
    fontSize: 16,
  },
});
