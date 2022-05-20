import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ allPosts }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Stuff will go here</p>
        <ul>
        {allPosts.map((post, i) => {
          return(
            <li key={i}>{post.title} - {post.__typename} - {post.slug} - {post.id}</li>
          )
        })}
        </ul>

      </main>

     
    </div>
  )
}


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query getDublin {
      entries(site: "tnwDublin", section: "pages") {
        id
        title
        slug
        ... on pages_default_Entry {
          id
          pageBlocks {
            __typename
            ... on pageBlocks_blocks_BlockType {
              id
              title
            }
            ... on pageBlocks_challenges_BlockType {
              id
            }
            ... on pageBlocks_faq_BlockType {
              id
            }
            ... on pageBlocks_partners_BlockType {
              id
            }
            ... on pageBlocks_rewards_BlockType {
              id
            }
            ... on pageBlocks_sessions_BlockType {
              id
            }
            ... on pageBlocks_video_BlockType {
              id
            }
            ... on pageBlocks_tickets_BlockType {
              id
            }
            ... on pageBlocks_textVisual_BlockType {
              id
              title
              textVisualHeading
              textVisualCta {
                ... on textVisualCta_BlockType {
                  id
                  tvCtaIsBlank
                  tvCtaLink
                  tvCtaText
                }
              }
              textVisualContent
            }
            ... on pageBlocks_text_BlockType {
              id
              heading
              column1
              column2
            }
            ... on pageBlocks_stats_BlockType {
              id
            }
            ... on pageBlocks_sponsors_BlockType {
              id
            }
            ... on pageBlocks_speakers_BlockType {
              id
            }
            ... on pageBlocks_signup_BlockType {
              id
              signupHeading
              signupText
              hubspotEmbed
            }
          }
        }
      }
    }
    `,
  });
  return {
    props: {
      allPosts: data.entries
    },
 };
}

