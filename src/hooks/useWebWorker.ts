import { useCallback, useEffect, useRef, useState } from 'react';

import { Replacement } from '.././helpers/changeWords';

type WorkerHandler = (text: string) => string;

const useWebWorker = (handler: WorkerHandler) => {
  const [workerResult, setWorkerResult] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const runSync = useCallback((value: string) => {
    const result = handler(value);
    setWorkerResult(result);
  }, [handler]);

  useEffect(() => {
    const workerCode = `
    self.onmessage = function(e) {
      const { value, replacements } = JSON.parse(e.data);

      const changeWords = (text, replacements) => {
        let result = text;

        replacements.forEach(({ word, synonyms }) => {
          if(word && synonyms.length > 0) {
          const regex = new RegExp('\\s*(' + word + '|'+ word + 's?)\\s*', 'gi'); 
            const getRandomSynonym = () => {
                const randomIndex = Math.floor(Math.random() * synonyms.length);
                return synonyms[randomIndex];
            };
                result = result.replace(regex, (match) => {
                const synonym = getRandomSynonym();
                return ' ' + synonym + ' ';
            });
          }
        });

        return result.trim();
    };

    const result = changeWords(value, replacements);
    self.postMessage(result);
  };
`;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  workerRef.current = new Worker(URL.createObjectURL(blob));

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const run = useCallback((value: string, replacements: Replacement[], useWorker: boolean = true) => {
    if (useWorker) {
      if (workerRef.current) {
        workerRef.current.onmessage = (e) => {

          setWorkerResult(e.data);
        };
        workerRef.current.postMessage(JSON.stringify({value, replacements}));
      }
    } else {
      runSync(value);
    }
  }, [handler]);

  return { workerResult, run };
};

export default useWebWorker;

