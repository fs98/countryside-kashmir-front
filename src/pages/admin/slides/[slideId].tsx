import Head from 'next/head';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

const Slide = (slide): JSX.Element => {
  console.log(slide);

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Slides</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 pb-0">
              <Link href="slides/create">
                <a className="btn outline p-2 rounded-sm outline-blue-500 text-blue-500 hover:outline-blue-700 hover:text-blue-700">
                  <AddIcon />
                  New Slide
                </a>
              </Link>
            </div>
            <div className="p-6 bg-white border-b border-gray-200 w-full grid grid-cols-3 gap-4">
              Test
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
  params: { slideId },
}) => {
  const slide = await axios
    .get(`/api/slides/${slideId}`, {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!slide) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slide,
    },
  };
};

export default Slide;
