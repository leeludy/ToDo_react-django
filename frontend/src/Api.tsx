import { useEffect, useState } from 'react';

export default function Api() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    async function fetchdata() {
      /* console.log(import.meta.env.VITE_API_URL); */
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}todo/`);
        if (!response.ok) {
          throw new Error('Network response encounter problem');
        }
        const result = await response.json();
        console.log('result', result);

        setData(result);
        console.log('data', data);
      } catch (error) {
        console.error('Error while fetching data', error);
      }
    }
    fetchdata();
  }, [data]);
}
