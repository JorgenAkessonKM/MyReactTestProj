import type { Block } from "../components";

type OneProps = {
  block: Block;
};

function One({ block }: OneProps) {
  return (
    <>
      <h1>{block.Name as string}</h1>
    </>
  );
}

export default One;
