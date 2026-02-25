"use client";

interface CausalConnectorProps {
  text: string;
}

export default function CausalConnector({ text }: CausalConnectorProps) {
  if (!text) return null;

  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-4 w-px bg-text-muted/30" />
      <p className="my-0.5 max-w-xs text-center text-xs italic text-text-muted">
        {text} ↓
      </p>
      <div className="h-2 w-px bg-text-muted/30" />
    </div>
  );
}
