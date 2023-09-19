import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      /* console.log(import.meta.env.VITE_API_URL); */
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}todo/`);
        if (!response.ok) {
          throw new Error('Network response had problem');
        }
        const result = await response.json();
        console.log('result', result);
        setData(result);
      } catch (error) {
        console.error('Erroe fetching data', error);
      }
    }
    fetchdata();
  }, []);

  return (
    <>
      <h3>Hello</h3>
    </>
  );
}

export default App;
