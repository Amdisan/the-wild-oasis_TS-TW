import { useSearchParams } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-6 text-2xl">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-2">
        <button
          className="flex items-center justify-center gap-2 rounded-md border border-border_color  bg-primary_color px-5 py-2 text-2xl font-medium text-text_gray_color transition duration-300 enabled:hover:border-border_second_color enabled:hover:bg-secondary_color enabled:hover:text-text_color enabled:active:bg-brand_bg_color enabled:active:text-brand_text_color"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="h-7 w-7" />
          <span className="pl-2">Previous</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-md border border-border_color  bg-primary_color px-5 py-2 text-2xl font-medium text-text_gray_color transition duration-300 enabled:hover:border-border_second_color enabled:hover:bg-secondary_color enabled:hover:text-text_color enabled:active:bg-brand_bg_color enabled:active:text-brand_text_color"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span className="pr-2">Next</span>
          <HiChevronRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
