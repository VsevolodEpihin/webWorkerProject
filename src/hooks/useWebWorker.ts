import { useCallback, useEffect, useRef, useState } from 'react';

type WorkerHandler = (text: string) => void;

const useWebWorker = (handler: WorkerHandler) => {
  const [result, setResult] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerCode = `
      self.onmessage = function(e) {
        const handler = ${handler.toString()};
        const result = handler(e.data);
        self.postMessage(result);
      };
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    return () => {
      workerRef.current?.terminate();
    };
  }, [handler]);

  const run = useCallback(async (value: string) => {
    const words = value.split(' ');
    const chunkSize = 100;
    const numChunks = Math.ceil(words.length / chunkSize);

    const promises: Promise<string>[] = [];

    for (let i = 0; i < numChunks; i++) {
      const chunk = words.slice(i * chunkSize, (i + 1) * chunkSize).join(' ');

      const promise = new Promise<string>((resolve, reject) => {
        const workerCode = `
          self.onmessage = function(e) {
            const handler = ${handler.toString()};
            const result = handler(e.data);
            self.postMessage(result);
          };
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = (e) => {
          resolve(e.data);
          worker.terminate();
        };

        worker.onerror = (error) => {
          reject(error);
          worker.terminate();
        };

        worker.postMessage(chunk);
      });

      promises.push(promise);
    }

    try {
      const results = await Promise.all(promises);
      return results.join(' ');
    } catch (error) {
      console.error('Error processing text with workers:', error);
      throw error;
    }
  }, [handler]);


  return { result, run };
};

export default useWebWorker;
