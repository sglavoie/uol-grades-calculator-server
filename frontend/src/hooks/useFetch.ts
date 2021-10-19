import { useEffect, useState } from 'react';
import axios from 'axios';

import CONFIG from '../config';
import { gradesPostRequestBody } from '../types';

export const useFetchGet = <T>(
  endpoint: string
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

export const useFetchPost = <T>(
  endpoint: string,
  content: gradesPostRequestBody
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

  const postToEndpoint = async () => {
    try {
      setError(false);
      const response = await axios.post(
        `${CONFIG.SERVER_URL}${endpoint}`,
        content
      );
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
    postToEndpoint();
  }, [endpoint]);

  return {
    state,
    error,
    errorMsg,
    loading,
  };
};
