import { ReactNode, createContext, useContext } from 'react';

type TableProps = {
  columns: string;
  children: ReactNode;
};

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType>(null!);

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="overflow-hidden rounded-lg border border-border_color bg-primary_color text-2xl">
        {children}
      </div>
    </TableContext.Provider>
  );
}
function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      className="grid items-center gap-10 border-b border-b-border_color bg-secondary_color px-10 py-6 font-semibold uppercase tracking-wide text-text_color "
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </header>
  );
}
function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className="grid items-center gap-10 px-10 py-5 text-text_color [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-border_color"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}
//render prop pattern
function Body({
  data,
  render,
}: {
  data: any[];
  render: (arg: any) => ReactNode;
}) {
  if (!data.length)
    return (
      <p className="m-10 text-center text-2xl font-medium text-text_color">
        No data to show at the moment
      </p>
    );
  return <section className="my-2">{data.map(render)}</section>;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="flex justify-center bg-secondary_color p-5 text-text_color ">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
