import { Connection, Node } from "@/generated/prisma/client";
import toposort from "toposort";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[],
): Node[] => {
  if (connections.length === 0) {
    return nodes;
  }

  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  const connectionNodeIds = new Set<string>();
  for (const conn of connections) {
    connectionNodeIds.add(conn.fromNodeId);
    connectionNodeIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectionNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("The workflow contains cyclic dependencies.");
    }
    throw error;
  }

  const nodeMap: Map<string, Node> = new Map(
    nodes.map((node) => [node.id, node]),
  );
  return sortedNodeIds.map((nodeId) => nodeMap.get(nodeId)!).filter(Boolean);
};
