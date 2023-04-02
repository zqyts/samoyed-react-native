import { Icon, Result } from '@ant-design/react-native';
import { ReactNode } from 'react';

interface IRNResult {
  title?: string;
  message: string;
  img?: ReactNode;
}
export default function RNEmptyData({ title, message }: IRNResult) {
  return (
    <Result
      img={<Icon name='search' size='lg' />}
      title={title}
      message={message}
      // buttonText='完成'
      // buttonType='primary'
      // onButtonClick={(e: any) => alert(e.toString())}
    />
  );
}
