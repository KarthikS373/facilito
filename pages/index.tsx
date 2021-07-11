// TIPOS
import { NextPage, GetServerSideProps } from "next";

// PAGE PROPS
interface IndexProps {
  text: string;
}

// PAGE
const index: NextPage<IndexProps> = (props: IndexProps) => {
  return <div>{props.text}</div>;
};

// SSR
export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const test: IndexProps = { text: "SSR Text" };
  return { props: test };
};

export default index;
