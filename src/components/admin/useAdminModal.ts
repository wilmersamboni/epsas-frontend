import { useState, useEffect, useRef } from "react";
import type { FieldConfig } from "./FormModal";

export function useAdminModal() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [modalTitle,  setModalTitle]  = useState("");
  const [modalFields, setModalFields] = useState<FieldConfig[]>([]);
  const [modalValues, setModalValues] = useState<Record<string, any>>({});
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState("");
  const [editingId,   setEditingId]   = useState<number | null>(null); // ← nuevo

  const modalValuesRef = useRef<Record<string, any>>({});
  const saveFnRef      = useRef<(values: Record<string, any>) => Promise<void>>(async () => {});

  useEffect(() => {
    modalValuesRef.current = modalValues;
  }, [modalValues]);

  const abrirModal = (
    title: string,
    fields: FieldConfig[],
    initial: Record<string, any>,
    saveFn: (values: Record<string, any>) => Promise<void>,
    editId: number | null = null // ← nuevo parámetro
  ) => {
    setModalTitle(title);
    setModalFields(fields);
    setModalValues(initial);
    modalValuesRef.current = initial;
    saveFnRef.current = saveFn;
    setEditingId(editId);
    setError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveFnRef.current(modalValuesRef.current);
      setModalOpen(false);
    } catch (e: any) {
      setError(e.message || "Error al guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, val: string) => {
    setModalValues((p) => {
      const nuevo = { ...p, [key]: val };
      modalValuesRef.current = nuevo;
      return nuevo;
    });
  };

  return {
    modalOpen, setModalOpen,
    modalTitle, modalFields, modalValues,
    saving, error, editingId,
    abrirModal, handleSave, handleChange,
  };
}