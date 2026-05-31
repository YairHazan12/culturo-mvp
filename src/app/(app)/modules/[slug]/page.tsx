import { conceptModules } from "@/lib/mock";
import ConceptModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return conceptModules.map((m) => ({ slug: m.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ConceptModuleClient slug={slug} />;
}
