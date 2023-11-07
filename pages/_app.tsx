import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta title="전국 문해력 테스트: 국어영역" />
        <meta content="/jmt-banner.jpeg" />
      </Head>
      <MantineProvider
        theme={{
          colors: {
            ddColorMain: [
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
              "rgba(242, 29, 118, 1)",
            ],
            ddColorBackground: [
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
              "rgba(242, 29, 118, 0.15)",
            ],
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
