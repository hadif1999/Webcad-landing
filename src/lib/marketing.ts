export type MarketingCapability = {
  number: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
};

export const capabilities = [
  {
    number: "01",
    label: "Ordered modeling",
    title: "Build from a parametric history.",
    summary:
      "Turn sketches into an ordered model with extrude, revolve, loft, sweep, boolean and finishing operations.",
    detail:
      "Each feature stays part of the workbench history, so the model remains understandable as dimensions and operations change.",
  },
  {
    number: "02",
    label: "Cloud workbenches",
    title: "Keep design work connected.",
    summary:
      "Organize CAD documents inside account-backed projects and return to them through Dashboard.",
    detail:
      "Production workbenches are authorized and durable, keeping the document, its assets and its project context together.",
  },
  {
    number: "03",
    label: "Durable history",
    title: "Revisit meaningful decisions.",
    summary:
      "Committed changes form a permanent history, while named revisions mark the versions worth returning to.",
    detail:
      "Revision retention follows the project owner's plan, and restoring earlier work creates a new forward-moving change instead of rewriting history.",
  },
  {
    number: "04",
    label: "AI-assisted editing",
    title: "Describe the next change.",
    summary:
      "Work with the in-workbench assistant when a modeling change is easier to explain than to assemble step by step.",
    detail:
      "Hosted agent turns operate against the same validated workbench model and use the AI-prompt allowance included with the current plan.",
  },
  {
    number: "05",
    label: "Team projects",
    title: "Share the right workspace.",
    summary:
      "Bring members into a project when its owner's plan includes team mode and keep access tied to project membership.",
    detail:
      "Owners, editors and viewers work through authorized project boundaries, with access kept inside the project they share.",
  },
  {
    number: "06",
    label: "Portable design data",
    title: "Keep a path out.",
    summary:
      "Bring external CAD assets into a workbench and export a self-contained portable document when you need one.",
    detail:
      "Source assets remain recoverable while referenced, and portable exports carry the workbench data needed outside the cloud workspace.",
  },
] as const satisfies readonly MarketingCapability[];

export type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

export const workflow = [
  {
    number: "01",
    title: "Sketch",
    description: "Start with profiles, parameters and design intent.",
  },
  {
    number: "02",
    title: "Build",
    description: "Turn those inputs into an ordered solid-model history.",
  },
  {
    number: "03",
    title: "Refine",
    description: "Adjust the model directly or work with AI-assisted editing.",
  },
  {
    number: "04",
    title: "Revisit",
    description: "Use durable history and revisions to continue with context.",
  },
] as const satisfies readonly WorkflowStep[];

export type EntitlementCategory = {
  title: string;
  description: string;
};

export const entitlementCategories = [
  {
    title: "Projects",
    description: "The number of design spaces an account can own.",
  },
  {
    title: "Workbenches",
    description: "The CAD documents available inside each project.",
  },
  {
    title: "AI prompts",
    description:
      "Hosted assistant turns available per plan period for each workbench and user.",
  },
  {
    title: "Revisions",
    description: "Named workbench versions retained as durable bookmarks.",
  },
  {
    title: "Team mode",
    description: "Whether a project owner can add other members.",
  },
] as const satisfies readonly EntitlementCategory[];
