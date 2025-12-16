import { Card, CardHeader, CardBody } from "@heroui/card";
import { useNavigate } from "react-router-dom";


export function DashboardCards() {
  const navigate = useNavigate();  
  const cards = [
    {
      title: "Seguimiento",
      img: "/img/biotic.jpg",
      path:"/seguimiento"
    },
    {
      title: "Historial",
      img: "/img/biotic.jpg",
      path:"/docs"
    },
    {
      title: "Formatos",
      img: "/img/biotic.jpg",
      path:"/format"
    },
    {
      title: "MiChat",
      img: "/img/biotic.jpg",
      path:"/blog"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full px-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          isPressable
          onPress={() => navigate(card.path)}         
          className="
            transition-all duration-300 
            hover:shadow-2xl 
            hover:scale-[1.03] 
            cursor-pointer
            overflow-hidden
            rounded-2xl
            w-62
            mx-auto
          "
        >

          {/* Imagen como fondo */}
          <CardBody
            className="
              h-40 
              bg-cover 
              bg-center 
              rounded-xl
            "
            style={{
              backgroundImage: `url(${card.img})`,
            }}
          />

          {/* Texto */}
          <CardHeader className="flex flex-col items-start p-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            {/* <p className="text-3xl font-bold">{card.value}</p> */}
          </CardHeader>

        </Card>
      ))}
    </div>
  );
}
