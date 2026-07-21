"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Scissors, Users2, Sparkles, GraduationCap, ShieldCheck } from "lucide-react";
import { Field, TextInput, CheckboxField, RadioCard } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import {
  accountStepSchema,
  barberDetailsSchema,
  beginnerDetailsSchema,
  salonDetailsSchema,
  structureDetailsSchema,
  type AccountStepValues,
  type BarberDetailsValues,
  type BeginnerDetailsValues,
  type SalonDetailsValues,
  type StructureDetailsValues,
} from "@/lib/validations";
import { signUp } from "@/lib/services/mockAuthService";
import type { ProfileKind } from "@/lib/types";
import { DEMO_PROFILE_SESSION_KEY } from "@/lib/demo/constants";

type DetailsValues =
  | ({ kind: "salon" } & SalonDetailsValues)
  | ({ kind: "structure" } & StructureDetailsValues)
  | ({ kind: "barber" } & BarberDetailsValues)
  | ({ kind: "debutant" } & BeginnerDetailsValues);

const PROFILE_OPTIONS: { kind: ProfileKind; title: string; description: string; icon: typeof Scissors }[] = [
  { kind: "salon", title: "Salon de coiffure", description: "Vous gérez ou travaillez dans un salon.", icon: Scissors },
  { kind: "structure", title: "Association / structure", description: "Vous accompagnez un public spécifique.", icon: Users2 },
  { kind: "barber", title: "Barber / partenaire", description: "Vous intervenez sur des ateliers terrain.", icon: Sparkles },
  { kind: "debutant", title: "Débutant / particulier", description: "Vous découvrez le métier de barber.", icon: GraduationCap },
];

const STEP_TITLES = ["Compte", "Profil", "Informations", "Récapitulatif"];

export function SignupWizard() {
  const router = useRouter();
  const { push } = useToast();
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState<AccountStepValues | null>(null);
  const [profileKind, setProfileKind] = useState<ProfileKind | null>(null);
  const [details, setDetails] = useState<DetailsValues | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleConfirm() {
    if (!account || !profileKind) return;
    setConfirming(true);
    await signUp({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      profileKind,
    });
    try {
      window.sessionStorage.setItem(DEMO_PROFILE_SESSION_KEY, profileKind);
    } catch {
      // ignore
    }
    setConfirming(false);
    push("Espace de démonstration prêt. Bienvenue !");
    router.push("/demo/espace");
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-sm font-bold text-muted">
          Étape {step + 1} sur 4 — {STEP_TITLES[step]}
        </p>
        <StepIndicator total={4} current={step + 1} />
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-lg bg-bronze-soft px-3.5 py-2.5 text-sm font-semibold text-bronze-strong">
        <ShieldCheck className="size-4.5 shrink-0" aria-hidden="true" />
        Parcours de démonstration — aucun compte réel n&apos;est créé
      </div>

      {step === 0 ? (
        <AccountStep
          defaultValues={account}
          onNext={(data) => {
            setAccount(data);
            setStep(1);
          }}
        />
      ) : null}

      {step === 1 ? (
        <ProfileStep
          value={profileKind}
          onBack={() => setStep(0)}
          onNext={(kind) => {
            setProfileKind(kind);
            setStep(2);
          }}
        />
      ) : null}

      {step === 2 && profileKind ? (
        <DetailsStep
          kind={profileKind}
          defaultValues={details}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setDetails(data);
            setStep(3);
          }}
        />
      ) : null}

      {step === 3 && account && profileKind && details ? (
        <RecapStep
          account={account}
          profileKind={profileKind}
          details={details}
          confirming={confirming}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
        />
      ) : null}
    </div>
  );
}

