// import { GetStaticPaths, GetStaticProps } from 'next';
import { Head } from 'next/document';

// import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

// interface Post {
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     banner: {
//       url: string;
//     };
//     author: string;
//     content: {
//       heading: string;
//       body: {
//         text: string;
//       }[];
//     }[];
//   };
// }

// interface PostProps {
//   post: Post;
// }

export default function Post() {
  return (
    <>
      <Head>
        <title>Post | SpaceTraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={style.posts}>

        </div>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
