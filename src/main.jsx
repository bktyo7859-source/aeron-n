import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SNEAKX Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4 glass-card p-8 rounded-3xl border border-red-500/30">
            <h1 className="text-2xl font-bold font-heading text-red-400">SNEAKX Application Error</h1>
            <p className="text-sm font-mono text-slate-400">
              {this.state.error?.toString() || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-purple-600 text-white font-mono text-xs font-bold"
            >
              RELOAD APPLICATION
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
