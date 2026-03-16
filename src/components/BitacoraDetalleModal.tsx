import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip
} from "@heroui/react";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import worker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

const BASE_URL = "http://localhost:3001";

export default function BitacoraDetalleModal({ isOpen, onClose, bitacora }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const pdfUrl = bitacora?.bitacora_pdf
    ? `${BASE_URL}/uploads/bitacoras/${bitacora.bitacora_pdf}`
    : null;
const descargarPDF = async () => {
  if (!pdfUrl) return;

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = bitacora?.bitacora_pdf || "bitacora.pdf";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error descargando PDF:", error);
  }
};
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalContent>
        <ModalHeader className="flex items-center gap-3">
          <span>Bitácora — {bitacora?.fecha}</span>

          {bitacora?.estado && (
            <Chip
              color={
                bitacora.estado === "aceptada"
                  ? "success"
                  : bitacora.estado === "pendiente"
                  ? "warning"
                  : "danger"
              }
              variant="flat"
              size="sm"
            >
              {bitacora.estado}
            </Chip>
          )}
        </ModalHeader>

        <ModalBody className="flex flex-col items-center overflow-auto max-h-[75vh]">
          {pdfUrl ? (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p>Cargando PDF...</p>}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
  key={index}
  pageNumber={index + 1}
  width={1200}
  devicePixelRatio={2}
  renderTextLayer={true}
  renderAnnotationLayer={true}
  className="mb-4 shadow-lg"
/>
              ))}
            </Document>
          ) : (
            <p className="text-default-400 text-sm">
              No hay archivo disponible para esta bitácora.
            </p>
          )}
        </ModalBody>

        <ModalFooter className="flex justify-between">
          {pdfUrl && (
            <Button
                variant="flat"
                color="primary"
                className="bg-gradient-to-r from-[#39A900] to-[#5cd600] 
             hover:from-[#5cd600] hover:to-[#39A900]
             transition-all duration-300 
             hover:-translate-y-0.5 
             hover:shadow-lg hover:shadow-[#39A900]/40
             active:scale-95 text-white"
                onPress={descargarPDF}
              >
  Descargar PDF
</Button>
          )}

          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}