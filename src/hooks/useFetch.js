import { useState, useEffect } from 'react';

/**
 * Custom Hook: useFetch
 * Implements: Fetch API, useState, useEffect, AbortController cleanup, error handling
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...options, signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching.');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function: Abort ongoing request when URL changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [url, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { data, loading, error, refetch };
}
