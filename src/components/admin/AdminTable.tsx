import { useState, useMemo, useEffect } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Tooltip, Spinner, Pagination, Select, SelectItem, Input,
} from "@heroui/react";
import { EditIcon, TrashIcon } from "./AdminIcons";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

interface Column { key: string; label: string; }
interface Props {
  columns: Column[];
  data: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  tab?: any;
}

export default function AdminTable({ columns, data, loading, onEdit, onDelete, tab }: Props) {

  const [page, setPage]               = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch]           = useState("");
  const [sortCol, setSortCol]         = useState<string | null>(null);
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setPage(1);
    setSearch("");
    setSortCol(null);
  }, [tab?.key]);

  useEffect(() => { setPage(1); }, [data.length]);

  // ── Filtrado + ordenamiento ───────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let result = data.map((item) => ({
      raw: item,
      resolved: tab?.resolveRow ? tab.resolveRow(item) : item,
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(({ resolved }) =>
        Object.values(resolved).some((v) => String(v).toLowerCase().includes(q))
      );
    }

    if (sortCol) {
      result.sort((a, b) => {
        const av = String(a.resolved[sortCol] ?? "");
        const bv = String(b.resolved[sortCol] ?? "");
        const cmp = av.localeCompare(bv, "es", { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, sortCol, sortDir, tab]);

  const pages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleSort = (key: string) => {
    if (sortCol === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortCol(key); setSortDir("asc"); }
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-3">

      {/* ── Toolbar igual que tabla de seguimiento ── */}
      <div className="flex justify-between items-center gap-3">
        <Input
          size="sm"
          variant="bordered"
          placeholder="Buscar..."
          value={search}
          isClearable
          onClear={() => { setSearch(""); setPage(1); }}
          onValueChange={(v) => { setSearch(v); setPage(1); }}
          startContent={<SearchIcon />}
          classNames={{
            base: "max-w-xs",
            inputWrapper: "h-8 border-gray-200 hover:border-[#39A900]/50 focus-within:border-[#39A900]",
            input: "text-xs",
          }}
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {filteredData.length} de {data.length} registros
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">Filas:</span>
          <Select
            size="sm"
            variant="bordered"
            selectedKeys={[String(rowsPerPage)]}
            onSelectionChange={(keys) => {
              setRowsPerPage(Number(Array.from(keys)[0]));
              setPage(1);
            }}
            classNames={{
              trigger: "h-7 min-h-7 w-20 border-gray-200",
              value:   "text-xs text-gray-600",
            }}
          >
            <SelectItem key="5">5</SelectItem>
            <SelectItem key="10">10</SelectItem>
            <SelectItem key="20">20</SelectItem>
            <SelectItem key="50">50</SelectItem>
          </Select>
        </div>
      </div>

      {/* ── Tabla ── */}
      <Table
        removeWrapper
        aria-label="tabla admin"
        classNames={{
          th: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100 cursor-pointer select-none",
          td: "py-3 text-sm text-gray-700 border-b border-gray-50",
          tr: "hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#FAFAFA]",
        }}
      >
        <TableHeader>
          {[...columns, { key: "acciones", label: "Acciones" }].map((col) => (
            <TableColumn
              key={col.key}
              onClick={col.key !== "acciones" ? () => handleSort(col.key) : undefined}
            >
              <div className="flex items-center gap-1">
                {col.label}
                {col.key !== "acciones" && (
                  <span className="text-gray-300 text-[10px]">
                    {sortCol === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⬍"}
                  </span>
                )}
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={paginatedData}
          isLoading={loading}
          loadingContent={<Spinner />}
          emptyContent="No hay registros"
        >
          {({ raw: item, resolved }) => {
            const key = String(
              item.id_persona          ?? item.id_matricula   ??
              item.id_curso            ?? item.id_programa    ??
              item.id_area             ?? item.id_sede        ??
              item.id_centro_formacion ?? item.id_usuario     ??
              item.id_credencial       ?? item.id_rol         ??
              Math.random()
            );
            return (
              <TableRow key={key}>
                {[...columns, { key: "acciones", label: "" }].map((col) => (
                  <TableCell key={col.key}>
                    {col.key === "acciones" ? (
                      <div className="flex gap-1">
                        <Tooltip content="Editar">
                          <button onClick={() => onEdit(item)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                            <EditIcon />
                          </button>
                        </Tooltip>
                        <Tooltip content="Eliminar" color="danger">
                          <button onClick={() => onDelete(item)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                            <TrashIcon />
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <span>{resolved[col.key] ?? "—"}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>

      {/* ── Paginación centrada ── */}
      {pages > 1 && (
        <div className="flex justify-center">
          <Pagination
            isCompact
            showControls
            page={page}
            total={pages}
            onChange={setPage}
            classNames={{
              cursor: "bg-[#39A900] text-white shadow-sm",
              item:   "text-gray-500 hover:text-gray-800",
            }}
          />
        </div>
      )}
    </div>
  );
}