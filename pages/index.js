import Head from 'next/head';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import moment from 'moment';
import Link from 'next/link';

// import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';

// import styles from '../styles/Home.module.css'

export default function Home({posts}) {
  return (
    <Layout>
      <Head>
        <title>Daniel's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
    {/* Banner */}
      <section id="banner" className="major">
        <div className="inner">
          <header className="major">
            <h1>Hi, my name is Forty</h1>
          </header>
          <div className="content">
            <p>A responsive site template designed by HTML5 UP<br />
              and released under the Creative Commons.</p>
            <ul className="actions">
              <li><a href="#one" className="button next scrolly">Get Started</a></li>
            </ul>
          </div>
        </div>
      </section>
      {/* Main */}
      <div id="main">
        {/* One */}
        <section id="one" className="tiles">
          {
            posts.map((post, index) => {
              return (
                <article key={index}>
                  <span class="image">
										<img src={`assets/images/${post.featured_image}`} alt={post.title} />
									</span>
									<header class="major">
										<h3><Link href={`/${post.slug}`} class="link">{post.title}</Link></h3>
                    {post.date}
									</header>
                </article>
              );
            })
          }          
        </section>
        {/* Two */}
        <section id="two">
          <div className="inner">
            <header className="major">
              <h2>Massa libero</h2>
            </header>
            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
            <ul className="actions">
              <li><a href="landing.html" className="button next">Get Started</a></li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

// export const getArticles = (props) => {
//   props.map(article => {
//     return (

//     );
//   })
// }


export const getStaticProps = async () => {
  const sortPosts = () => {
    const allPosts = fs.readdirSync("posts").map(filename => {
      const file = fs.readFileSync(path.join("posts", filename)).toString();
      
      // console.log('file',file)
      const postData = matter(file);
      // console.log('postdata', postData)
      return {
        content: postData.content,
        title: postData.data.title,
        featured_image: postData.data.featured_image,
        date: postData.data.date,
        slug: postData.data.slug,
      };
    });
    // return allPosts;
    return allPosts.sort((a,b) => {
      // let A = new moment(a.date, 'YYYY-MM-DD HH:mm:ss');
      // let B = new moment(b.date, 'YYYY-MM-DD HH:mm:ss');
      // // let x = A.diff(B);
      // // let y = B.diff(A);
      // // console.log(A, B, x, y, A < B, x < y)
      // console.log(A - B, a.valueOf() - b.valueOf());

      return new moment(b.date, 'YYYY-MM-DD HH:mm:ss') - new moment(a.date, 'YYYY-MM-DD HH:mm:ss');
    });
  };

  
  const sp = sortPosts();
  // console.log(sp, 'sp');
  return {
    props: {
      posts: sp
    }
  }
};