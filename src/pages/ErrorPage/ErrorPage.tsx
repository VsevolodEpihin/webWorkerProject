import React from 'react';

interface ErrorPageProps {
  message: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => (
  <div>{message}</div>
)

export default ErrorPage;
