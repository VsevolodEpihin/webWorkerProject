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

  const run = useCallback((value: string) => {
    if (workerRef.current) {
      workerRef.current.onmessage = (e) => {
        setResult(e.data);
      };
      workerRef.current.postMessage(value);
    }
  }, []);

  return { result, run };
};

export default useWebWorker;
