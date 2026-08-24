import React, { Component } from 'react';
import FallbackSneaker from './FallbackSneaker.jsx';

export function isWebGLSupported() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

export class WebGLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Context Creation Warning - Falling back gracefully:", error);
  }

  render() {
    if (this.state.hasError || !isWebGLSupported()) {
      return (
        <FallbackSneaker
          colorHex={this.props.colorHex}
          rotation={this.props.rotation}
          scale={this.props.scale}
          className={this.props.className}
        />
      );
    }

    return this.props.children;
  }
}
