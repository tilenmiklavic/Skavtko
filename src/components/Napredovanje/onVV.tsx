import { useEffect, useState } from "react";
import { getSheet, sheet2Object } from "../../services/gsheets";
import { getSettings } from "../../services/settings";
import LoadingEmpty from "../Common/LoadingEmpty";
import { Card, CardHeader, IconButton, Input } from "@material-tailwind/react";
import LabelValue from "../Common/LabelValue";
import Row from "../Common/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Horizontal from "../Lines/Horizontal";

const OnVV = () => {
  const [data, setData] = useState([] as any[]);
  const [settings] = useState(getSettings());
  const [loading, setLoading] = useState(true);
  const stariVolkovi = [
    "Akela",
    "Bagira",
    "Kača Kaja",
    "Rakša",
    "Balu",
    "Miška Čikaj",
    "Ata Volk",
    "Sivi Brat",
  ];

  const getData = async () => {
    const response = await getSheet(settings.napredovanje.id);

    console.log(sheet2Object(response.data.values));
    setData(sheet2Object(response.data.values));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingEmpty settings={settings.prisotnost.id} />
      </>
    );
  }

  return (
    <div>
      {data.map((row: any, index: number) => {
        return (
          <Card key={index} placeholder={undefined} className="m-1 p-2">
            <Row>
              <span className="">{row.Ime}</span>
              <LabelValue label="Ime" value={row.Ime} />
              <LabelValue label="Stopnja" value={row.Stopnja} />
            </Row>

            <Horizontal />

            {stariVolkovi.map((stariVolk) => {
              if (row[stariVolk]) {
                return (
                  <Row key={stariVolk}>
                    <LabelValue label={stariVolk} value={row[stariVolk]} />
                    <div className="flex flex-row gap-1">
                      <IconButton placeholder={undefined} size="sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                      <IconButton placeholder={undefined} size="sm">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </IconButton>
                    </div>
                  </Row>
                );
              }
            })}

            <Input crossOrigin={undefined} />
          </Card>
        );
      })}
    </div>
  );
};

export default OnVV;
