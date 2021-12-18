import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/shared/Wrapper";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/client";
import dynamic from "next/dynamic";

dynamic(() => import("@themesberg/flowbite" as any), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ApolloProvider>
  );
}

export default MyApp;
