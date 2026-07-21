"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, TrendingUp } from "lucide-react";
import { Field, TextInput, CheckboxCard, RadioCard } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/ProgressBar";
import { diagnosticSchema, type DiagnosticFormValues } from "@/lib/validations";
import { submitDiagnostic } from "@/lib/services/mockDiagnosticService";
import type { DiagnosticResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Coupe homme classique",
  "Shampoing",
  "Coloration",
  "Brushing",
  "Skin fade",
  "Taper fade",
  "Barbe",
  "Dégradés afro",
];

const DIFFICULTY_OPTIONS = [
  "Manque de temps pratique",
  "Manque de matériel",
  "Manque de confiance de l'équipe",
  "Communication et visibilité insuffisantes",
  "Peu de demande observée pour l'instant",
];

const GOAL_OPTIONS = [
  "Ajouter des prestations barber",
  "Améliorer la communication réseaux sociaux",
  "Monter l'équipe en compétence",
  "Structurer un plan de lancement",
];

const STEP_TITLES = [
  "Votre salon",
  "Votre équipe",
  "Prestations actuelles",
  "Demande observée",
  "Difficultés rencontrées",
  "Objectifs prioritaires",
  "Disponibilités",
  "Récapitulatif",
];

const STEP_FIELDS: (keyof DiagnosticFormValues)[][] = [
  ["salonName", "city"],
  ["teamSize"],
  ["currentServices"],
  ["observedDemand"],
  ["difficulties"],
  ["priorityGoals"],
  ["availability"],
  [],
];

