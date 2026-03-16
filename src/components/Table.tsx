import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, Pagination, Chip,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox,
} from "@heroui/react";
import SeguimientosModal from "./ModalSeguimiento";
import type { SortDescriptor } from "@heroui/react";
import { listar_aprendices } from "@/api/PersonasApi";
import { listar_areas } from "@/api/AreasApi";
import ObservacionModal from "./Textarea";
import {actualizar_observacion,listar_practicas } from "@/api/PracticaApi";
import { listar_matriculas_por_alumno } from "@/api/Matriculas";
import { number } from "zod";
import { Tooltip } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import CrearPracticaModal from "./CrearPracticaModal";

export const columns = [
  { name: "Nombre",         uid: "name",      sortable: true  },
  { name: "Identificación", uid: "age",       sortable: true  },
  { name: "Email",          uid: "email",     sortable: false },
  { name: "Área",           uid: "area",      sortable: false },
  { name: "Programa",       uid: "programa",  sortable: true  },
  { name: "Ficha",          uid: "number",    sortable: false },
  { name: "Fecha Inicio",   uid: "startDate", sortable: false },
  { name: "Fecha Fin",      uid: "endDate",   sortable: true  },
  { name: "Observacion",      uid: "observacion",   sortable: true  },
  { name: "Avance",         uid: "avance",    sortable: true  },
  { name: "Estado",         uid: "estado",    sortable: true  },
  { name: "Acciones",       uid: "actions",   sortable: false },
];

export const statusOptions = [
  { name: "Activo",     uid: "activo"     },
  { name: "Inactivo",   uid: "inactivo"   },
  { name: "Suspendido", uid: "suspendido" },
];

const statusColorMap: Record<string, "success" | "danger" | "warning" | "default"> = {
  activo:   "success",
  activa:   "success",  // ← el estado que viene de etapa_practica
  inactivo: "danger",
  suspendido: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name", "age", "area", "programa", "number",
  "startDate", "endDate","observacion", "avance", "estado", "actions",
];

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year:  "numeric",
    month: "2-digit",
    day:   "2-digit",
  });
};

