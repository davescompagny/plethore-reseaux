"use client";

import Link from "next/link";
import { Briefcase, MapPin, Sparkles, Image as ImageIcon } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { getProfile } from "@/lib/services/mockProfileService";
import { listRequests } from "@/lib/services/mockRequestService";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InfoCard } from "@/components/portal/InfoCard";
import { DemoBadge } from "@/components/ui/Tag";
import { SkeletonCard } from "@/components/ui/Skeleton";
import type { BarberProfile } from "@/lib/types";

export function BarberDashboard() {
  const profileState = useAsync(() => getProfile("barber"), []);
  const requestsState = useAsync(() => listRequests("barber"), []);

  if (profileState.status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  if (profileState.status === "error" || !profileState.data) {
    return <p className="text-red-700">{profileState.error}</p>;
  }

  const profile = profileState.data as BarberProfile;

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-muted">Profil barber</p>
        <h1 className="mb-4 text-xl font-extrabold">{profile.status} · {profile.experienceYears} ans d&apos;expérience</h1>
        <ProgressBar value={profile.profileCompletion} label="Profil complété" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={Sparkles} title="Compétences">
          <div className="flex flex-wrap gap-1.5">
            {profile.specialties.map((s) => (
              <span key={s} className="rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-ink">
                {s}
              </span>
            ))}
          </div>
        </InfoCard>
        <InfoCard icon={MapPin} title="Zone d'intervention">
          {profile.interventionArea}
        </InfoCard>
        <InfoCard icon={Briefcase} title="Disponibilités">
          {profile.availability}
        </InfoCard>
      </div>

      <InfoCard icon={ImageIcon} title="Aperçu du portfolio">
        {profile.portfolioUrl ? (
          <a href={profile.portfolioUrl} className="font-semibold text-bronze hover:underline" target="_blank" rel="noopener noreferrer">
            {profile.portfolioUrl}
          </a>
        ) : (
          "Aucun portfolio renseigné pour le moment."
        )}
      </InfoCard>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <h2 className="font-bold text-ink">Propositions</h2>
          <DemoBadge />
        </div>
        <div className="grid gap-2.5">
          {(requestsState.data ?? []).map((req) => (
            <div key={req.id} className="rounded-lg border border-line bg-surface p-4">
              <p className="font-bold text-ink">{req.label}</p>
              <p className="text-sm text-muted">{req.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/demo/espace/profil"
        className="focus-ring inline-flex w-fit min-h-11 items-center justify-center rounded-lg bg-bronze px-5 font-bold text-white hover:bg-bronze-strong"
      >
        Compléter mon profil
      </Link>
    </div>
  );
}
