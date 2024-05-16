import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmDialog from "../Common/ConfirmDialog";
import { useState } from "react";
import TextInput from "./textInput";
import toast from "react-hot-toast";

interface TextInputProps {
    label: string;
    id: string;
    placeholder: string;
    required?: boolean;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onButtonClick: (title?: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputButton = (props: TextInputProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [sheetName, setSheetName] = useState("");

    const openDialog = () => {
        setOpenModal(!openModal);
    };

    const handleConfirm = () => {
        setOpenModal(!openModal);
        props.onButtonClick(sheetName);
    };

    return (
        <div className="relative flex w-full max-w-[24rem] mb-3">
            <div className="relative w-full min-w-[200px] h-10 min-w-0">
                <input
                    id={props.id}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={props.placeholder}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 before:content-none after:content-none">
                    {" "}
                </label>
            </div>
            <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none !absolute right-1 top-1 rounded"
                type="button"
                style={{ position: "relative", overflow: "hidden" }}
                onClick={openDialog}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <ConfirmDialog
                open={openModal}
                title="Ustvarjanje..."
                content="Vnesi ime nove tabele, ki bo shranjena v tvoj Drive:"
                handleOpen={() => {
                    setOpenModal(!openModal);
                }}
                handleConfirm={() => handleConfirm()}
            >
                <div className="p-3">
                    <TextInput
                        label={""}
                        id={"new_sheet_input"}
                        placeholder={"ime"}
                        onChange={(e) => setSheetName(e.target.value)}
                    />
                </div>
            </ConfirmDialog>
        </div>
    );
};

export default TextInputButton;
