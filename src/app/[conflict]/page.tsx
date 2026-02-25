import { notFound } from "next/navigation";
import { getConflict, getAllConflictIds, getAllConflicts } from "@/lib/conflicts";
import ConflictTimeline from "@/components/ConflictTimeline";

export function generateStaticParams() {
  return getAllConflictIds().map((id) => ({ conflict: id }));
}

export default async function ConflictPage({
  params,
}: {
  params: Promise<{ conflict: string }>;
}) {
  const { conflict: conflictId } = await params;
  const conflictData = getConflict(conflictId);

  if (!conflictData) {
    notFound();
  }

  const { meta, beats } = conflictData;
  const allConflicts = getAllConflicts();

  return (
    <ConflictTimeline
      meta={meta}
      beats={beats}
      conflictId={conflictId}
      allConflicts={allConflicts}
    />
  );
}
