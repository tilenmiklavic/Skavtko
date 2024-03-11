import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { qrDecToZoi } from "../../services/zoi";
import { getReciptData, getReciptDataMock } from "../../services/furs";
import formatTime from "../../services/dateTime";
import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { appendToSheet } from "../../services/gsheets";
import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import LabelValue from "../../components/Common/LabelValue";

export default function Finance() {
  // set state
  const [decoded, setDecoded] = useState("");
  const [deconding, setDecoding] = useState(true);
  const [reciept, setReciept] = useState({} as any);
  const [sheetId, setSheetId] = useState("");

  const handleSubmit = async (result: string) => {
    const reciept = await handleDecode(result);
    console.log(reciept);
  };

  const handleDecode = async (result: string) => {
    setDecoding(false);

    let hex = qrDecToZoi(result);
    setDecoded(hex);

    let reciept = await getReciptDataMock(hex);

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

  const saveRecipet = async () => {
    const sheetData = [
      [
        reciept.Date,
        reciept.Time,
        reciept.Name,
        reciept.InvoiceAmount,
        reciept.InvoiceNumber,
      ],
    ];

    toast.promise(
      appendToSheet(sheetData, sheetId), // The promise you are awaiting
      {
        loading: "Writing to sheets...", // Message shown during loading
        success: "Data written successfully!", // Message shown on success
        error: "Failed to write data.", // Message shown on error
      }
    );
  };

  useEffect(() => {
    const sheetId = JSON.parse(localStorage.getItem("settings")!).racuni.id;
    setSheetId(sheetId);
  }, []);

  return (
    <>
      <Header title="Finance" />

      <QrScanner
        onDecode={(result) => handleSubmit(result)}
        onError={(error) => console.log(error?.message)}
        scanDelay={1000}
        stopDecoding={!deconding}
      />

      {deconding && (
        <div className="w-full flex justify-center mt-3">
          <Link to={"/finance/manual"} className="w-full">
            <Button placeholder={undefined} fullWidth={true}>
              Vnesi Ročno
            </Button>
          </Link>
        </div>
      )}

      {!deconding && (
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
              onClick={reciept.valid ? saveRecipet : undefined}
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
}
