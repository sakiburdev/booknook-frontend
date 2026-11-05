import { Button } from "@/components/ui/button";

export function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed px-6 py-20 text-center">
      {Icon ? (
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-muted">
          <Icon className="size-8 text-muted-foreground/60" />
        </div>
      ) : null}

      <h3 className="text-lg font-semibold">{title}</h3>

      {description ? (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}

      {children ? <div className="mt-6 flex gap-3">{children}</div> : null}
    </div>
  );
}

// Error state
export function ErrorState({ title, description, onRetry, retrying }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-destructive/40 bg-destructive/5 px-6 py-20 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {onRetry ? (
        <Button
          variant="outline"
          className="mt-6"
          onClick={onRetry}
          disabled={retrying}
        >
          {retrying ? "Retrying..." : "Try again"}
        </Button>
      ) : null}
    </div>
  );
}
