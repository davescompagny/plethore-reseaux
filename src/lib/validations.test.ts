import { describe, expect, it } from "vitest";
import { accountStepSchema, contactSchema, diagnosticSchema, loginSchema } from "./validations";

describe("diagnosticSchema", () => {
  const valid = {
    salonName: "Salon Karine",
    city: "Créteil",
    teamSize: 3,
    currentServices: ["Skin fade"],
    observedDemand: "forte" as const,
    difficulties: ["Manque de matériel"],
    priorityGoals: ["Ajouter des prestations barber"],
    availability: "week-end" as const,
  };

  it("accepts a fully valid payload", () => {
    expect(diagnosticSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty currentServices array", () => {
    const result = diagnosticSchema.safeParse({ ...valid, currentServices: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a team size below 1", () => {
    const result = diagnosticSchema.safeParse({ ...valid, teamSize: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid observedDemand value", () => {
    const result = diagnosticSchema.safeParse({ ...valid, observedDemand: "extrême" });
    expect(result.success).toBe(false);
  });
});

describe("accountStepSchema", () => {
  const valid = {
    firstName: "Karine",
    lastName: "Diallo",
    email: "karine@example.com",
    password: "motdepasse123",
    confirmPassword: "motdepasse123",
    acceptTerms: true,
    acceptPrivacy: true,
  };

  it("accepts matching passwords with accepted terms", () => {
    expect(accountStepSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = accountStepSchema.safeParse({ ...valid, confirmPassword: "autrepassword" });
    expect(result.success).toBe(false);
  });

  it("rejects when terms are not accepted", () => {
    const result = accountStepSchema.safeParse({ ...valid, acceptTerms: false });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema and contactSchema", () => {
  it("rejects an invalid e-mail on login", () => {
    expect(loginSchema.safeParse({ email: "not-an-email", password: "x" }).success).toBe(false);
  });

  it("rejects a contact message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "Karine",
      email: "karine@example.com",
      message: "court",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid contact message", () => {
    const result = contactSchema.safeParse({
      name: "Karine",
      email: "karine@example.com",
      message: "Je souhaite un diagnostic pour mon salon indépendant.",
    });
    expect(result.success).toBe(true);
  });
});
