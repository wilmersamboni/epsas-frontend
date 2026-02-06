import {Button} from "@heroui/react";

interface ButtomCreateProps {
  onClick?: () => void;
}

export default function BottomCreate({ onClick }: ButtomCreateProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button color="primary" variant="shadow" size="md" onClick={onClick}>
        Añadir
      </Button>
    </div>


  );
}
