// API
import { useEffect, useState } from 'react';
import API, { summarizeAllResponse } from '../API';

interface summarizeAllReturn {
  state: summarizeAllResponse;
  error: boolean;
  errorMsg: string;
  loading: boolean;
}

const useSummarizeAll = (): summarizeAllReturn => {
  const [state, setState] = useState<summarizeAllResponse>(
    {} as summarizeAllResponse
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSummarizeAll = async () => {
    try {
      setError(false);
      const response = await API.summarizeAll();

      setState(() => ({ ...response }));
    } catch (error) {
      console.log(error);
      setErrorMsg(`${error.name}: ${error.message} (useSummarizeAll)`);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummarizeAll();
  }, []);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};

export default useSummarizeAll;
