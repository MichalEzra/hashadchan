import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught error in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <h2>אירעה שגיאה באפליקציה</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error?.toString()}
        </details>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
