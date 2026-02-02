import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import axios from "axios";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";

type HttpRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

Handlebars.registerHelper("json", function (context) {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    }),
  );

  if (!data.endpoint) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError('HTTP Request node requires an "endpoint"');
  }

  if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(data.method)) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(
      `HTTP Request node has invalid "method": ${data.method}`,
    );
  }

  if (!data.variableName) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(
      'HTTP Request node requires a "variableName" to store the response',
    );
  }

  try {
    const result = await step.run("http-request", async () => {
      const endpoint = Handlebars.compile(data.endpoint)(context);
      const method = data.method;

      const options = {
        method: method,
        data: undefined as unknown,
        headers: undefined as Record<string, string> | undefined,
        body: undefined as unknown,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && data.body) {
        const resolved = Handlebars.compile(
          typeof data.body === "string" ? data.body : JSON.stringify(data.body),
        )(context);

        const parsedBody = JSON.parse(resolved);

        options.data = parsedBody;
        options.headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };
      }

      const response = await axios(endpoint, {
        method,
        data: options.data,
        headers: options.headers,
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

      const responsePayload = {
        httpResponse: {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        },
      };

      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    });

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      }),
    );

    return result;
  } catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );

    throw error;
  }
};
