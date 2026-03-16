import { useEffect, useState, useCallback } from "react";
import {
  Tab, Tabs, Button,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";

import AdminTable        from "@/components/admin/AdminTable";
import FormModal         from "@/components/admin/FormModal";
import { PlusIcon }      from "@/components/admin/AdminIcons";
import { useAdminModal } from "@/components/admin/useAdminModal";
import { getTabsConfig } from "@/components/admin/tabsConfig";

import { listar_personas    } from "@/api/admin/PersonaApi";
import { listar_matriculas  } from "@/api/admin/MatriculaApi";
import { listar_cursos      } from "@/api/admin/CursoApi";
import { listar_programas   } from "@/api/admin/ProgramaApi";
import { listar_areas_admin } from "@/api/admin/AreaApi";
import { listar_sedes       } from "@/api/admin/SedeApi";
import { listar_centros     } from "@/api/admin/CentroApi";
import { listar_usuarios    } from "@/api/admin/UsuarioApi";
import { listar_credenciales } from "@/api/admin/CredencialApi";
import { listar_roles       } from "@/api/admin/RolApi";
import { listar_municipios  } from "@/api/admin/MunicipioApi";
import { listar_aplicativos } from "@/api/admin/AplicativoApi";

const MODULOS = [
  "personas","matriculas","cursos","programas",
  "areas","sedes","centros",
  "usuarios","credenciales","roles",
  "municipios","aplicativos",
];

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function AdminPanel() {

  const [data, setData] = useState<Record<string, any[]>>({
    personas: [], matriculas: [], cursos: [], programas: [],
    areas: [], sedes: [], centros: [],
    usuarios: [], credenciales: [], roles: [],
    municipios: [], aplicativos: [],
  });
  const [loadingMap,  setLoadingMap]  = useState<Record<string, boolean>>({});
  const [visibleCols, setVisibleCols] = useState<Record<string, Set<string>>>({});
  const [statusFilters, setStatusFilters] = useState<Record<string, Set<string>>>({});
  const modal = useAdminModal();

  // ── Carga ────────────────────────────────────────────────────────────────
  const cargar = useCallback(async (modulo: string) => {
    setLoadingMap((p) => ({ ...p, [modulo]: true }));
    try {
      const loaders: Record<string, () => Promise<any>> = {
        personas:     listar_personas,
        matriculas:   listar_matriculas,
        cursos:       listar_cursos,
        programas:    listar_programas,
        areas:        listar_areas_admin,
        sedes:        listar_sedes,
        centros:      listar_centros,
        usuarios:     listar_usuarios,
        credenciales: listar_credenciales,
        roles:        listar_roles,
        municipios:   listar_municipios,
        aplicativos:  listar_aplicativos,
      };
      const result = await loaders[modulo]();
      setData((p) => ({ ...p, [modulo]: result }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMap((p) => ({ ...p, [modulo]: false }));
    }
  }, []);

  useEffect(() => { MODULOS.forEach(cargar); }, [cargar]);

  const tabs = getTabsConfig(data, cargar);

  // ── Eliminar ──────────────────────────────────────────────────────────────
  const handleDelete = async (tab: any, item: any) => {
    const id = item[tab.idKey];
    try { await tab.deleteFn(id); cargar(tab.key); }
    catch (e) { console.error(e); }
  };

  // ── Editar ────────────────────────────────────────────────────────────────
  const handleEdit = (tab: any, item: any) => {
    const fields = typeof tab.fields === "function" ? tab.fields() : tab.fields;
    const id = item[tab.idKey];
    const initial: Record<string, any> = {};
    fields.forEach((f: any) => { initial[f.key] = item[f.key] ?? ""; });
    modal.abrirModal(
      `Editar ${tab.label.slice(0, -1)}`,
      fields, initial,
      async (v) => await tab.updateFn(id, v),
      id
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#EEF2F7] p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-[#39A900]" />
            <h1 className="text-xl font-semibold text-gray-800">Panel Administrativo</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1 ml-4">
            Gestión de personas, matrículas, cursos y estructura académica
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4">
          <Tabs
            color="success"
            variant="underlined"
            classNames={{
              tabList: "gap-4 border-b border-gray-100 w-full",
              cursor:  "bg-[#39A900]",
              tab:     "text-sm font-medium text-gray-500 data-[selected=true]:text-[#39A900]",
            }}
          >
            {tabs.map((tab) => {
              const fields = typeof tab.fields === "function" ? tab.fields() : tab.fields;

              // columnas visibles para este tab
              const visibleSet  = visibleCols[tab.key];
              const filteredCols = visibleSet
                ? tab.columns.filter((c: any) => visibleSet.has(c.key))
                : tab.columns;

              // filtro de estado para este tab
              const activeStatus = statusFilters[tab.key] ?? new Set(["all"]);

              // datos filtrados por estado
              const tabData = (data[tab.key] ?? []).filter((item: any) => {
                if (activeStatus.has("all") || activeStatus.size === 0) return true;
                return activeStatus.has(String(item.estado ?? "").toLowerCase());
              });

              return (
                <Tab key={tab.key} title={tab.label}>
                  <div className="mt-4">

                    {/* ── Toolbar ── */}
                    <div className="flex justify-end items-center gap-2 mb-4">

                      {/* Filtro estado */}
                      {tab.hasEstado && (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              size="sm" variant="flat"
                              endContent={<ChevronDownIcon />}
                            >
                              Estado
                              {!activeStatus.has("all") && activeStatus.size > 0 && (
                                <span className="ml-1 bg-[#39A900] text-white text-[10px] rounded-full px-1.5 py-0.5">
                                  {activeStatus.size}
                                </span>
                              )}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            disallowEmptySelection
                            closeOnSelect={false}
                            selectionMode="multiple"
                            selectedKeys={activeStatus}
                            onSelectionChange={(keys) => {
                              setStatusFilters((p) => ({
                                ...p,
                                [tab.key]: new Set(keys as any),
                              }));
                            }}
                          >
                            <DropdownItem key="all">Todos</DropdownItem>
                            <DropdownItem key="activo">Activo</DropdownItem>
                            <DropdownItem key="inactivo">Inactivo</DropdownItem>
                            <DropdownItem key="suspendido">Suspendido</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}

                      {/* Columnas visibles */}
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" variant="flat" endContent={<ChevronDownIcon />}>
                            Columnas
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          closeOnSelect={false}
                          selectionMode="multiple"
                          selectedKeys={visibleSet ?? new Set(tab.columns.map((c: any) => c.key))}
                          onSelectionChange={(keys) =>
                            setVisibleCols((p) => ({ ...p, [tab.key]: new Set(keys as any) }))
                          }
                        >
                          {tab.columns.map((col: any) => (
                            <DropdownItem key={col.key} className="capitalize">
                              {col.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      {/* Agregar */}
                      <Button
                        size="sm"
                        className="bg-[#39A900] text-white hover:opacity-90 font-medium"
                        startContent={<PlusIcon />}
                        onPress={() => modal.abrirModal(
                          `Crear ${tab.label.slice(0, -1)}`,
                          fields, {}, tab.saveFn
                        )}
                      >
                        Agregar {tab.label.slice(0, -1)}
                      </Button>
                    </div>

                    {/* ── Tabla ── */}
                    <AdminTable
                      columns={filteredCols}
                      data={tabData}
                      loading={loadingMap[tab.key] ?? false}
                      tab={tab}
                      onEdit={(item) => handleEdit(tab, item)}
                      onDelete={(item) => handleDelete(tab, item)}
                    />
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>

      <FormModal
        isOpen={modal.modalOpen}
        onClose={() => modal.setModalOpen(false)}
        title={modal.modalTitle}
        fields={modal.modalFields}
        values={modal.modalValues}
        onChange={modal.handleChange}
        onSave={modal.handleSave}
        loading={modal.saving}
        error={modal.error}
      />
    </div>
  );
}