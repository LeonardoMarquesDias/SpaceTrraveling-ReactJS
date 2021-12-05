import Prismic from '@prismicio/client'
import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


type Post = {
  slug: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
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
        <title>Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}> 
              <a>
                <h1>{post.title}</h1>          
                <time>{post.updatedAt}</time>
                <p>{post.author}</p>
              </a>
            </Link>
          )) }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.content', 'posts.author'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      author: post.data.author,
      content: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.first_publication_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  console.log(posts)

  return {
    props: {
      posts
    },
  };
};
