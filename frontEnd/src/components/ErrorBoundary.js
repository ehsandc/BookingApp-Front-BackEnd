import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      console.error("Error caught by boundary:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1>🚫 Something went wrong</h1>
            <p>We're sorry, but something unexpected happened.</p>

            {process.env.NODE_ENV === "development" && (
              <details style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
                <summary>Error Details (Development Mode)</summary>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Reload Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="btn btn-secondary"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
