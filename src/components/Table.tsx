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
  Pagination,
  Select,
  SelectItem, 
  Chip
} from "@heroui/react";

import SeguimientosModal from "./ModalSeguimiento";
import type { SortDescriptor } from "@heroui/react";
import { listar_aprendices } from "@/api/PersonasApi";

export const columns = [
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Identificacion", uid: "age", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Programa", uid: "programa", sortable: true },
  { name: "Ficha", uid: "number" },
  { name: "Fecha Inicio", uid: "startDate" },
  { name: "Fecha Fin", uid: "endDate", sortable: true },
  { name: "Avance", uid: "avance", sortable: true },
  { name: "Estado", uid: "estado", sortable: true },
  { name: "Accciones", uid: "actions" },
];

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

export const SearchIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7 21 21 16.7 21 11.5S16.7 2 11.5 2 2 6.3 2 11.5 6.3 21 11.5 21Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const VerticalDotsIcon = ({ size = 24 }: any) => (
  <svg viewBox="0 0 24 24" width={size}>
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 
      2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 
      .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 
      12c-1.1 0-2 .9-2 2s.9 2 2 2 
      2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export default function TableInfo() {

  const [dataApi, setDataApi] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const [selectedAlumno, setSelectedAlumno] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  /* FETCH APRENDICES */
  useEffect(() => {

    const cargarAprendices = async () => {

      try {

        const data = await listar_aprendices();

        const transformado = data.map((persona: any) => ({
          id: persona.id_persona,
          name: persona.nombre,
          age: persona.identificacion,
          email: persona.correo,
          programa: persona.programa,
          number: persona.ficha,
          estado: persona.estado, 
          startDate: "",
          endDate: "",
          avance: "0%",
          seguimientos: "0",
        }));

        setDataApi(transformado);

      } catch (error) {

        console.error("Error cargando aprendices:", error);

      } finally {

        setLoading(false);

      }

    };

    cargarAprendices();

  }, []);

  /* FILTRO BUSQUEDA */

  const filteredItems = React.useMemo(() => {

    let filtered = [...dataApi];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) || String(item.age).includes(filterValue) || String(item.number).includes(filterValue)
      );
    }

    return filtered;

  }, [dataApi, filterValue]);

  /* PAGINACION */

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);

  }, [page, filteredItems, rowsPerPage]);

  /* ORDENAMIENTO */

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
      {/* BUSCADOR */}
      <div className="flex justify-between mb-4">

        <Input
          isClearable
          placeholder="Buscar por nombre o Identificacion "
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="max-w-xs"
        />

        <div className="flex gap-2 items-center">

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

      {/* TABLA */}

      <Table
        isCompact
        removeWrapper
        aria-label="Tabla de aprendices"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        bottomContent={
          pages > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          )
        }
      >

        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
            >
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
                if (columnKey === "estado") {
                return (
                  <TableCell>
                    <Chip
                      color={statusColorMap[item.estado] || "default"}
                      variant="flat"
                      size="sm"
                    >
                      {item.estado}
                    </Chip>
                  </TableCell>
                );
}

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

                return (
                  <TableCell>{item[columnKey]}</TableCell>
                );

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