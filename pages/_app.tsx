import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
