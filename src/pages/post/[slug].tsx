import Prismic from '@prismicio/client';

import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}


interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Header />
  
      <section className={styles.banner}>
        <img src="/images/banner.png" alt="Banner" />
      </section>
      
      <main className={commonStyles.content}>
        <article className={styles.post}>
          <h1>What is closure in JavaScript.?</h1>

          <div className={styles.postInfo}>
            <span>
              <FiCalendar size={20} color="#BBBBBB" />
              12 Mar 2022
            </span>

            <span>
              <FiUser size={20} color="#BBBBBB" />
              Leonardo Dias
            </span>

            <span>
              <FiClock size={20} color="#BBBBBB" />
              10 min
            </span>
          </div>

          <div className={styles.postContent}>
            <h2>Introducing closure in Javascript</h2>
            <p className={styles.postSection}>
              What is a closure? A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables — a scope chain.
              The closure has three scope chains:it has access to its own scope — variables defined between its curly brackets
              it has access to the outer function’s variablesit has access to the global variables To the uninitiated, this definition might seem like just a whole lot of jargon!
            </p>          
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query([
  //   Prismic.Predicates.at('document.type', 'posts'),
  // ]);

  return { 
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient({});
  const { slug } = context.params;
  const response = await prismic.getByUID('Posts', String(slug), {});
  console.log(response)

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    }
  };
};
