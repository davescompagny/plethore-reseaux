"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { useAsync } from "@/hooks/useAsync";
import { listDocuments } from "@/lib/services/mockDocumentService";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import type { DemoDocument } from "@/lib/types";

const KIND_LABELS: Record<string, string> = {
  recommandation: "Recommandation",
  support: "Support de formation",
  convention: "Convention",
  facture_demo: "Facture (démo)",
};

export default function DocumentsPage() {
  const { profileKind } = useDemoProfile();
  const { status, data, error } = useAsync(() => listDocuments(profileKind), [profileKind]);
  const [preview, setPreview] = useState<DemoDocument | null>(null);

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-extrabold">Documents</h1>

      {status === "loading" ? (
        <div className="grid gap-3">
          <SkeletonCard />
        </div>
      ) : status === "error" ? (
        <p className="text-red-700">{error}</p>
      ) : !data || data.length === 0 ? (
        <EmptyState icon={FileText} title="Aucun document" description="Vos documents apparaîtront ici dès qu'ils seront disponibles." />
      ) : (
        <div className="grid gap-3">
          {data.map((doc) => (
            <Card key={doc.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-ink">{doc.title}</p>
                <p className="text-xs text-muted">
                  {KIND_LABELS[doc.kind] ?? doc.kind} · {formatDate(doc.createdAt)}
                </p>
              </div>
              <Button variant="outline" size="md" onClick={() => setPreview(doc)}>
                Aperçu
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.title ?? "Document"}>
        <p className="text-sm text-muted">
          Ceci est un document de démonstration. Son contenu réel sera disponible une fois le portail connecté à
          votre espace Pléthore Réseaux.
        </p>
      </Modal>
    </div>
  );
}
