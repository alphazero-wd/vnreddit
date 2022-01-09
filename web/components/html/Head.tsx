import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
}

const HeadPage: FC<Props> = ({ title }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        content="VnReddit is where creative people share posts about interesting facts in real life, upvote and downvote each other posts, make comments in a post and most importantly, join awesome communities."
      />
      <meta
        name="keywords"
        content="posts, votes, communities, social media, vnreddit"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
  );
};

export default HeadPage;
