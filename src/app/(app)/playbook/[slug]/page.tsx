import { playbook } from "@/lib/mock";
import PlaybookModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return playbook.map((m) => ({ slug: m.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PlaybookModuleClient slug={slug} />;
}
