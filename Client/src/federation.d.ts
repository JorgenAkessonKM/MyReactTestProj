declare module "virtual:__federation__" {
  interface IRemoteConfig {
    url: string;
    format: "esm" | "systemjs" | "var";
    from: "vite" | "webpack";
  }

  export function __federation_method_setRemote(
    name: string,
    config: IRemoteConfig,
  ): void;

  export function __federation_method_getRemote(
    remoteName: string,
    exposedPath: string,
  ): Promise<unknown>;

  export function __federation_method_unwrapDefault(
    module: unknown,
  ): Promise<unknown> | unknown;
}
