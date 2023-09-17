import { FC, memo } from 'react';

interface ExampleProps {
  title: string;
}
const Example: FC<ExampleProps> = memo((props) => {
  const { title } = props;
  return <div>{title}</div>;
});
Example.defaultProps = {
  title: 'title',
};
export default Example;
