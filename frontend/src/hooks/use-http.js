import { useState, useCallback, useRef, useEffect } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // for cancelling active HTTP requests
  
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    const httpAbortController = new AbortController();
    activeHttpRequests.current.push(httpAbortController);
    console.log(requestConfig);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
        signal: httpAbortController.signal,
      });      
      console.log(response);
      const data = await response.json();
      setIsLoading(false);
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqControl => reqControl !== httpAbortController
      );
      if(!response.ok) {
        throw new Error(data.message);
      }      
      return data;
    } 
    catch (err) {
      console.log(err);
      setError(err.message || 'Oh no! Something went wrong.');
      setIsLoading(false);
      throw err;      
    }
  }, []);

  const resetError = () => {
    setError(null);
  }
  useEffect(() => {
    // Cleanup function
    // abort all active HTTP requests when unmounting
    return () => {
      activeHttpRequests.current.forEach(abortController => abortController.abort());
    };
  },[]);
  return {
    isLoading,
    error,
    sendRequest,
    resetError
  };
};

export default useHttp;