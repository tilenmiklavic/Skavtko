import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { qrDecToZoi } from "../../services/zoi";
import { getReciptData, getReciptDataMock } from "../../services/furs";
import formatTime from "../../services/dateTime";
import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import PrimaryButton from "../../components/Buttons/primaryButton";
import SecondaryButton from "../../components/Buttons/secondaryButton";
import TextInput from "../../components/Inputs/textInput";
import { writeToSheets } from "../../services/gsheets";

export default function Finance() {
  // set state
  const [decoded, setDecoded] = useState("");
  const [deconding, setDecoding] = useState(true);
  const [reciept, setReciept] = useState({} as any);

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

    console.log("writing");

    toast.promise(
      writeToSheets(sheetData), // The promise you are awaiting
      {
        loading: "Writing to sheets...", // Message shown during loading
        success: "Data written successfully!", // Message shown on success
        error: "Failed to write data.", // Message shown on error
      }
    );
  };

  return (
    <>
      <Header title="Finance" settings="/settings" />

      <QrScanner
        onDecode={(result) => handleSubmit(result)}
        onError={(error) => console.log(error?.message)}
        scanDelay={1000}
        stopDecoding={!deconding}
      />

      <div className="card">
        <div>ZOI: {decoded}</div>
        <div>
          Datum: {reciept.Date} {reciept.Time}
        </div>
        <div>Trgovina: {reciept.Name}</div>
        <div>Znesek: {reciept.InvoiceAmount}</div>
        <div>Stevilka racuna: {reciept.InvoiceNumber}</div>

        <div className="grid grid-cols-2 gap-4 place-content-around mt-5">
          <PrimaryButton
            label={"Shrani račun"}
            disabled={reciept.valid ? false : true}
            onClick={reciept.valid ? saveRecipet : undefined}
          />

          <SecondaryButton
            label={"Nov račun"}
            onClick={() => setDecoding(true)}
          />
        </div>
      </div>
    </>
  );
}
