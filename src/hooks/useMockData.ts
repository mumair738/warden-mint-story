import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// This utility simulates a network request. It can randomly fail to test error states.
export const mockFetch = <T,>(data: T, delay: number = 1500, failChance: number = 0): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failChance) {
        reject(new Error("Failed to fetch data. Please try again later."));
      } else {
        resolve(data);
      }
    }, delay);
  });
};

export const useMockData = <T,>(mockData: T[], delay: number = 1500) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Setting failChance to 0.1 (10%) to occasionally test the error state.
    mockFetch(mockData, delay, 0.1)
      .then(setData)
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [mockData, delay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
