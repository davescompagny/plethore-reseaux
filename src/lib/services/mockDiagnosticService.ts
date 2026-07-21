import { delay } from "./delay";
import type { DiagnosticAnswers, DiagnosticResult } from "@/lib/types";

const BARBER_SERVICES = ["Skin fade", "Taper fade", "Barbe", "Dégradés afro"];

export function computeDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
  let score = 0;

  const hasBarberService = answers.currentServices.some((s) => BARBER_SERVICES.includes(s));
  if (hasBarberService) score += 2;

  if (answers.teamSize >= 3) score += 1;

  if (answers.observedDemand === "forte") score += 2;
  else if (answers.observedDemand === "moyenne") score += 1;

  if (answers.difficulties.length <= 1) score += 1;

  let maturity: DiagnosticResult["maturity"];
  let maturityLabel: string;
  if (score >= 4) {
    maturity = "avance";
    maturityLabel = "Salon avancé sur le potentiel barber";
  } else if (score >= 2) {
    maturity = "en_progression";
    maturityLabel = "Salon en progression sur le potentiel barber";
  } else {
    maturity = "demarrage";
    maturityLabel = "Salon au démarrage sur le potentiel barber";
  }

  const strengths: string[] = [];
  if (hasBarberService) strengths.push("Vous proposez déjà au moins une prestation barber.");
  if (answers.teamSize >= 3) strengths.push("Une équipe suffisamment nombreuse pour se répartir les prestations.");
  if (answers.observedDemand !== "faible") strengths.push("Une demande client déjà observable sur les prestations hommes.");
  if (strengths.length === 0) strengths.push("Une base de clientèle existante à activer sur le créneau homme.");

  const improvementAreas: string[] = [];
  if (!hasBarberService) improvementAreas.push("Ajouter des prestations barber ciblées (skin fade, taper fade, barbe).");
  if (answers.difficulties.length > 1) improvementAreas.push("Traiter en priorité les difficultés identifiées (" + answers.difficulties.join(", ") + ").");
  if (answers.teamSize < 3) improvementAreas.push("Anticiper la montée en compétence avec une équipe restreinte.");
  if (improvementAreas.length === 0) improvementAreas.push("Structurer la communication autour de l'offre barber existante.");

  let recommendation: DiagnosticResult["recommendation"];
  let recommendationLabel: string;
  if (maturity === "avance") {
    recommendation = "intensif";
    recommendationLabel = "Bootcamp intensif 3 jours";
  } else if (maturity === "en_progression") {
    if (answers.difficulties.length > 2) {
      recommendation = "decouverte";
      recommendationLabel = "Bootcamp découverte 1 jour";
    } else {
      recommendation = "intensif";
      recommendationLabel = "Bootcamp intensif 3 jours";
    }
  } else {
    recommendation = "decouverte";
    recommendationLabel = "Bootcamp découverte 1 jour";
  }

  return {
    maturity,
    maturityLabel,
    strengths,
    improvementAreas,
    recommendation,
    recommendationLabel,
  };
}

export async function submitDiagnostic(answers: DiagnosticAnswers): Promise<DiagnosticResult> {
  await delay(900);
  return computeDiagnosticResult(answers);
}
