export const changeWords = (text: string) => {
  return text
    .replace(/дом/gi, 'жилище')
    .replace(/собака/gi, 'кошка');
};
