import { scenarios } from "@/lib/mock";
import ScenarioClient from "./ScenarioClient";

export function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ScenarioClient id={id} />;
}
