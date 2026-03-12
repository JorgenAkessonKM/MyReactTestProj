import type { Block } from "../components";

type Props = {
  block: Block;
};

function Two({ block }: Props) {
  return (
    <>
      <h1>{block.Name as string}</h1>
    </>
  );
}

export default Two;
