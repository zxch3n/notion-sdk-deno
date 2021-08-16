import type { Await } from "./type-utils.ts";
export interface NodeRequestInit {
  // whatwg/fetch standard options
  body?: BodyInit | undefined;
  headers?: HeadersInit | undefined;
  method?: string | undefined;
  redirect?: RequestRedirect | undefined;
  signal?: AbortSignal | null | undefined;

  // node-fetch extensions
  agent?: Agent | ((parsedUrl: URL) => Agent) | undefined; // =null http.Agent instance, allows custom proxy, certificate etc.
  compress?: boolean | undefined; // =true support gzip/deflate content encoding. false to disable
  follow?: number | undefined; // =20 maximum redirect count. 0 to not follow redirect
  size?: number | undefined; // =0 maximum response body size in bytes. 0 to disable
  timeout?: number | undefined; // =0 req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)

  // node-fetch does not support mode, cache or credentials options
}

type Agent = any;
type FetchFn = typeof fetch;
type FetchResponse = Await<ReturnType<FetchFn>>;
type RequestInit = NonNullable<Parameters<FetchFn>[1]>;

export type SupportedRequestInfo = string;
export type SupportedRequestInit = {
  agent?: Agent;
  body?: NonNullable<RequestInit["body"]> &
    NonNullable<NodeRequestInit["body"]>;
  headers?: NonNullable<RequestInit["headers"]> &
    NonNullable<NodeRequestInit["headers"]>;
  method?: RequestInit["method"];
  redirect?: RequestInit["redirect"];
};
export type SupportedResponse = FetchResponse;

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>;
