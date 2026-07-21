"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Field, TextInput } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { signIn } from "@/lib/services/mockAuthService";
import { DEMO_PROFILE_SESSION_KEY, PORTAL_PROFILE_STORAGE_KEY } from "@/lib/demo/constants";
import type { ProfileKind } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    let lastProfile: string | null = null;
    try {
      lastProfile = window.sessionStorage.getItem(DEMO_PROFILE_SESSION_KEY);
    } catch {
      // ignore
    }
    const profileKind = (lastProfile as ProfileKind | null) ?? "salon";
    await signIn(values.email, profileKind);
    try {
      window.sessionStorage.setItem(DEMO_PROFILE_SESSION_KEY, profileKind);
    } catch {
      // ignore
    }
    push(`Connexion démonstration réussie (espace ${PORTAL_PROFILE_STORAGE_KEY}).`);
    router.push("/demo/espace");
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
      <h1 className="mb-1 text-2xl font-extrabold">Se connecter</h1>
      <p className="mb-5 text-sm text-muted">Accédez à votre espace de démonstration.</p>
      <div className="mb-5 flex items-center gap-2 rounded-lg bg-bronze-soft px-3.5 py-2.5 text-sm font-semibold text-bronze-strong">
        <ShieldCheck className="size-4.5 shrink-0" aria-hidden="true" />
        Parcours de démonstration — aucune donnée réelle n&apos;est vérifiée
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
        <Field label="E-mail" htmlFor="email" error={errors.email?.message}>
          <TextInput id="email" type="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Mot de passe" htmlFor="password" error={errors.password?.message}>
          <TextInput id="password" type="password" invalid={!!errors.password} {...register("password")} />
        </Field>
        <div className="flex justify-end">
          <Link href="/mot-de-passe-oublie" className="focus-ring text-sm font-semibold text-bronze hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">
        Pas encore d&apos;espace ?{" "}
        <Link href="/inscription" className="focus-ring font-semibold text-bronze hover:underline">
          Créer mon espace
        </Link>
      </p>
    </div>
  );
}