// ── Iconos ────────────────────────────────────────────────────────────────────
export const SearchIcon = (props: any) => (
  <svg aria-hidden fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="M11.5 21C16.7 21 21 16.7 21 11.5S16.7 2 11.5 2 2 6.3 2 11.5 6.3 21 11.5 21Z"
      stroke="currentColor" strokeWidth="2" />
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const VerticalDotsIcon = ({ size = 24 }: any) => (
  <svg viewBox="0 0 24 24" width={size} fill="currentColor">
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1
      0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2
      2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export const PlusIcon = ({ size = 24 }: any) => (
  <svg aria-hidden fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...props }: any) => (
  <svg aria-hidden fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      strokeMiterlimit={10} strokeWidth={strokeWidth} />
  </svg>
);

const FilterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ── Componente principal ──────────────────────────────────────────────────────
export default function TableInfo() {

  const [dataApi, setDataApi]               = React.useState<any[]>([]);
  const [loading, setLoading]               = React.useState(true);
  const [filterValue, setFilterValue]       = React.useState("");
  const [rowsPerPage, setRowsPerPage]       = React.useState(5);
  const [page, setPage]                     = React.useState(1);
  const [areas, setAreas]                   = React.useState<string[]>([]);
  const [selectedAreas, setSelectedAreas]   = React.useState<string[]>([]);
  const [areaDropdownOpen, setAreaDropdownOpen] = React.useState(false);
  const [statusFilter, setStatusFilter]     = React.useState<any>("all");
  const [visibleColumns, setVisibleColumns] = React.useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedAlumno, setSelectedAlumno] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen]       = React.useState(false);
  const [isObservacionOpen, setIsObservacionOpen] = React.useState(false);
  const [alumnoObservacion, setAlumnoObservacion] = React.useState<any>(null);
  const [isCrearPracticaOpen, setIsCrearPracticaOpen] = React.useState(false);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const areaButtonRef = useRef<HTMLButtonElement>(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
const cargar = React.useCallback(async () => {
  setLoading(true);
  try {
    const [aprendices, areasData, practicas] = await Promise.all([
      listar_aprendices(),
      listar_areas(),
      listar_practicas(),
    ]);

    const practicaMap: Record<number, any> = {};
    practicas.forEach((p: any) => {
      practicaMap[p.fk_matricula] = p;
    });

    const transformado = await Promise.all(
      aprendices.map(async (persona: any) => {
        const matriculas = await listar_matriculas_por_alumno(persona.id_persona);
        const practica = matriculas
          .map((m: any) => practicaMap[m.id_matricula])
          .find((p: any) => p != null) ?? null;

        return {
          id:           persona.id_persona,
          name:         persona.nombre,
          age:          persona.identificacion,
          email:        persona.correo,
          programa:     persona.programa,
          area:         persona.area        ?? "",
          number:       persona.ficha,
          estado:       persona.estado,
          startDate:    practica?.fecha_inicio ? formatDate(practica.fecha_inicio) : "",
          endDate:      practica?.fecha_fin    ? formatDate(practica.fecha_fin)    : "",
          avance:       practica?.avance       ?? "",
          observacion:  practica?.observacion  ?? "",
          id_practica:  practica?.id_etapa_practica ?? null,
          seguimientos: persona.total_seguimientos ?? 0,
        };
      })
    );

    setDataApi(transformado);
    setAreas(areasData.map((a: any) => a.nombre));
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  cargar();
}, [cargar]);

  // ── Cerrar dropdown al hacer click fuera ──────────────────────────────────
  useEffect(() => {
    const handleClickOutside = () => setAreaDropdownOpen(false);
    if (areaDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [areaDropdownOpen]);

  // ── Columnas visibles ─────────────────────────────────────────────────────
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns]);

  // ── Filtrado ──────────────────────────────────────────────────────────────
  const filteredItems = React.useMemo(() => {
    let filtered = [...dataApi];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        String(item.age).includes(filterValue) ||
        String(item.number).includes(filterValue)
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filtered = filtered.filter((item) =>
        Array.from(statusFilter).includes(item.estado)
      );
    }

    if (selectedAreas.length > 0) {
      filtered = filtered.filter((item) => selectedAreas.includes(item.area));
    }

    return filtered;
  }, [dataApi, filterValue, statusFilter, selectedAreas]);

  // ── Paginación ────────────────────────────────────────────────────────────
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  // ── Ordenamiento ──────────────────────────────────────────────────────────
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first  = a[sortDescriptor.column as string];
      const second = b[sortDescriptor.column as string];
      const cmp    = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // ── Render celda ──────────────────────────────────────────────────────────
  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "estado":
  // Si no tiene práctica asignada
  if (!item.id_practica) {
    return (
      <Tooltip content="Este aprendiz no tiene etapa práctica asignada" placement="top">
        <Chip
          variant="flat"
          size="sm"
          className="border-none gap-1 text-gray-400 bg-gray-100 cursor-help"
          startContent={
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          }
        >
          Sin práctica
        </Chip>
      </Tooltip>
    );
  }

  // Si tiene práctica muestra el estado normal
  return (
    <Chip
      color={statusColorMap[item.estado] ?? "default"}
      variant="dot"
      size="sm"
      className="capitalize border-none gap-1 text-default-600"
    >
      {item.estado}
    </Chip>
  );
      // En renderCell, corrige el case "actions":
// ── case "observacion" — tooltip con texto completo ──
case "observacion":
  return item.observacion ? (
    <Tooltip
      content={item.observacion}
      placement="top"
      classNames={{
        content: "max-w-[250px] text-xs p-2 bg-gray-800 text-white rounded-lg",
      }}
    >
      <span className="text-sm text-gray-600 line-clamp-1 max-w-[150px] cursor-help border-b border-dashed border-gray-300">
        {item.observacion}
      </span>
    </Tooltip>
  ) : (
    <span className="text-xs text-gray-300">—</span>
  );

// ── case "actions" — iconos directos ──
case "actions":
  return (
    <div className="flex items-center gap-1">

      {/* Ver seguimientos */}
      <Tooltip content="Ver seguimientos" placement="top">
        <button
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-150"
          onClick={() => {
            setSelectedAlumno(item);
            setIsModalOpen(true);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </button>
      </Tooltip>

      {/* Realizar observación — solo si tiene práctica */}
      {item.id_practica ? (
        <Tooltip content="Realizar observación" placement="top">
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#39A900] hover:bg-[#39A900]/10 transition-all duration-150"
            onClick={() => {
              setAlumnoObservacion(item);
              setIsObservacionOpen(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </Tooltip>
      ) : (
        <Tooltip content="Sin etapa práctica" placement="top">
          <button className="p-1.5 rounded-lg text-gray-200 cursor-not-allowed" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </Tooltip>
      )}

    </div>
  );
  // ── Avatar con iniciales ──
case "name": {
  const initials = item.name
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
    "bg-pink-100 text-pink-600",
    "bg-teal-100 text-teal-600",
    "bg-yellow-100 text-yellow-600",
  ];

  // color consistente basado en el nombre
  const colorIndex = item.name.charCodeAt(0) % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div className="flex items-center gap-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center
        text-xs font-bold flex-shrink-0 ${colorClass}
      `}>
        {initials}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">{item.name}</span>
        <span className="text-xs text-gray-400">{item.email}</span>
      </div>
    </div>
  );
}

// ── Barra de progreso ──
case "avance": {
  const valor = parseInt(item.avance) || 0;
  const color =
    valor >= 75 ? "#39A900" :
    valor >= 40 ? "#f5a524" :
    valor > 0   ? "#f31260" :
    "#e4e4e7";

  return item.id_practica ? (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${valor}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 min-w-[30px]">
        {valor}%
      </span>
    </div>
  ) : (
    <span className="text-xs text-gray-300">—</span>
  );
}
      default:
        return item[columnKey as string];
    }
  }, []);

  // ── Header columna Área ───────────────────────────────────────────────────
  const renderColumnHeader = React.useCallback((column: { name: string; uid: string }) => {
  if (column.uid !== "area") return column.name;

  const isActive = selectedAreas.length > 0;

  return (
    <button
      ref={areaButtonRef}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setAreaDropdownOpen((prev) => !prev);
      }}
      className={`
        flex items-center gap-1.5 cursor-pointer select-none
        border-none p-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider
        transition-all duration-200
        ${isActive
          ? "bg-[#39A900]/15 text-[#39A900] ring-1 ring-[#39A900]/40"
          : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }
      `}
    >
      {/* Icono embudo — relleno cuando está activo */}
      <svg
        width="12" height="12" viewBox="0 0 24 24"
        fill={isActive ? "#39A900" : "none"}
        stroke={isActive ? "#39A900" : "currentColor"}
        strokeWidth="2"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>

      <span>Área</span>

      {/* Badge con conteo */}
      {isActive && (
        <span className="
          inline-flex items-center justify-center
          min-w-[18px] h-[18px] px-1
          bg-[#39A900] text-white
          text-[10px] font-bold rounded-full
          animate-pulse
        ">
          {selectedAreas.length}
        </span>
      )}

      {/* Chevron que rota cuando está abierto */}
      <svg
        width="10" height="10" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        className={`transition-transform duration-200 ${areaDropdownOpen ? "rotate-180" : ""}`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}, [selectedAreas, areaDropdownOpen]);

  // ── topContent ────────────────────────────────────────────────────────────
  const topContent = React.useMemo(() => (
  <div className="flex flex-col gap-6 w-full">

    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

      <Input
        isClearable
        size="sm"
        variant="bordered"
        placeholder="Buscar por nombre o identificación..."
        startContent={<SearchIcon className="text-default-400" />}
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={(v) => {
          setFilterValue(v);
          setPage(1);
        }}
        classNames={{
          base: "w-full sm:max-w-md",
          inputWrapper:
            "border-2 border-default-200 hover:border-primary focus-within:border-primary transition-colors",
          input: "text-sm",
        }}
      />

        <div className="flex gap-3">

          {/* Filtro Estado */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Filtrar por estado"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((s) => (
                <DropdownItem key={s.uid} className="capitalize">
                  {capitalize(s.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Columnas visibles */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Columnas visibles"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((col) => (
                <DropdownItem key={col.uid} className="capitalize">
                  {capitalize(col.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Agregar nuevo */}
          <Button
  className="bg-gradient-to-r from-[#39A900] to-[#5cd600] text-white
             hover:opacity-90 transition-all duration-200
             font-medium rounded-xl"
  endContent={<PlusIcon size={16} />}
  size="sm"
  onPress={() => setIsCrearPracticaOpen(true)}
>
  Agregar etapa práctica
</Button>

        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredItems.length} aprendices
        </span>
        <div className="flex items-center gap-2">
  <span className="text-xs text-gray-400">Filas por página:</span>
  <Select
    size="sm"
    variant="bordered"
    selectedKeys={[String(rowsPerPage)]}
    onSelectionChange={(keys) => {
      const value = Array.from(keys)[0];
      setRowsPerPage(Number(value));
      setPage(1);
    }}
    classNames={{
      trigger: "h-8 min-h-8 w-20 border-gray-200 hover:border-[#39A900]/50 data-[focus=true]:border-[#39A900]",
      value: "text-xs font-medium text-gray-600",
    }}
  >
    <SelectItem key="5">5</SelectItem>
    <SelectItem key="10">10</SelectItem>
    <SelectItem key="15">15</SelectItem>
    <SelectItem key="20">20</SelectItem>
  </Select>
</div>
      </div>
    </div>
  ), [filterValue, statusFilter, visibleColumns, filteredItems.length, rowsPerPage]);

  // ── bottomContent ─────────────────────────────────────────────────────────
  const bottomContent = React.useMemo(() => (
    <div className="py-2 px-2 flex justify-center">
      {pages > 0 && (
        <Pagination
  isCompact
  showControls
  classNames={{
    cursor: "bg-[#39A900] text-white font-medium shadow-sm",
    item: "text-gray-500 hover:text-gray-800",
  }}
  color="default"
  page={page}
  total={pages}
  variant="light"
  onChange={setPage}
/>
      )}
    </div>
  ), [page, pages]);

  // ── Posición del dropdown ─────────────────────────────────────────────────
  const dropdownPosition = React.useMemo(() => {
    if (!areaButtonRef.current) return { top: 0, left: 0 };
    const rect = areaButtonRef.current.getBoundingClientRect();
    return {
      top:  rect.bottom + window.scrollY + 4,
      left: rect.left   + window.scrollX,
    };
  }, [areaDropdownOpen]);

  
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ── Header de la tarjeta ── */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Aprendices
        </h2>
      </div>

      {/* ── Tabla ── */}
      <div className="px-6 pb-6">
        <Table
          isCompact
          removeWrapper
          aria-label="Tabla de aprendices"
          topContent={topContent}
          topContentPlacement="outside"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            th: [
              "bg-[#F8F9FA]",
              "text-gray-500",
              "text-xs",
              "font-semibold",
              "uppercase",
              "tracking-wider",
              "border-b",
              "border-gray-100",
              "py-3",
            ],
            td: [
              "py-3",
              "border-b",
              "border-gray-50",
              "text-gray-700",
              "text-sm",
              "first:group-data-[first=true]/tr:before:rounded-none",
              "last:group-data-[first=true]/tr:before:rounded-none",
              "group-data-[middle=true]/tr:before:rounded-none",
              "first:group-data-[last=true]/tr:before:rounded-none",
              "last:group-data-[last=true]/tr:before:rounded-none",
            ],
           tr: [
              "transition-colors duration-150",
              // ── zebra striping ──
              "odd:bg-white",
              "even:bg-[#F8FFFE]",  // ← verde SENA muy suave en filas pares
              "hover:bg-[#39A900]/5 hover:!bg-[#39A900]/5", // ← hover verde en todas
            ],
          }}
        >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {renderColumnHeader(column)}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={sortedItems}
          isLoading={loading}
          loadingContent="Cargando datos..."
          emptyContent="No hay registros"
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
          </div>
          </div>

      {/* ── Dropdown áreas via portal ── */}
      {areaDropdownOpen && createPortal(
        <div
          style={{
            position: "fixed",
            top:  dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 9999,
          }}
          className="min-w-[180px] rounded-large border border-default-200 bg-background p-3 shadow-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-tiny text-default-400 font-medium uppercase tracking-wide mb-2">
            Filtrar por área
          </p>
          <div className="flex flex-col gap-1">
            {areas.map((area) => (
              <Checkbox
                key={area}
                size="sm"
                isSelected={selectedAreas.includes(area)}
                onValueChange={(checked) => {
                  setSelectedAreas((prev) =>
                    checked ? [...prev, area] : prev.filter((a) => a !== area)
                  );
                  setPage(1);
                }}
              >
                {area}
              </Checkbox>
            ))}
          </div>
          {selectedAreas.length > 0 && (
            <>
              <div className="border-t border-divider my-2" />
              <Button
                size="sm" variant="light" color="danger" className="w-full"
                onPress={() => { setSelectedAreas([]); setPage(1); }}
              >
                Limpiar filtro
              </Button>
            </>
          )}
        </div>,
        document.body
      )}

      <SeguimientosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alumno={selectedAlumno}
        onReopen={()=>setIsModalOpen(true)}
      />

<ObservacionModal
  isOpen={isObservacionOpen}
  onClose={() => setIsObservacionOpen(false)}
  alumno={alumnoObservacion}
  onSucces={cargar}
/>

<CrearPracticaModal
  isOpen={isCrearPracticaOpen}
  onClose={() => setIsCrearPracticaOpen(false)}
  aprendices={dataApi}
  onSuccess={cargar}
/>
    </>
  );
}