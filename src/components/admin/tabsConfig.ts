import { crear_persona,  eliminar_persona, actualizar_persona } from "@/api/admin/PersonaApi";
import { crear_matricula, eliminar_matricula, actualizar_matricula } from "@/api/admin/MatriculaApi";
import { crear_curso,    eliminar_curso , actualizar_curso   } from "@/api/admin/CursoApi";
import { crear_programa, eliminar_programa , actualizar_programa} from "@/api/admin/ProgramaApi";
import { crear_area,     eliminar_area    , actualizar_area } from "@/api/admin/AreaApi";
import { crear_sede,     eliminar_sede , actualizar_sede    } from "@/api/admin/SedeApi";
import { crear_centro,   eliminar_centro , actualizar_centro  } from "@/api/admin/CentroApi";
import { crear_usuario,  eliminar_usuario, actualizar_usuario  } from "@/api/admin/UsuarioApi";
import { crear_credencial, eliminar_credencial, actualizar_credencial } from "@/api/admin/CredencialApi";


const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year:  "numeric",
    month: "2-digit",
    day:   "2-digit",
  });
};
export const getTabsConfig = (
  {
    personas, cursos, programas, areas, sedes, centros,
    usuarios, roles, municipios, aplicativos,
  }: Record<string, any[]>,
  cargar: (m: string) => void
) => [
  // ── Personas ──────────────────────────────────────────────────────────────
  {
    key: "personas", label: "Personas", hasEstado: true,
    columns: [
      { key: "id_persona",     label: "ID"            },
      { key: "nombre",         label: "Nombre"        },
      { key: "identificacion", label: "Identificación"},
      { key: "correo",         label: "Correo"        },
      { key: "cargo",          label: "Cargo"         },
      { key: "estado",         label: "Estado"        },
      
    ],
    // columnas con nombre resuelto para la tabla
    resolveRow: (item: any) => ({
      ...item,
      municipio_nombre: municipios.find((m) => m.id_municipio === item.fk_municipo)?.nombre ?? "—",
    }),
    fields: () => [
      { key: "nombre",         label: "Nombre"                         },
      { key: "identificacion", label: "Identificación", type: "number" },
      { key: "telefono",       label: "Teléfono"                       },
      { key: "direccion",      label: "Dirección"                      },
      { key: "correo",         label: "Correo"                         },
      { key: "genero", label: "Género", options: [
        { value: "masculino", label: "Masculino" },
        { value: "femenino",  label: "Femenino"  },
        { value: "otro",      label: "Otro"      },
      ]},
      { key: "cargo", label: "Cargo", options: [
        { value: "aprendiz",    label: "Aprendiz"    },
        { value: "instructor",  label: "Instructor"  },
        { value: "coordinador", label: "Coordinador" },
        { value: "admin",       label: "Admin"       },
      ]},
      { key: "estado", label: "Estado", options: [
        { value: "activo",   label: "Activo"   },
        { value: "inactivo", label: "Inactivo" },
      ]},
      { key: "fk_municipo", label: "Municipio", options: municipios.map((m) => ({
          value: String(m.id_municipio), label: m.nombre,
        }))},
    ],
    saveFn: async (v: any) => { await crear_persona({ ...v, fk_municipo: Number(v.fk_municipo) }); cargar("personas"); },
    deleteFn: eliminar_persona,
    idKey: "id_persona",
updateFn: async (id: number, v: any) => {
  await actualizar_persona(id, { ...v, fk_municipo: Number(v.fk_municipo) });
  cargar("personas");
},
  },

  // ── Matrículas ─────────────────────────────────────────────────────────────
  {
    key: "matriculas", label: "Matrículas",
    columns: [
      { key: "id_matricula",    label: "ID"      },
      { key: "nombre_persona",  label: "Persona" },
      { key: "codigo_curso",    label: "Curso"   },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_persona: personas.find((p) => p.id_persona === item.fk_persona)?.nombre ?? "—",
      codigo_curso:   cursos.find((c) => c.id_curso === item.fk_curso)?.codigo ?? "—",
    }),
    fields: () => [
      { key: "fk_persona", label: "Persona", options: personas.map((p) => ({
          value: String(p.id_persona), label: `${p.nombre} — ${p.identificacion}`,
        }))},
      { key: "fk_curso", label: "Curso", options: cursos.map((c) => ({
          value: String(c.id_curso), label: `Ficha ${c.codigo}`,
        }))},
    ],
    saveFn: async (v: any) => {
      const datos = { fk_persona: Number(v.fk_persona), fk_curso: Number(v.fk_curso) };
      if (isNaN(datos.fk_persona) || isNaN(datos.fk_curso))
        throw new Error("Selecciona una persona y un curso válidos.");
      await crear_matricula(datos);
      cargar("matriculas");
    },
    deleteFn: eliminar_matricula,
    idKey: "id_matricula",
updateFn: async (id: number, v: any) => {
  await actualizar_matricula(id, {
    fk_persona: Number(v.fk_persona),
    fk_curso:   Number(v.fk_curso),
  });
  cargar("matriculas");
},
  },

  // ── Cursos ─────────────────────────────────────────────────────────────────
  {
    key: "cursos", label: "Cursos", hasEstado: true,
    columns: [
      { key: "id_curso",        label: "ID"       },
      { key: "codigo",          label: "Ficha"    },
      { key: "nombre_area",     label: "Área"     },
      { key: "nombre_programa", label: "Programa" },
      { key: "fecha_inicio_fmt",    label: "Inicio"   },
      { key: "fecha_fin_fmt",       label: "Fin"      },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_area:     areas.find((a) => a.id_area === item.fk_area)?.nombre ?? "—",
      nombre_programa: programas.find((p) => p.id_programa === item.fk_programa)?.nombre ?? "—",
      fecha_inicio_fmt: formatDate(item.fecha_inicio),
      fecha_fin_fmt: formatDate(item.fecha_fin),
    }),
    fields: () => [
      { key: "codigo",       label: "Código / Ficha", type: "number" },
      { key: "fecha_inicio", label: "Fecha inicio",   type: "date"   },
      { key: "fecha_fin",    label: "Fecha fin",      type: "date"   },
      { key: "fin_lectiva",  label: "Fin lectiva",    type: "date"   },
      { key: "fk_area", label: "Área", options: areas.map((a) => ({
          value: String(a.id_area), label: a.nombre,
        }))},
      { key: "fk_programa", label: "Programa", options: programas.map((p) => ({
          value: String(p.id_programa), label: p.nombre,
        }))},
      { key: "lider", label: "Líder", options: personas.map((p) => ({
          value: String(p.id_persona), label: p.nombre,
        }))},
    ],
    saveFn: async (v: any) => {
      await crear_curso({
        ...v, codigo: Number(v.codigo), fk_area: Number(v.fk_area),
        fk_programa: Number(v.fk_programa), lider: Number(v.lider),
      });
      cargar("cursos");
    },
    deleteFn: eliminar_curso,
    idKey: "id_curso",
