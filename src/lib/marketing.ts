import type { TranslationKey } from "./translations.ts";

export type IconKey = "browser" | "copilot" | "team" | "history" | "workbench" | "portable";
export type MarketingCapability = {
  id: string;
  number: string;
  icon: IconKey;
  labelKey: TranslationKey;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  detailKey: TranslationKey;
};

export const capabilities = [
  { id: "browser", number: "1", icon: "browser", labelKey: "features.browser.label", titleKey: "features.browser.title", summaryKey: "features.browser.summary", detailKey: "features.browser.detail" },
  { id: "copilot", number: "2", icon: "copilot", labelKey: "features.copilot.label", titleKey: "features.copilot.title", summaryKey: "features.copilot.summary", detailKey: "features.copilot.detail" },
  { id: "team", number: "3", icon: "team", labelKey: "features.team.label", titleKey: "features.team.title", summaryKey: "features.team.summary", detailKey: "features.team.detail" },
  { id: "history", number: "4", icon: "history", labelKey: "features.history.label", titleKey: "features.history.title", summaryKey: "features.history.summary", detailKey: "features.history.detail" },
  { id: "workbench", number: "5", icon: "workbench", labelKey: "features.workbench.label", titleKey: "features.workbench.title", summaryKey: "features.workbench.summary", detailKey: "features.workbench.detail" },
  { id: "portable", number: "6", icon: "portable", labelKey: "features.portable.label", titleKey: "features.portable.title", summaryKey: "features.portable.summary", detailKey: "features.portable.detail" },
] as const satisfies readonly MarketingCapability[];

export type WorkflowStep = { id: string; number: string; titleKey: TranslationKey; descriptionKey: TranslationKey };
export const workflow = [
  { id: "sketch", number: "01", titleKey: "workflow.step1", descriptionKey: "workflow.step1Desc" },
  { id: "build", number: "02", titleKey: "workflow.step2", descriptionKey: "workflow.step2Desc" },
  { id: "refine", number: "03", titleKey: "workflow.step3", descriptionKey: "workflow.step3Desc" },
  { id: "revisit", number: "04", titleKey: "workflow.step4", descriptionKey: "workflow.step4Desc" },
] as const satisfies readonly WorkflowStep[];

export type EntitlementId = "projects" | "workbenches" | "ai" | "revisions" | "team";
export type EntitlementCategory = { id: EntitlementId; titleKey: TranslationKey; descriptionKey: TranslationKey };
export const entitlementCategories = [
  { id: "projects", titleKey: "pricing.entitlements.projects.title", descriptionKey: "pricing.entitlements.projects.desc" },
  { id: "workbenches", titleKey: "pricing.entitlements.workbenches.title", descriptionKey: "pricing.entitlements.workbenches.desc" },
  { id: "ai", titleKey: "pricing.entitlements.ai.title", descriptionKey: "pricing.entitlements.ai.desc" },
  { id: "revisions", titleKey: "pricing.entitlements.revisions.title", descriptionKey: "pricing.entitlements.revisions.desc" },
  { id: "team", titleKey: "pricing.entitlements.team.title", descriptionKey: "pricing.entitlements.team.desc" },
] as const satisfies readonly EntitlementCategory[];

// Guidance categories, not live SKUs. Dashboard owns current availability.
export const tiers = [
  { id: "free", nameKey: "pricing.tiers.free.name", positioningKey: "pricing.tiers.free.positioning", projectsKey: "pricing.rows.personal", workbenchesKey: "pricing.rows.starter" },
  { id: "pro", nameKey: "pricing.tiers.pro.name", positioningKey: "pricing.tiers.pro.positioning", projectsKey: "pricing.rows.regular", workbenchesKey: "pricing.rows.capacity" },
  { id: "team", nameKey: "pricing.tiers.team.name", positioningKey: "pricing.tiers.team.positioning", projectsKey: "pricing.rows.shared", workbenchesKey: "pricing.rows.teamCapacity" },
] as const satisfies readonly { id: string; nameKey: TranslationKey; positioningKey: TranslationKey; projectsKey: TranslationKey; workbenchesKey: TranslationKey }[];
