import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { qrDecToZoi } from "../../services/zoi";
import { getReciptData } from "../../services/furs";
import toast from "react-hot-toast";
import formatTime from "../../services/dateTime";
import { Link } from "react-router-dom";
import { Button, Card } from "@material-tailwind/react";
import LabelValue from "../Common/LabelValue";
import { appendToSheet } from "../../services/gsheets";
import { getProfile, getSettings } from "../../services/settings";
import LoadingEmpty from "../Common/LoadingEmpty";

const Racuni = () => {
  const [decoded, setDecoded] = useState("");
  const [decoding, setDecoding] = useState(true);
  const [reciept, setReciept] = useState({} as any);
  const [settings, setSettings] = useState(getSettings());
  const [profile, setProfile] = useState(getProfile());

  const handleSubmit = async (result: string) => {
    const reciept = await handleDecode(result);
    console.log(reciept);
  };

  const handleDecode = async (result: string) => {
    setDecoding(false);

    let hex = qrDecToZoi(result);
    setDecoded(hex);

    let reciept = await getReciptData(hex);
    // let reciept = await getReciptData(hex);

    if (reciept.status === 60) {
      toast.error(reciept.text);
      reciept.valid = false;
    } else {
      toast.success("Račun uspešno preverjen!");
      reciept.valid = true;
    }

    reciept.Time = formatTime(reciept.Time);
    setReciept(reciept);

    return reciept;
  };

  const saveReciept = async () => {
    const sheetData = [
      [
        `${profile.given_name} ${profile.family_name}`,
        reciept.Date,
        reciept.Time,
        reciept.Name,
        reciept.InvoiceAmount,
        reciept.InvoiceNumber,
      ],
    ];

    toast.promise(
      appendToSheet(sheetData, settings.racuni.id), // The promise you are awaiting
      {
        loading: "Writing to sheets...", // Message shown during loading
        success: "Data written successfully!", // Message shown on success
        error: "Failed to write data.", // Message shown on error
      },
    ).then(() => {
      setDecoding(true);
    });
  };

  if (settings.racuni.id === "") {
    return <LoadingEmpty settings={settings.racuni.id} tab={1} />;
  }

  return (
    <>
      {decoding && (
        <>
          <QrScanner
            onDecode={(result) => handleSubmit(result)}
            onError={(error) => console.log(error?.message)}
            scanDelay={1000}
            stopDecoding={!decoding}
          />

          <div className="w-full flex justify-center mt-3">
            <Link to={"/finance/manual"} className="w-full">
              <Button placeholder={undefined} fullWidth={true}>
                Vnesi Ročno
              </Button>
            </Link>
          </div>
        </>
      )}

      {!decoding && (
        <>
          <Card placeholder={undefined} className="mt-4 p-3">
            <LabelValue
              label="Datum"
              value={`${reciept.Date} ${reciept.Time}`}
            />
            <LabelValue label="Trgovina" value={reciept.Name} />
            <LabelValue label="Znesek" value={`${reciept.InvoiceAmount}€`} />
            <LabelValue label="Številka računa" value={reciept.InvoiceNumber} />
            <LabelValue label="ZOI" value={decoded} />
          </Card>

          <div className="grid grid-cols-2 gap-4 place-content-around mt-5">
            <Button
              placeholder={undefined}
              disabled={reciept.valid ? false : true}
              onClick={reciept.valid ? saveReciept : undefined}
              color="blue"
            >
              Shrani račun
            </Button>
            <Button placeholder={undefined} onClick={() => setDecoding(true)}>
              Nov račun
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Racuni;
