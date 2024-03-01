import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-dvh items-center justify-center bg-secondary_color">
      <div className="flex-[0_1_96rem] rounded-lg bg-primary_color p-20 text-center text-text_color">
        <h1 className="h1 mb-12">
          The page you are looking for could not be found 😢
        </h1>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
