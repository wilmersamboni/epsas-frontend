import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Select, SelectItem,
} from "@heroui/react";

export interface FieldConfig {
  key: string;
  label: string;
  type?: string;
  options?: { value: string; label: string }[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (key: string, val: string) => void;
  onSave: () => void;
  loading: boolean;
  error: string;
}

export default function FormModal({
  isOpen, onClose, title, fields, values, onChange, onSave, loading, error,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="md">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className="flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
              {fields.map((f) =>
                f.options ? (
                  <Select
                    key={f.key}
                    label={f.label}
                    variant="bordered"
                    selectedKeys={values[f.key] ? [String(values[f.key])] : []}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0];
                      onChange(f.key, String(val ?? ""));
                    }}
                  >
                    {f.options.map((o) => (
                      <SelectItem key={o.value}>{o.label}</SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    key={f.key}
                    label={f.label}
                    type={f.type || "text"}
                    variant="bordered"
                    value={values[f.key] || ""}
                    onChange={(e) => onChange(f.key, e.target.value)}
                  />
                )
              )}
              {error && <p className="text-tiny text-danger">{error}</p>}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={close} isDisabled={loading}>
                Cancelar
              </Button>
              <Button
                className="bg-[#39A900] text-white hover:opacity-90 font-medium"
                onPress={onSave}
                isLoading={loading}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}