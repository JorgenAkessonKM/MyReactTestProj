import React from "react";
import One from "./DynamicComonents/one";
import Two from "./DynamicComonents/two";

export type Block = {
  component: string;
  id: string | number;
  [key: string]: unknown;
};

type DynamicComponentProps = {
  block: Block;
};

const componentRegistry: Record<
  string,
  React.ComponentType<{ block: Block }>
> = {
  one: One,
  two: Two,
};

export default function DynamicComponent({ block }: DynamicComponentProps) {
  const Component = componentRegistry[block.component];

  if (!Component) {
    return React.createElement(
      "div",
      null,
      `The component "${block.component}" has not been created yet.`,
    );
  }

  return React.createElement(Component, { block });
}
