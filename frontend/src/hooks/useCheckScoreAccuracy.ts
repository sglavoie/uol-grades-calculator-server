// API
import { useEffect, useState } from 'react';
import API, { checkScoreAccuracyResponse } from '../API';

interface checkScoreAccuracyReturn {
  state: checkScoreAccuracyResponse;
  error: boolean;
  errorMsg: string;
  loading: boolean;
}

const useCheckScoreAccuracy = (): checkScoreAccuracyReturn => {
  const [state, setState] = useState<checkScoreAccuracyResponse>(
    {} as checkScoreAccuracyResponse
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCheckScoreAccuracy = async () => {
    try {
      setError(false);
      const response = await API.checkScoreAccuracy();

      setState(() => ({ ...response }));
    } catch (error) {
      console.log(error);
      setErrorMsg(`${error.name}: ${error.message} (useCheckScoreAccuracy)`);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCheckScoreAccuracy();
  }, []);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};

export default useCheckScoreAccuracy;