function AccountStep({
  defaultValues,
  onNext,
}: {
  defaultValues: AccountStepValues | null;
  onNext: (data: AccountStepValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountStepValues>({
    resolver: zodResolver(accountStepSchema),
    defaultValues: defaultValues ?? { acceptTerms: false, acceptPrivacy: false },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" htmlFor="firstName" error={errors.firstName?.message}>
          <TextInput id="firstName" invalid={!!errors.firstName} {...register("firstName")} />
        </Field>
        <Field label="Nom" htmlFor="lastName" error={errors.lastName?.message}>
          <TextInput id="lastName" invalid={!!errors.lastName} {...register("lastName")} />
        </Field>
      </div>
      <Field label="E-mail" htmlFor="email" error={errors.email?.message}>
        <TextInput id="email" type="email" invalid={!!errors.email} {...register("email")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mot de passe" htmlFor="password" error={errors.password?.message}>
          <TextInput id="password" type="password" invalid={!!errors.password} {...register("password")} />
        </Field>
        <Field label="Confirmation" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
          <TextInput id="confirmPassword" type="password" invalid={!!errors.confirmPassword} {...register("confirmPassword")} />
        </Field>
      </div>
      <CheckboxField id="acceptTerms" label="J'accepte les conditions d'utilisation" error={errors.acceptTerms?.message} {...register("acceptTerms")} />
      <CheckboxField id="acceptPrivacy" label="J'accepte la politique de confidentialité" error={errors.acceptPrivacy?.message} {...register("acceptPrivacy")} />
      <div className="mt-2 flex justify-end">
        <Button type="submit">
          Suivant <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
}

function ProfileStep({
  value,
  onBack,
  onNext,
}: {
  value: ProfileKind | null;
  onBack: () => void;
  onNext: (kind: ProfileKind) => void;
}) {
  const [selected, setSelected] = useState<ProfileKind | null>(value);
  return (
    <div>
      <p className="mb-3 font-bold text-ink">Quel profil vous correspond ?</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {PROFILE_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.kind}
            name="profileKind"
            value={opt.kind}
            checked={selected === opt.kind}
            onChange={(v) => setSelected(v as ProfileKind)}
            title={opt.title}
            description={opt.description}
            icon={<opt.icon className="mt-0.5 size-5 shrink-0 text-bronze" aria-hidden="true" />}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Précédent
        </Button>
        <Button type="button" disabled={!selected} onClick={() => selected && onNext(selected)}>
          Suivant <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function DetailsStep({
  kind,
  defaultValues,
  onBack,
  onNext,
}: {
  kind: ProfileKind;
  defaultValues: DetailsValues | null;
  onBack: () => void;
  onNext: (data: DetailsValues) => void;
}) {
  if (kind === "salon") {
    return (
      <SalonDetailsForm
        defaultValues={defaultValues?.kind === "salon" ? defaultValues : undefined}
        onBack={onBack}
        onNext={(data) => onNext({ kind: "salon", ...data })}
      />
    );
  }
  if (kind === "structure") {
    return (
      <StructureDetailsForm
        defaultValues={defaultValues?.kind === "structure" ? defaultValues : undefined}
        onBack={onBack}
        onNext={(data) => onNext({ kind: "structure", ...data })}
      />
    );
  }
  if (kind === "barber") {
    return (
      <BarberDetailsForm
        defaultValues={defaultValues?.kind === "barber" ? defaultValues : undefined}
        onBack={onBack}
        onNext={(data) => onNext({ kind: "barber", ...data })}
      />
    );
  }
  return (
    <BeginnerDetailsForm
      defaultValues={defaultValues?.kind === "debutant" ? defaultValues : undefined}
      onBack={onBack}
      onNext={(data) => onNext({ kind: "debutant", ...data })}
    />
  );
}

function StepActions({ onBack }: { onBack: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button type="button" variant="ghost" onClick={onBack}>
        <ArrowLeft className="size-4" /> Précédent
      </Button>
      <Button type="submit">
        Suivant <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function SalonDetailsForm({
  defaultValues,
  onBack,
  onNext,
}: {
  defaultValues?: SalonDetailsValues;
  onBack: () => void;
  onNext: (data: SalonDetailsValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SalonDetailsValues>({ resolver: zodResolver(salonDetailsSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom du salon" htmlFor="salonName" error={errors.salonName?.message}>
          <TextInput id="salonName" invalid={!!errors.salonName} {...register("salonName")} />
        </Field>
        <Field label="Ville" htmlFor="city" error={errors.city?.message}>
          <TextInput id="city" invalid={!!errors.city} {...register("city")} />
        </Field>
      </div>
      <Field label="Taille de l'équipe" htmlFor="teamSize" error={errors.teamSize?.message}>
        <TextInput id="teamSize" type="number" invalid={!!errors.teamSize} {...register("teamSize", { valueAsNumber: true })} />
      </Field>
      <Field label="Prestations actuelles" htmlFor="currentServices" error={errors.currentServices?.message}>
        <TextInput id="currentServices" invalid={!!errors.currentServices} {...register("currentServices")} />
      </Field>
      <Field label="Objectif principal" htmlFor="goal" error={errors.goal?.message}>
        <TextInput id="goal" invalid={!!errors.goal} {...register("goal")} />
      </Field>
      <StepActions onBack={onBack} />
    </form>
  );
}

function StructureDetailsForm({
  defaultValues,
  onBack,
  onNext,
}: {
  defaultValues?: StructureDetailsValues;
  onBack: () => void;
  onNext: (data: StructureDetailsValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StructureDetailsValues>({ resolver: zodResolver(structureDetailsSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom de la structure" htmlFor="structureName" error={errors.structureName?.message}>
          <TextInput id="structureName" invalid={!!errors.structureName} {...register("structureName")} />
        </Field>
        <Field label="Type de structure" htmlFor="structureType" error={errors.structureType?.message}>
          <TextInput id="structureType" invalid={!!errors.structureType} {...register("structureType")} />
        </Field>
      </div>
      <Field label="Ville" htmlFor="city" error={errors.city?.message}>
        <TextInput id="city" invalid={!!errors.city} {...register("city")} />
      </Field>
      <Field label="Public accompagné" htmlFor="audience" error={errors.audience?.message}>
        <TextInput id="audience" invalid={!!errors.audience} {...register("audience")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre de participants" htmlFor="participants" error={errors.participants?.message}>
          <TextInput id="participants" type="number" invalid={!!errors.participants} {...register("participants", { valueAsNumber: true })} />
        </Field>
        <Field label="Atelier recherché" htmlFor="workshopWanted" error={errors.workshopWanted?.message}>
          <TextInput id="workshopWanted" invalid={!!errors.workshopWanted} {...register("workshopWanted")} />
        </Field>
      </div>
      <StepActions onBack={onBack} />
    </form>
  );
}

function BarberDetailsForm({
  defaultValues,
  onBack,
  onNext,
}: {
  defaultValues?: BarberDetailsValues;
  onBack: () => void;
  onNext: (data: BarberDetailsValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BarberDetailsValues>({ resolver: zodResolver(barberDetailsSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Statut" htmlFor="status" error={errors.status?.message} hint="Indépendant, salarié...">
          <TextInput id="status" invalid={!!errors.status} {...register("status")} />
        </Field>
        <Field label="Années d'expérience" htmlFor="experienceYears" error={errors.experienceYears?.message}>
          <TextInput id="experienceYears" type="number" invalid={!!errors.experienceYears} {...register("experienceYears", { valueAsNumber: true })} />
        </Field>
      </div>
      <Field label="Spécialités" htmlFor="specialties" error={errors.specialties?.message}>
        <TextInput id="specialties" invalid={!!errors.specialties} {...register("specialties")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Zone d'intervention" htmlFor="interventionArea" error={errors.interventionArea?.message}>
          <TextInput id="interventionArea" invalid={!!errors.interventionArea} {...register("interventionArea")} />
        </Field>
        <Field label="Disponibilités" htmlFor="availability" error={errors.availability?.message}>
          <TextInput id="availability" invalid={!!errors.availability} {...register("availability")} />
        </Field>
      </div>
      <Field label="Portfolio (facultatif)" htmlFor="portfolioUrl" error={errors.portfolioUrl?.message}>
        <TextInput id="portfolioUrl" placeholder="https://…" invalid={!!errors.portfolioUrl} {...register("portfolioUrl")} />
      </Field>
      <StepActions onBack={onBack} />
    </form>
  );
}

function BeginnerDetailsForm({
  defaultValues,
  onBack,
  onNext,
}: {
  defaultValues?: BeginnerDetailsValues;
  onBack: () => void;
  onNext: (data: BeginnerDetailsValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeginnerDetailsValues>({ resolver: zodResolver(beginnerDetailsSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ville" htmlFor="city" error={errors.city?.message}>
          <TextInput id="city" invalid={!!errors.city} {...register("city")} />
        </Field>
        <Field label="Niveau" htmlFor="level" error={errors.level?.message} hint="Grand débutant, quelques bases...">
          <TextInput id="level" invalid={!!errors.level} {...register("level")} />
        </Field>
      </div>
      <Field label="Objectif" htmlFor="goal" error={errors.goal?.message}>
        <TextInput id="goal" invalid={!!errors.goal} {...register("goal")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Disponibilités" htmlFor="availability" error={errors.availability?.message}>
          <TextInput id="availability" invalid={!!errors.availability} {...register("availability")} />
        </Field>
        <Field label="Accompagnement recherché" htmlFor="supportWanted" error={errors.supportWanted?.message}>
          <TextInput id="supportWanted" invalid={!!errors.supportWanted} {...register("supportWanted")} />
        </Field>
      </div>
      <StepActions onBack={onBack} />
    </form>
  );
}

function RecapStep({
  account,
  profileKind,
  details,
  confirming,
  onBack,
  onConfirm,
}: {
  account: AccountStepValues;
  profileKind: ProfileKind;
  details: DetailsValues;
  confirming: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const profileLabel = PROFILE_OPTIONS.find((p) => p.kind === profileKind)?.title ?? profileKind;
  const detailEntries = Object.entries(details).filter(([key]) => key !== "kind");

  return (
    <div>
      <div className="grid gap-2.5 text-sm">
        <RecapRow label="Nom" value={`${account.firstName} ${account.lastName}`} />
        <RecapRow label="E-mail" value={account.email} />
        <RecapRow label="Profil" value={profileLabel} />
        {detailEntries.map(([key, value]) => (
          <RecapRow key={key} label={key} value={String(value ?? "—")} />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">
        En confirmant, vous accédez au portail de démonstration correspondant à votre profil. Aucun compte réel
        n&apos;est créé.
      </p>
      <div className="mt-6 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Précédent
        </Button>
        <Button type="button" onClick={onConfirm} disabled={confirming}>
          {confirming ? "Préparation de votre espace…" : "Confirmer et accéder au portail"}
        </Button>
      </div>
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