updateFn: async (id: number, v: any) => {
  await actualizar_curso(id, {
    ...v, codigo: Number(v.codigo), fk_area: Number(v.fk_area),
    fk_programa: Number(v.fk_programa), lider: Number(v.lider),
  });
  cargar("cursos");
},
  },

  // ── Programas ──────────────────────────────────────────────────────────────
  {
    key: "programas", label: "Programas",
    columns: [
      { key: "id_programa", label: "ID"     },
      { key: "nombre",      label: "Nombre" },
      { key: "tipo",        label: "Tipo"   },
    ],
    fields: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo", options: [
        { value: "técnico",   label: "Técnico"   },
        { value: "tecnólogo", label: "Tecnólogo" },
        { value: "auxiliar",  label: "Auxiliar"  },
        { value: "operario",  label: "Operario"  },
      ]},
    ],
    saveFn: async (v: any) => { await crear_programa(v); cargar("programas"); },
    deleteFn: eliminar_programa,
    idKey: "id_programa",
updateFn: async (id: number, v: any) => {
  await actualizar_programa(id, v);
  cargar("programas");
},
  },

  // ── Áreas ──────────────────────────────────────────────────────────────────
  {
    key: "areas", label: "Áreas",
    columns: [
      { key: "id_area",    label: "ID"    },
      { key: "nombre",     label: "Nombre"},
      { key: "nombre_sede", label: "Sede" },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_sede: sedes.find((s) => s.id_sede === item.fk_sede)?.nombre ?? "—",
    }),
    fields: () => [
      { key: "nombre", label: "Nombre" },
      { key: "fk_sede", label: "Sede", options: sedes.map((s) => ({
          value: String(s.id_sede), label: s.nombre,
        }))},
    ],
    saveFn: async (v: any) => {
      await crear_area({ ...v, fk_sede: Number(v.fk_sede) });
      cargar("areas");
    },
    deleteFn: eliminar_area,
    idKey: "id_area",
updateFn: async (id: number, v: any) => {
  await actualizar_area(id, { ...v, fk_sede: Number(v.fk_sede) });
  cargar("areas");
},

  },

  // ── Sedes ──────────────────────────────────────────────────────────────────
  {
    key: "sedes", label: "Sedes",
    columns: [
      { key: "id_sede",         label: "ID"               },
      { key: "nombre",          label: "Nombre"           },
      { key: "nombre_centro",   label: "Centro Formación" },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_centro: centros.find((c) => c.id_centro_formacion === item.fk_centro_formacion)?.nombre ?? "—",
    }),
    fields: () => [
      { key: "nombre", label: "Nombre" },
      { key: "centro_formacion_fk", label: "Centro de Formación", options: centros.map((c) => ({
          value: String(c.id_centro_formacion), label: c.nombre,
        }))},
    ],
    saveFn: async (v: any) => {
      await crear_sede({ ...v, centro_formacion_fk: Number(v.centro_formacion_fk) });
      cargar("sedes");
    },
    deleteFn: eliminar_sede,
    idKey: "id_sede",
