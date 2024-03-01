import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';
import { WithoutNullableKeys } from '../../types/WithoutNullableKeys';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins?.length) return <Empty resource="cabins" />;

  //1 filter

  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins!.filter((cabin) => cabin.discount! === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins!.filter((cabin) => cabin.discount! > 0);

  //2 sort

  const sortBy = searchParams.get('sortBy') || 'name-asc';

  const field = sortBy.split('-')[0] as keyof NonNullable<
    typeof filteredCabins
  >[0];

  const direction = sortBy.split('-')[1];

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = (
    filteredCabins as WithoutNullableKeys<NonNullable<typeof filteredCabins>>
  ).sort((a, b) => {
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return modifier * (a[field] as number) - (b[field] as number);
    } else {
      return modifier * (a[field] as string).localeCompare(b[field] as string);
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={sortedCabins}
          render={(cabin: (typeof sortedCabins)[0]) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
