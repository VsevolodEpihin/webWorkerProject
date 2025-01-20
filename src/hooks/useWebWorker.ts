import { useCallback, useEffect, useRef, useState } from 'react';

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

  const run = useCallback((value: string, useWorker: boolean = true) => {
    if (useWorker) {
      if (workerRef.current) {
        workerRef.current.onmessage = (e) => {
          setWorkerResult(e.data);
        };
        workerRef.current.postMessage(value);
      }
    } else {
      runSync(value);
    }
  }, [handler]);


  return { workerResult, run };
};

export default useWebWorker;

