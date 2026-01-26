import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import axios from "axios";

type HttpRequestData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError('HTTP Request node requires an "endpoint"');
  }

  const result = await step.run("http-request", async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options = {
      method: method,
      data: undefined as unknown,
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (data.body) {
        options.data = data.body;
      }
    }

    const response = await axios(endpoint, {
      method,
      data: options.data,
      responseType: "json",
    });

    const contentType = response.headers["content-type"] || "";

    if (contentType && !contentType.includes("application/json")) {
      throw new NonRetriableError(
        `HTTP Request node expected JSON response but received "${contentType}"`,
      );
    }

    if (typeof response.data !== "object" || response.data === null) {
      throw new NonRetriableError(
        `HTTP Request node expected JSON but received ${typeof response.data}`,
      );
    }

    return {
      ...context,
      httpResponse: {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      },
    };
  });

  return result;
};
