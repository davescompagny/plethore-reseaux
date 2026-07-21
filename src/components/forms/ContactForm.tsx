"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, TextInput, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { CONTACT } from "@/lib/site-content";

export function ContactForm() {
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  function onSubmit(values: ContactFormValues) {
    const subject = encodeURIComponent("Demande via le site — Pléthore Réseaux");
    const body = encodeURIComponent(
      `Nom : ${values.name}\nE-mail : ${values.email}\nSalon : ${values.salonName ?? ""}\nVille : ${values.city ?? ""}\n\n${values.message}`,
    );
    window.location.assign(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`);
    push("Votre client mail va s'ouvrir avec votre message pré-rempli.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom" htmlFor="name" error={errors.name?.message}>
          <TextInput id="name" invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="E-mail" htmlFor="email" error={errors.email?.message}>
          <TextInput id="email" type="email" invalid={!!errors.email} {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom du salon (facultatif)" htmlFor="salonName">
          <TextInput id="salonName" {...register("salonName")} />
        </Field>
        <Field label="Ville (facultatif)" htmlFor="city">
          <TextInput id="city" {...register("city")} />
        </Field>
      </div>
      <Field label="Votre message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" invalid={!!errors.message} {...register("message")} />
      </Field>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit">
        Envoyer le message
      </Button>
    </form>
  );
}
