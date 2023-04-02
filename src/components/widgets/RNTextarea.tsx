import { TextareaItem, Toast } from '@ant-design/react-native';
import { TextareaItemProps } from '@ant-design/react-native/lib/textarea-item';
import { Control, Controller } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';

interface RNIProps extends TextareaItemProps {
  name: string;
  control: Control<any, any>;
  placeholder?: string;
  errors?: any;
  label?: string;
  onBlur?(val: string | undefined): void;
  onChange?(val: string | undefined): void;
  onExtraClick?: (event: GestureResponderEvent) => void;
}

export default function RNTextarea(props: RNIProps) {
  const { control, name, placeholder = '请输入内容', errors, label, ...rest } = props;
  const onShowErr = () => {
    Toast.fail(errors[name].message);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextareaItem
          placeholder={placeholder}
          value={value}
          error={errors ? !!errors[name] : undefined}
          {...rest}
          onBlur={onBlur}
          onChange={onChange}
          onErrorClick={onShowErr}
          autoHeight
          style={{ paddingHorizontal: 15, marginVertical: 10 }}
        >
          {label}
        </TextareaItem>
      )}
    />
  );
}
