import Home from '@/components/Home/Home';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

const getData = async () => {
  try {
    const res = await fetch(`${process.env.apiKey}/projects?populate=upload`);
    const resp = await res.json();
    const data = resp.data;

    return {
      data,
    };
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

export default async function Page() {
  const data = await getData();

  // console.log('data', data);

  return (
    // <LayoutWrapper>
    <Home />
  );
}
