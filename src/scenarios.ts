import { summaryFromLastEmail } from "./scenario/summaryFromLastEmail";
import { summaryFromThread } from "./scenario/summaryFromThread";
import { summaryFromAccount } from "./scenario/summaryFromAccount";
import { emailListCategorisation } from "./scenario/emailsCategorisation";
import { extractActionsDetails } from "./scenario/extractActions";
import { urgencyType } from "./scenario/urgencyType";
import { rephrase } from "./scenario/rephrase";
import { makeItShorter } from "./scenario/makeItShorter";
import { suggestLabelFromThread } from "./scenario/suggestLabelFromThread";
import { translateToCzech } from "./scenario/translateToLanguage";
import { translateToEstonian } from "./scenario/translateToEstonian";
import { suggestTemplate } from "./scenario/suggestTemplate";
import { suggestTemplateFromTemplates } from "./scenario/suggestTemplateFromTemplates";

export const scenarios = [
  {
    name: "Make a summary from last email",
    exec: summaryFromLastEmail,
  },
  {
    name: "Make a summary from thread",
    exec: summaryFromThread,
  },
  {
    name: "Make a summary from account",
    exec: summaryFromAccount,
  },
  {
    name: "Reprahse an email",
    exec: rephrase,
  },
  {
    name: "Shorten an email",
    exec: makeItShorter,
  },
  {
    name: "Suggest a label from thread",
    exec: suggestLabelFromThread,
  },
  {
    name: "Suggest an email category",
    exec: emailListCategorisation,
  },
  {
    name: "Translate to Estonian language",
    exec: translateToEstonian,
  },
  {
    name: "Translate to Czech language",
    exec: translateToCzech,
  },
  {
    name: "Extract suggested activities",
    exec: extractActionsDetails,
  },
  {
    name: "Prioritise this email by urgency",
    exec: urgencyType,
  },
  {
    name: "Create a template (for Ted from MCG selling motor spare parts)",
    exec: suggestTemplate,
  },
  {
    name: "Suggest a template for email (from list of available templates)",
    exec: suggestTemplateFromTemplates,
  },
];
