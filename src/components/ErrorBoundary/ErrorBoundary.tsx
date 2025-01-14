import React, { ReactNode }  from 'react';

import ErrorPage from '../../pages/ErrorPage/ErrorPage';

interface Props {
  children?: ReactNode;
  errorComponent?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  getDerivedFromStateError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo)
  }

  render() {
    const {
      state: { hasError },
      props: { children, errorComponent },
    } = this;
    if(hasError) {
      return errorComponent || <ErrorPage message="Что-то пошло не так..."></ErrorPage> 
    }
    return children;
  }
}
