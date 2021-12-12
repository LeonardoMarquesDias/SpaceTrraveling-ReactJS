import Prismic from '@prismicio/client'
import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import enGb from 'date-fns/locale/en-Gb';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


type Post = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostsProps {
  posts: Post[];
}

// interface PostPagination {
//   next_page: string;
//   results: Post[];
// }

// interface HomeProps {
//   postsPagination: PostPagination;
// }

export default function Home({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Home | SpaceTraveling</title>
      </Head>

      <main className={styles.container}>
        <section>
          {posts.map(post => (
            <Link href={`/posts/${post.uid}`}> 
              <article className={styles.posts} key={post.uid}>
                <a>
                  <h1>{post.data.title}</h1>  
                  <p>{post.data.subtitle}</p>        
                  <div>
                    <time>
                      <FiCalendar size={20} color="#BBBBBB" />
                      {format(
                        new Date(post.first_publication_date),
                        'MMM dd yyyy',
                        {
                          locale: enGb,
                        }
                      )}
                    </time>

                    <span>
                      <FiUser size={20} color="#BBBBBB" />
                      {post.data.author}
                    </span>
                  </div>
                </a>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 20,
  })

  const posts = postResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      posts
    },
  };
};
