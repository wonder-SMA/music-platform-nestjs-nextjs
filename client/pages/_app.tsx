import React from 'react';
import { AppProps } from 'next/app';

import { wrapper } from '../store';
// import { createGlobalStyle } from 'styled-components';
//
// const Global = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//   }
//
//   body {
//     font-family: Arial, sans-serif;
//     font-weight: 400;
//     font-size: 16px;
//     margin: 0;
//     overflow-x: hidden;
//   }
//
//   iframe {
//     display: none;
//   }
//
//   ul, li, h1, p {
//     margin: 0;
//     padding: 0;
//     list-style: none;
//   }
// `;

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      {/*<Global />*/}
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(WrappedApp);