import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export function DashboardCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Seguimiento",
      description: "Lleva el control de la etapa productiva de los aprendices SENA.",
      img: "/img/biotic.jpg",
      path: "/seguimiento",
    },
    {
      title: "Historial",
      description: "Consulta a los aprendices certificados, en proceso y por certificar.",
      img: "/img/biotic.jpg",
      path: "/docs",
    },
    {
      title: "Formatos",
      description: "Accede y gestiona los formatos necesarios del proceso.",
      img: "/img/biotic.jpg",
      path: "/format",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cards.map((card, index) => (
        <Card
          key={index}
          isPressable
          onPress={() => navigate(card.path)}
          className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
        >
          <img
            src={card.img}
            alt={card.title}
            className="h-44 w-full object-cover"
          />
          <CardBody className="p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{card.description}</p>
            </div>
            <Button
              color="primary"
              className="mt-auto rounded-full w-full"
              onPress={() => navigate(card.path)}
            >
              Ingresar
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}