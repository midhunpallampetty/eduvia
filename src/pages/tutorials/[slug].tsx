import { GetServerSideProps, NextPage } from 'next';
import dbConnect from '../../lib/mongodb';
import Tutorial from '../../models/Tutorial';
import { TutorialType } from '../../types/Tutorial';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: true });

interface Props {
  tutorial: TutorialType | null;
}

const TutorialPage: NextPage<Props> = ({ tutorial }) => {
  if (!tutorial) return <p>Not found</p>;

  return (
    <>
      <Navbar />
      <div className="p-10 ml-64">
        <h1 className="text-4xl font-bold">{tutorial.title}</h1>
        <p className="mt-4 text-lg whitespace-pre-line">{tutorial.content}</p>

        {tutorial.codeExample && (
          <pre className="mt-6 p-4 bg-gray-900 text-green-400 rounded">
            <code>{tutorial.codeExample}</code>
          </pre>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  const slug = context.params?.slug as string;

  const tutorial = await Tutorial.findOne({ slug }).lean();

  return {
    props: {
      tutorial: tutorial ? JSON.parse(JSON.stringify(tutorial)) : null,
    },
  };
};

export default TutorialPage;
