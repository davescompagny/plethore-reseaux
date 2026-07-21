"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Field, TextInput } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { requestPasswordReset } from "@/lib/services/mockAuthService";

const schema = z.object({ email: z.email("E-mail invalide.") });
type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    const res = await requestPasswordReset(values.email);
    setSentTo(res.email);
  }

  if (sentTo) {
    return (
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 text-center shadow-soft sm:p-8">
        <CheckCircle2 className="mx-auto mb-3 size-9 text-green" aria-hidden="true" />
        <h1 className="mb-2 text-xl font-extrabold">Demande simulée envoyée</h1>
        <p className="text-sm text-muted">
          Dans le portail final, un e-mail serait envoyé à <span className="font-semibold text-ink">{sentTo}</span>.
          Cette démonstration ne transmet aucun e-mail réel.
        </p>
        <Link href="/connexion" className="focus-ring mt-5 inline-block font-semibold text-bronze hover:underline">
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
      <h1 className="mb-1 text-2xl font-extrabold">Mot de passe oublié</h1>
      <p className="mb-5 text-sm text-muted">Indiquez votre e-mail pour simuler une demande de réinitialisation.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
        <Field label="E-mail" htmlFor="email" error={errors.email?.message}>
          <TextInput id="email" type="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Envoi…" : "Envoyer la demande"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">
        <Link href="/connexion" className="focus-ring font-semibold text-bronze hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
