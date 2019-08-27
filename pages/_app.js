import App from 'next/app';
import React from 'react';
import fetch from 'isomorphic-unfetch'
import { ThemeProvider } from 'emotion-theming';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import theme from '../theme';

const client = new ApolloClient({
  uri: 'https://mangiami.herokuapp.com/api/graphql',
  fetch,
});

export default class RatioWebsite extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          {/* eslint-disable-next-line */}
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
