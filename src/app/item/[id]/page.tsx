import { notFound } from "next/navigation";
import { getItemById } from "@/lib/catalog";
import { ItemDetailTemplate } from "@/components/templates/ItemDetailTemplate/ItemDetailTemplate";

type Props = { params: Promise<{ id: string }> };

export default async function ItemDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();
  return <ItemDetailTemplate item={item} />;
}
