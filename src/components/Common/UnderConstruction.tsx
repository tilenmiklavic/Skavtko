import { faUpwork } from "@fortawesome/free-brands-svg-icons";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@material-tailwind/react";

const UnderConstruction = () => {
  return (
    <div className="pt-10">
      <Card
        placeholder={undefined}
        className="m-2 p-3 flex flex-row items-center justify-center gap-3"
        color="amber"
        variant="gradient"
      >
        <FontAwesomeIcon icon={faPersonDigging} />
        <span className="font-bold">Under construction</span>
        <FontAwesomeIcon icon={faPersonDigging} />
      </Card>
    </div>
  );
};

export default UnderConstruction;
