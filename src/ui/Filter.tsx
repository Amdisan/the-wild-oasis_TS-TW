import { useSearchParams } from 'react-router-dom';

type FilterProps = {
  filterField: string;
  options: { value: string , label: string}[];
};

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) {
      searchParams.set('page', String(1));
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          className={`rounded-md border px-3 py-2 text-2xl font-medium ${opt.value === currentFilter ? 'border-brand_bg_color bg-brand_bg_color text-brand_text_color hover:bg-brand_bg_color' : 'border-border_color bg-primary_color text-text_gray_color hover:border-border_second_color hover:bg-secondary_color hover:text-text_color active:bg-brand_bg_color'} `}
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          disabled={opt.value === currentFilter}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
