import type { TrialInfo } from "@/types/signup";

const TRIAL_KEY = "agentpro_trial";

export function saveTrialInfo(trial: TrialInfo): void {
  localStorage.setItem(TRIAL_KEY, JSON.stringify(trial));
}

export function getTrialInfo(): TrialInfo | null {
  const data = localStorage.getItem(TRIAL_KEY);
  if (!data) return null;

  try {
    const trial: TrialInfo = JSON.parse(data);
    const endDate = new Date(trial.endDate);
    const now = new Date();
    const diffMs = endDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    return {
      ...trial,
      daysRemaining,
      isActive: daysRemaining > 0,
    };
  } catch {
    return null;
  }
}

export function clearTrialInfo(): void {
  localStorage.removeItem(TRIAL_KEY);
}

export function isTrialExpired(): boolean {
  const trial = getTrialInfo();
  if (!trial) return false;
  return !trial.isActive;
}
