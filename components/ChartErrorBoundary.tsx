"use client";

import { Component, type ReactNode } from "react";

type Props = {
  name: string;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ChartErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-6 text-center">
          <p className="text-base text-zinc-200">
            Unable to load {this.props.name} TradingView chart.
            <br />
            Refresh the page and try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
