import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '../../ui';

interface Props {
  children: ReactNode;
  onRetry?: () => void;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ModelViewerErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Viewer rendering error caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="vizora-viewer3d__error">
          <AlertCircle size={36} style={{ color: 'var(--color-danger)' }} />
          <h4 className="h4" style={{ margin: 0 }}>
            Unable to Render 3D Model
          </h4>
          <p className="text-xs text-muted" style={{ maxWidth: '340px' }}>
            {this.props.fallbackMessage ||
              'An error occurred while parsing the WebGL geometry mesh or texture maps.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw size={14} />}
            onClick={this.handleReset}
          >
            Retry Rendering
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModelViewerErrorBoundary;
