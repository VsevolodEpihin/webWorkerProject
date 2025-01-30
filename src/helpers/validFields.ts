import { Replacement } from './changeWords';

export const validFields = (replacements: Replacement[]) => {
  return replacements.some(
    (replacement) =>
      !replacement.word.trim() ||
      replacement.synonyms.length === 0 ||
      replacement.synonyms.some((synonym) => !synonym.trim())
  );
};
