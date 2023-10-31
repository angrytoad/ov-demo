import React, {ErrorInfo, PropsWithChildren} from 'react';
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";
import {Flex, FlexDirection} from "../../atoms/Flex/Flex.tsx";

type ErrorBoundaryPropsType = {
  message: string,
}

class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryPropsType>, { hasError: boolean }> {
  state: { hasError: boolean };
  constructor(props: ErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  reload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <FadeIn>
          <Flex flexDirection={FlexDirection.COLUMN}>
            <p>{this.props.message}</p>
          </Flex>
        </FadeIn>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
