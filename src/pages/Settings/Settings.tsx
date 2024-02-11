import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import TextInput from "../../components/Inputs/textInput";
import { useState } from "react";

export default function FinanceSettings() {
  const [link, setLink] = useState("");

  const saveLink = async (event: any) => {
    event.preventDefault();

    setLink(event.target.link.value);

    const sheetInfo = {
      link: link,
      id: link.toString().split("/")[5],
    };

    localStorage.setItem("sheetInfo", JSON.stringify(sheetInfo));
    toast.success("Link saved!");
  };

  return (
    <>
      <div>
        <Header title={"Nastavitve"} />
      </div>
      <form onSubmit={saveLink}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <TextInput label="Ime" placeholder="ime" id="ime" />
          <TextInput label="Priimek" placeholder="priimek" id="priimek" />
          <TextInput label="Spreadsheet link" placeholder="link" id="link" />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
