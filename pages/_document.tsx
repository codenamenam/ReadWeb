import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "next";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scaleable=0"
        />
      </Head>
      <body
        style={{
          backgroundImage: "url('/web-background.png')",
          backgroundRepeat: "repeat-y",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
