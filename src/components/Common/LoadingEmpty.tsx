import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface LoadingEmptyProps {
  settings: string;
  tab?: number;
}

const LoadingEmpty = (props: LoadingEmptyProps) => {
  const navigate = useNavigate();

  const navigateToSettings = (tab: number) => {
    navigate("/settings", { state: { tab: tab } });
  };

  return (
    <>
      {props.settings === "" ? (
        // <Chip color="amber" size="lg" value={"Link not set 💔"} />
        <Alert
          variant="filled"
          icon={<FontAwesomeIcon icon={faHeartBroken} />}
          color="amber"
          action={
            <Button
              variant="text"
              color="black"
              size="sm"
              className="!absolute top-3 right-3"
              onClick={() => navigateToSettings(props.tab || 0)}
              placeholder={undefined}
            >
              Set
            </Button>
          }
        >
          Link not set
        </Alert>
      ) : (
        <Chip color="amber" size="lg" value={"Nalaganje..."} />
      )}
    </>
  );
};

export default LoadingEmpty;
