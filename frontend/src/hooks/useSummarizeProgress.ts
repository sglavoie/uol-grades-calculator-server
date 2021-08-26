// API
import { useEffect, useState } from 'react';
import API, { summarizeProgressResponse } from '../API';

interface summarizeProgressReturn {
  state: summarizeProgressResponse;
  error: boolean;
  errorMsg: string;
  loading: boolean;
}

const useSummarizeProgress = (): summarizeProgressReturn => {
  const [state, setState] = useState<summarizeProgressResponse>(
    {} as summarizeProgressResponse
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSummarizeProgress = async () => {
    try {
      setError(false);
      const response = await API.summarizeProgress();

      setState(() => ({ ...response }));
    } catch (error) {
      console.log(error);
      setErrorMsg(`${error.name}: ${error.message} (useSummarizeProgress)`);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummarizeProgress();
  }, []);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};

export default useSummarizeProgress;