export function DiagnosticWizard() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      salonName: "",
      city: "",
      teamSize: 1,
      currentServices: [],
      difficulties: [],
      priorityGoals: [],
    },
  });

  async function goNext() {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  }

  function goPrev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(values: DiagnosticFormValues) {
    setSubmitting(true);
    const res = await submitDiagnostic(values);
    setSubmitting(false);
    setResult(res);
  }

  if (result) {
    return <DiagnosticResultView result={result} onEdit={() => setResult(null)} />;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-sm font-bold text-muted">
          Étape {step + 1} sur {STEP_TITLES.length} — {STEP_TITLES[step]}
        </p>
        <StepIndicator total={STEP_TITLES.length} current={step + 1} />
      </div>

      <form
        onSubmit={step === STEP_TITLES.length - 1 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
        noValidate
      >
        {step === 0 ? (
          <div className="grid gap-4">
            <Field label="Nom du salon" htmlFor="salonName" error={errors.salonName?.message}>
              <TextInput id="salonName" invalid={!!errors.salonName} {...register("salonName")} />
            </Field>
            <Field label="Ville" htmlFor="city" error={errors.city?.message}>
              <TextInput id="city" invalid={!!errors.city} {...register("city")} />
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <Field
            label="Nombre de personnes dans l'équipe"
            htmlFor="teamSize"
            error={errors.teamSize?.message}
            hint="Vous y compris, si vous coupez également."
          >
            <TextInput
              id="teamSize"
              type="number"
              min={1}
              max={50}
              invalid={!!errors.teamSize}
              {...register("teamSize", { valueAsNumber: true })}
            />
          </Field>
        ) : null}

        {step === 2 ? (
          <FieldGroup
            label="Quelles prestations proposez-vous déjà ?"
            error={errors.currentServices?.message}
          >
            <Controller
              name="currentServices"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((option) => (
                    <CheckboxCard
                      key={option}
                      title={option}
                      checked={field.value?.includes(option) ?? false}
                      onChange={(checked) => {
                        const set = new Set(field.value ?? []);
                        if (checked) set.add(option);
                        else set.delete(option);
                        field.onChange(Array.from(set));
                      }}
                    />
                  ))}
                </div>
              )}
            />
          </FieldGroup>
        ) : null}

        {step === 3 ? (
          <FieldGroup label="Comment qualifieriez-vous la demande client masculine actuelle ?" error={errors.observedDemand?.message}>
            <Controller
              name="observedDemand"
              control={control}
              render={({ field }) => (
                <div className="grid gap-2.5">
                  {[
                    { value: "faible", title: "Faible", description: "Peu de demandes spontanées pour l'instant." },
                    { value: "moyenne", title: "Moyenne", description: "Des demandes ponctuelles, pas encore régulières." },
                    { value: "forte", title: "Forte", description: "Des demandes fréquentes, difficiles à absorber." },
                  ].map((opt) => (
                    <RadioCard
                      key={opt.value}
                      name="observedDemand"
                      value={opt.value}
                      checked={field.value === opt.value}
                      onChange={field.onChange}
                      title={opt.title}
                      description={opt.description}
                    />
                  ))}
                </div>
              )}
            />
          </FieldGroup>
        ) : null}

        {step === 4 ? (
          <FieldGroup label="Quelles difficultés rencontrez-vous aujourd'hui ?" error={errors.difficulties?.message}>
            <Controller
              name="difficulties"
              control={control}
              render={({ field }) => (
                <div className="grid gap-2.5">
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <CheckboxCard
                      key={option}
                      title={option}
                      checked={field.value?.includes(option) ?? false}
                      onChange={(checked) => {
                        const set = new Set(field.value ?? []);
                        if (checked) set.add(option);
                        else set.delete(option);
                        field.onChange(Array.from(set));
                      }}
                    />
                  ))}
                </div>
              )}
            />
          </FieldGroup>
        ) : null}

        {step === 5 ? (
          <FieldGroup label="Quels sont vos objectifs prioritaires ?" error={errors.priorityGoals?.message}>
            <Controller
              name="priorityGoals"
              control={control}
              render={({ field }) => (
                <div className="grid gap-2.5">
                  {GOAL_OPTIONS.map((option) => (
                    <CheckboxCard
                      key={option}
                      title={option}
                      checked={field.value?.includes(option) ?? false}
                      onChange={(checked) => {
                        const set = new Set(field.value ?? []);
                        if (checked) set.add(option);
                        else set.delete(option);
                        field.onChange(Array.from(set));
                      }}
                    />
                  ))}
                </div>
              )}
            />
          </FieldGroup>
        ) : null}

        {step === 6 ? (
          <FieldGroup label="Quelle est votre disponibilité pour un bootcamp ?" error={errors.availability?.message}>
            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <div className="grid gap-2.5">
                  {[
                    { value: "semaine", title: "En semaine" },
                    { value: "week-end", title: "Le week-end" },
                    { value: "flexible", title: "Flexible" },
                  ].map((opt) => (
                    <RadioCard
                      key={opt.value}
                      name="availability"
                      value={opt.value}
                      checked={field.value === opt.value}
                      onChange={field.onChange}
                      title={opt.title}
                    />
                  ))}
                </div>
              )}
            />
          </FieldGroup>
        ) : null}

        {step === 7 ? <RecapStep values={getValues()} /> : null}

        <div className="mt-7 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={goPrev}
            disabled={step === 0}
            className={cn(step === 0 && "invisible")}
          >
            <ArrowLeft className="size-4" /> Précédent
          </Button>
          {step < STEP_TITLES.length - 1 ? (
            <Button type="button" onClick={goNext}>
              Suivant <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={submitting}>
              {submitting ? "Analyse en cours…" : "Obtenir ma recommandation"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function FieldGroup({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 font-bold text-ink">{label}</p>
      {children}
      {error ? (
        <p role="alert" className="mt-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RecapStep({ values }: { values: DiagnosticFormValues }) {
  return (
    <div className="grid gap-3 text-sm">
      <RecapRow label="Salon" value={`${values.salonName || "—"} · ${values.city || "—"}`} />
      <RecapRow label="Équipe" value={`${values.teamSize} personne(s)`} />
      <RecapRow label="Prestations actuelles" value={values.currentServices?.join(", ") || "—"} />
      <RecapRow label="Demande observée" value={values.observedDemand ?? "—"} />
      <RecapRow label="Difficultés" value={values.difficulties?.join(", ") || "—"} />
      <RecapRow label="Objectifs" value={values.priorityGoals?.join(", ") || "—"} />
      <RecapRow label="Disponibilité" value={values.availability ?? "—"} />
      <p className="mt-2 text-xs text-muted">
        Vous pourrez revenir en arrière pour modifier vos réponses avant d&apos;obtenir votre recommandation.
      </p>
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-cream px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}

function DiagnosticResultView({ result, onEdit }: { result: DiagnosticResult; onEdit: () => void }) {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-5 flex items-center gap-3 rounded-lg bg-green-soft px-4 py-3.5 text-green">
        <TrendingUp className="size-6 shrink-0" aria-hidden="true" />
        <span className="font-extrabold">{result.maturityLabel}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 font-bold text-ink">Points forts</h3>
          <ul className="grid gap-2 text-sm text-muted">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-bold text-ink">Axes de progression</h3>
          <ul className="grid gap-2 text-sm text-muted">
            {result.improvementAreas.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-surface-strong px-4 py-3.5">
        <p className="text-xs font-extrabold uppercase tracking-wide text-muted">Recommandation indicative</p>
        <p className="text-lg font-extrabold text-ink">{result.recommendationLabel}</p>
      </div>
      <p className="mt-3 text-xs text-muted">
        Cette recommandation est indicative. La recommandation définitive sera confirmée par Pléthore Réseaux après
        échange.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/inscription"
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-5 font-extrabold text-white hover:bg-bronze-strong"
        >
          Créer mon espace de démonstration
        </Link>
        <Button type="button" variant="outline" onClick={onEdit}>
          <RotateCcw className="size-4" /> Modifier mes réponses
        </Button>
      </div>
    </div>
  );
}
