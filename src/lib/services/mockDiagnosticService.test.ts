import { describe, expect, it } from "vitest";
import { computeDiagnosticResult } from "./mockDiagnosticService";
import type { DiagnosticAnswers } from "@/lib/types";

function baseAnswers(overrides: Partial<DiagnosticAnswers> = {}): DiagnosticAnswers {
  return {
    salonName: "Salon Test",
    city: "Paris",
    teamSize: 2,
    currentServices: ["Shampoing"],
    observedDemand: "faible",
    difficulties: ["Manque de temps pratique", "Manque de matériel", "Communication"],
    priorityGoals: ["Ajouter des prestations barber"],
    availability: "flexible",
    ...overrides,
  };
}

describe("computeDiagnosticResult", () => {
  it("returns 'demarrage' maturity and a découverte recommendation for a low-signal salon", () => {
    const result = computeDiagnosticResult(baseAnswers());
    expect(result.maturity).toBe("demarrage");
    expect(result.recommendation).toBe("decouverte");
  });

  it("returns 'avance' maturity and an intensif recommendation for a high-signal salon", () => {
    const result = computeDiagnosticResult(
      baseAnswers({
        currentServices: ["Skin fade", "Barbe"],
        teamSize: 4,
        observedDemand: "forte",
        difficulties: ["Manque de matériel"],
      }),
    );
    expect(result.maturity).toBe("avance");
    expect(result.recommendation).toBe("intensif");
  });

  it("lists the existing barber service as a strength when present", () => {
    const result = computeDiagnosticResult(baseAnswers({ currentServices: ["Taper fade"] }));
    expect(result.strengths.some((s) => s.includes("prestation barber"))).toBe(true);
  });

  it("flags missing barber services as an improvement area when absent", () => {
    const result = computeDiagnosticResult(baseAnswers({ currentServices: ["Shampoing"] }));
    expect(result.improvementAreas.some((s) => s.includes("prestations barber"))).toBe(true);
  });
});
