import { useEffect, useState } from 'react';
import axios from 'axios';

import CONFIG from '../config';

const useFetch = <T>(
  endpoint: string,
): {
  state: T;
  error: boolean;
  errorMsg: string;
  loading: boolean;
} => {
  const [state, setState] = useState<T>({} as T);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEndpoint = async () => {
    try {
      setError(false);
      const response = await axios.get(`${CONFIG.SERVER_URL}${endpoint}`);
      const data = await response.data;
      setState(() => ({ ...data }));
    } catch (error) {
      console.log(error);
      setErrorMsg(`${error.name}: ${error.message} (useFetch)`);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEndpoint();
  }, [endpoint]);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};

export default useFetch;
