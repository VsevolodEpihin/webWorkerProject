export interface Replacement {
  word: string;
  synonyms: string[]
}

export const changeWords = (text: string, replacements: Replacement[]): string => {
  let result = text;

  replacements.forEach(({ word, synonyms }) => {
    const regex = new RegExp(`(^|\\s)(${word}|${word}s?)(?=\\s|$|\\p{P})`, 'giu');
    const replacement = synonyms.join('/');

    result = result.replace(regex, (match, p1, p2) => `${p1}${replacement}`);
  });

  return result;
};
