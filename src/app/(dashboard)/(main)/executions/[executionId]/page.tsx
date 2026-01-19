interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { executionId } = await params;

  return <div>Execution ID: {executionId}</div>;
}
