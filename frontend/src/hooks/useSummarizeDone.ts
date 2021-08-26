// API
import { useEffect, useState } from 'react';
import API, { summarizeDoneResponse } from '../API';

interface summarizeDoneReturn {
  state: summarizeDoneResponse;
  error: boolean;
  errorMsg: string;
  loading: boolean;
}

const useSummarizeDone = (): summarizeDoneReturn => {
  const [state, setState] = useState<summarizeDoneResponse>(
    {} as summarizeDoneResponse
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSummarizeDone = async () => {
    try {
      setError(false);
      const response = await API.summarizeDone();

      setState(() => ({ ...response }));
    } catch (error) {
      console.log(error);
      setErrorMsg(`${error.name}: ${error.message} (useSummarizeDone)`);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummarizeDone();
  }, []);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};

export default useSummarizeDone;
