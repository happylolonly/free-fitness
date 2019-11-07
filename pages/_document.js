import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* <title>Бесплатный фитнес</title> */}
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/images/school-chalao-gym.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#31607B" />

          <meta name="description" content="Все бесплатные фитнес мероприятия в одном месте!" />
          <meta
            name="keywords"
            content="бесплатный фитнес, бесплатные тренировки в минске, йога, пилатес, танцы, степ, аэробика, воркаут"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Бесплатный фитнес" />
          <meta
            property="og:description"
            content="Все бесплатные фитнес мероприятия в одном месте!"
          />
          {/* <meta property="og:url" content="https://thehoop.us" /> */}
          <meta property="og:image" content="/images/favicon.ico" />

          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${process.env.GTM_KEY}')
            `,
            }}
          />
          {/* <!-- End Google Tag Manager --> */}
        </Head>

        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_KEY}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
