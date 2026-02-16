import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";
import SeguimientosModal from "./ModalSeguimiento";
import type { SortDescriptor } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";


import { buscar_matricula_curso } from "@/api/Matriculas";
import { useParams } from "react-router-dom";

export const columns = [
 
  {name: "Nombre", uid: "name", sortable: true},
  {name: "Identificacion", uid: "age", sortable: true},
  {name: "Email", uid: "email", sortable: true},
  {name: "Programa", uid: "programa", sortable: true},
  {name: "Ficha", uid: "number"},
  {name: "Fecha Inicio", uid: "startDate"},
  {name: "Fecha Fin", uid: "endDate", sortable: true},
  {name: "Avance", uid: "avance", sortable: true},
  {name: "Seguimientos", uid: "seguimientos", sortable: true},
 
  {name: "Accciones", uid: "actions"},
];

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];


export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({size = 24, width, height, ...props}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({size = 24, width, height, ...props}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "programa", "actions"];


export default function TableInfo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedAlumno, setSelectedAlumno] = React.useState<any>(null);


  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
  column: "name",
  direction: "ascending",
});

  const [page, setPage] = React.useState(1);
  const [dataApi, setDataApi] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { idCurso } = useParams();
  console.log("ID CURSO:", idCurso);
  // FETCH CORRECTO
  useEffect(() => {
  const cargar = async () => {
    if (!idCurso) return;

    try {
      const data = await buscar_matricula_curso(Number(idCurso));
      console.log("DATA COMPLETA:", data);


      console.log("DATA BACKEND:", data);

      const formatearFecha = (fecha: string) =>
        new Date(fecha).toLocaleDateString("es-ES");

      const personas = data?.personas ?? [];

      const transformado = personas.map((persona: any) => ({
        id: persona.id_persona,
        name: persona.nombre || "",
        email: persona.correo || "",
        age: persona.identificacion || "",
        programa: data.curso?.programa?.nombre || "",
        number: data?.curso?.codigo || "",
        startDate: data?.curso?.fecha_inicio
          ? formatearFecha(data.curso.fecha_inicio)
          : "",
        endDate: data?.curso?.fecha_fin
          ? formatearFecha(data.curso.fecha_fin)
          : "",
        avance: "0%",
        seguimientos: "0",
        actions: ""
      }));

      setDataApi(transformado);

    } catch (error) {
      console.error("Error cargando matriculas:", error);
    } finally {
      setLoading(false);
    }
  };

  cargar();
}, [idCurso]);



  const pages = Math.ceil(dataApi.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...dataApi];

    if (hasSearchFilter) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [dataApi, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return (
  <>
  <div className="flex justify-between items-center mb-4">

  <Input
    isClearable
    placeholder="Buscar por nombre..."
    startContent={<SearchIcon />}
    value={filterValue}
    onClear={() => setFilterValue("")}
    onValueChange={setFilterValue}
    className="max-w-xs"
  />

  <div className="flex items-center gap-2">
    <span className="text-small text-default-400">
      Filas por página:
    </span>

    <Select

  size="sm"
  selectedKeys={[String(rowsPerPage)]}
  onSelectionChange={(keys) => {
    const value = Array.from(keys)[0];
    setRowsPerPage(Number(value));
    setPage(1);
  }}
  className="max-w-xs"
>
  <SelectItem key="5">5</SelectItem>
  <SelectItem key="10">10</SelectItem>
  <SelectItem key="15">15</SelectItem>
  <SelectItem key="20">20</SelectItem>
</Select>

  </div>

</div>


    <Table
  isCompact
  removeWrapper
  aria-label="Tabla de aprendices"
  sortDescriptor={sortDescriptor}
  onSortChange={setSortDescriptor}
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
  bottomContent={
    pages > 0 ? (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    ) : null
  }
  bottomContentPlacement="outside"
>

      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={sortedItems}
        isLoading={loading}
        loadingContent={"Cargando datos..."}
        emptyContent={"No hay registros"}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "actions") {
                return (
                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => {
                        setSelectedAlumno(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <VerticalDotsIcon size={18} />
                    </Button>
                  </TableCell>
                );
              }

              return <TableCell>{item[columnKey]}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>

    <SeguimientosModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  alumno={selectedAlumno}
/>

  </>
);

}


