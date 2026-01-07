import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Hoppla, da ist was schiefgelaufen!</h2>
          <p className="text-stone-600 dark:text-stone-300 mb-6 max-w-md">
            Wir konnten diesen Bereich leider nicht laden. Das liegt meistens an einer unterbrochenen Internetverbindung.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-md"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
