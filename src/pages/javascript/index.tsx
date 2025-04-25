// pages/javascript/index.tsx

import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/mongodb';
import Tutorial from '@/models/Tutorial';

export const getServerSideProps = async () => {
    await dbConnect();
    const tutorials = await Tutorial.find().sort({ order: 1 }).lean();
  
    if (!tutorials || tutorials.length === 0) {
      return { notFound: true };
    }
  
    return {
      redirect: {
        destination: `/javascript/${tutorials[0].slug}`,
        permanent: false,
      },
    };
  };
  
  export default function JavaScriptIndexRedirect() {
    return null;
  }
  
  

