import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { appendToSheet } from "../../services/gsheets";
import { Button, Card, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Horizontal from "../../components/Lines/Horizontal";
import { getSettings } from "../../services/settings";
import { Link } from "react-router-dom";

export default function FinanceManual() {
  const [settings, setSettings] = useState(getSettings());
  const [saving, setSaving] = useState(false);

  const saveRecipet = async (event: any) => {
    event.preventDefault();
    setSaving(true);

    const sheetData = [
      [
        event.target.date_input.value,
        event.target.time_input.value,
        event.target.trgovina_input.value,
        event.target.znesek_input.value,
        "123",
      ],
    ];

    toast
      .promise(
        appendToSheet(sheetData, settings.racuni.id), // The promise you are awaiting
        {
          loading: "Writing to sheets...", // Message shown during loading
          success: "Data written successfully!", // Message shown on success
          error: "Failed to write data.", // Message shown on error
        }
      )
      .then(() => {
        setSaving(false);
      });
  };

  return (
    <>
      <Header title="Finance" />

      <div className="w-full flex justify-center mt-3">
        <Link to={"/finance"} className="w-full">
          <Button
            placeholder={undefined}
            fullWidth={true}
            className="flex justify-center items-center gap-3"
          >
            <FontAwesomeIcon className="icon" size="lg" icon={faCamera} />
            Skeniraj
          </Button>
        </Link>
      </div>

      <Horizontal />

      <div className="w-full flex">
        <Card
          color="transparent"
          shadow={false}
          placeholder={undefined}
          className="flex-1"
        >
          <form className="mb-2" onSubmit={saveRecipet}>
            <div className="mb-1 flex flex-col gap-6">
              <Input
                label="Znesek"
                placeholder="20,37€"
                crossOrigin={undefined}
                id="znesek_input"
              />
              <Input
                label="Trgovina"
                placeholder="Mercator d.o.o"
                crossOrigin={undefined}
                type="text"
                id="trgovina_input"
              />
              <Input
                type="date"
                label="Datum"
                placeholder="10.2.2024"
                crossOrigin={undefined}
                id="date_input"
              />
              <Input
                type="time"
                label="Ura"
                placeholder="13:17"
                crossOrigin={undefined}
                id="time_input"
              />
            </div>
            <Button
              className="mt-12"
              fullWidth
              placeholder={undefined}
              type="submit"
              loading={saving}
            >
              Shrani
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
