import { summaryFromLastEmail } from "./scenario/summaryFromLastEmail";
import { summaryFromThread } from "./scenario/summaryFromThread";
import { summaryFromAccount } from "./scenario/summaryFromAccount";
import { emailListCategorisation } from "./scenario/emailsCategorisation";
import { extractActions } from "./scenario/extractActions";
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
    exec: summaryFromLastEmail.exec,
    input: summaryFromLastEmail.getInput(),
  },
  {
    name: "Make a summary from thread",
    exec: summaryFromThread.exec,
    input: summaryFromThread.getInput(),
  },
  {
    name: "Make a summary for the whole account",
    exec: summaryFromAccount.exec,
    input: `${summaryFromAccount.getInput()} and contact related data`,
  },
  {
    name: "Reprahse an email",
    exec: rephrase.exec,
    input: rephrase.getInput(),
  },
  {
    name: "Shorten an email",
    exec: makeItShorter.exec,
    input: makeItShorter.getInput(),
  },
  {
    name: "Suggest a label for the thread",
    exec: suggestLabelFromThread.exec,
    input: suggestLabelFromThread.getInput(),
  },
  {
    name: "Suggest an email category",
    exec: emailListCategorisation.exec,
    input: emailListCategorisation.getInput(),
  },
  {
    name: "Translate to Estonian language and make it funny",
    exec: translateToEstonian.exec,
    input: translateToEstonian.getInput(),
  },
  {
    name: "Translate to Czech language",
    exec: translateToCzech.exec,
    input: translateToCzech.getInput(),
  },
  {
    name: "Extract suggested activities",
    exec: extractActions.exec,
    input: extractActions.getInput(),
  },
  {
    name: "Prioritise this email by urgency",
    exec: urgencyType.exec,
    input: urgencyType.getInput(),
  },
  {
    name: "Create a template (for Ted from MCG selling motor spare parts)",
    exec: suggestTemplate.exec,
    input: suggestTemplate.getInput(),
  },
  {
    name: "Suggest a template for email (from list of available templates)",
    exec: suggestTemplateFromTemplates.exec,
    input: suggestTemplateFromTemplates.getInput(),
  },
];
