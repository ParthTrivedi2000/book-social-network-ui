import { useEffect, useState } from 'react';
import interceptorInstance from './interceptor';

// THIS WHOLE FILE CONTAINS NOT WORKING CODE

export const useAxios = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await interceptorInstance.get(url);
//         setData(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

  return { data, error, loading };
};
