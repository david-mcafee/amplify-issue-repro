import { useStyles } from "./styles";

const LoaderDemo = () => {
  const { container } = useStyles();

  return (
    <div className={container}>
      <p>loading</p>
    </div>
  );
};

export default LoaderDemo;
