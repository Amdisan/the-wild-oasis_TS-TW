import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="h1">All cabins</h1>
        <CabinTableOperations />
      </div>
      <div className="flex flex-col gap-7">
        <CabinTable />
        <AddCabin />
      </div>
    </>
  );
}

export default Cabins;