updateFn: async (id: number, v: any) => {
  await actualizar_sede(id, { nombre: v.nombre });
  cargar("sedes");
},
  },

  // ── Centros ────────────────────────────────────────────────────────────────
  {
    key: "centros", label: "Centros",
    columns: [
      { key: "id_centro_formacion", label: "ID"     },
      { key: "nombre",              label: "Nombre" },
    ],
    fields: [{ key: "nombre", label: "Nombre" }],
    saveFn: async (v: any) => { await crear_centro(v); cargar("centros"); },
    deleteFn: eliminar_centro,
    idKey: "id_centro_formacion",
updateFn: async (id: number, v: any) => {
  await actualizar_centro(id, { nombre: v.nombre });
  cargar("centros");
},
  },

  // ── Usuarios ───────────────────────────────────────────────────────────────
  {
    key: "usuarios", label: "Usuarios",
    columns: [
      { key: "id_usuario",       label: "ID"          },
      { key: "nombre_persona",   label: "Persona"     },
      { key: "nombre_aplicativo", label: "Aplicativo" },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_persona:    personas.find((p) => p.id_persona === item.fk_persona)?.nombre ?? "—",
      nombre_aplicativo: aplicativos.find((a) => a.id_aplicativo === item.fk_aplicativo)?.nombre ?? "—",
    }),
    fields: () => [
      { key: "fk_persona", label: "Persona", options: personas.map((p) => ({
          value: String(p.id_persona),
          label: `${p.nombre} — ${p.identificacion}`,
        }))},
      { key: "fk_aplicativo", label: "Aplicativo", options: aplicativos.map((a) => ({
          value: String(a.id_aplicativo), label: a.nombre,
        }))},
    ],
    saveFn: async (v: any) => {
      const datos = {
        fk_persona:    Number(v.fk_persona),
        fk_aplicativo: Number(v.fk_aplicativo),
      };
      if (isNaN(datos.fk_persona)) throw new Error("Selecciona una persona válida.");
      await crear_usuario(datos);
      cargar("usuarios");
    },
    deleteFn: eliminar_usuario,
    idKey: "id_usuario",
updateFn: async (id: number, v: any) => {
  await actualizar_usuario(id, {
    fk_persona:    Number(v.fk_persona),
    fk_aplicativo: Number(v.fk_aplicativo),
  });
  cargar("usuarios");
},
  },

  // ── Credenciales ───────────────────────────────────────────────────────────
  {
    key: "credenciales", label: "Credenciales",
    columns: [
      { key: "id_credencial", label: "ID"       },
      { key: "login",         label: "Login"    },
      { key: "nombre_rol",    label: "Rol"      },
      { key: "nombre_usuario", label: "Usuario" },
    ],
    resolveRow: (item: any) => ({
      ...item,
      nombre_rol:     roles.find((r) => r.id_rol === item.fk_rol)?.nombre ?? "—",
      nombre_usuario: personas.find((p) => {
        const u = usuarios.find((u) => u.id_usuario === item.fk_usuario);
        return u && p.id_persona === u.fk_persona;
      })?.nombre ?? `Usuario #${item.fk_usuario}`,
    }),
    fields: () => [
      { key: "fk_usuario", label: "Usuario", options: usuarios.map((u) => {
          const persona = personas.find((p) => p.id_persona === u.fk_persona);
          return {
            value: String(u.id_usuario),
            label: persona ? `${persona.nombre} — ${persona.identificacion}` : `Usuario #${u.id_usuario}`,
          };
        })},
      { key: "login",    label: "Login"      },
      { key: "password", label: "Contraseña", type: "password" },
      { key: "fk_rol", label: "Rol", options: roles.map((r) => ({
          value: String(r.id_rol), label: r.nombre,
        }))},
    ],
    saveFn: async (v: any) => {
      if (!v.login || !v.password) throw new Error("Login y contraseña son obligatorios.");
      await crear_credencial({
        login: v.login, password: v.password,
        fk_rol: Number(v.fk_rol), fk_usuario: Number(v.fk_usuario),
      });
      cargar("credenciales");
    },
    deleteFn: eliminar_credencial,
    idKey: "id_credencial",
updateFn: async (id: number, v: any) => {
  const datos: any = { fk_rol: Number(v.fk_rol), fk_usuario: Number(v.fk_usuario), login: v.login };
  if (v.password) datos.password = v.password; // solo actualiza si se ingresó nueva contraseña
  await actualizar_credencial(id, datos);
  cargar("credenciales");
},
  },
];