import Button from './Button';

type ErrorFallbackProps = {
  error: { message: string };
  resetErrorBoundary: () => void;
};

function ErrorFallback({
  error,
  resetErrorBoundary /*from 'onReset' in the main.js*/,
}: ErrorFallbackProps) {
  return (
    <main className="flex h-dvh items-center justify-center bg-secondary_color p-20">
      <div className="flex-[0_1_96rem] rounded-lg bg-primary_color p-16 text-center text-text_color">
        <h1 className="h1 mb-6">Something went wrong</h1>
        <p className="mb-6 font-sono">{error.message}</p>
        <Button
          size="large"
          variation="danger"
          /*not working  variation*/
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>
      </div>
    </main>
  );
}

export default ErrorFallback;
