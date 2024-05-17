import { useEffect, useState } from "react";
import { createSheet, formatSheet, getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import TextInput from "../Inputs/textInput";
import Horizontal from "../Lines/Horizontal";
import { getSettings, saveSettings } from "../../services/settings";
import SheetInfo from "../Common/SheetInfo";
import { FormatedSheet } from "../../classes/FormatedSheet";
import TextInputButton from "../Inputs/textInputButton";
import toast from "react-hot-toast";
import Select from "../Inputs/select";
import { getSheets } from "../../services/drive";

const NapredovanjeSettings = () => {
    const [settings] = useState(getSettings());
    const [napredovanjeSheetInfoData, setNapredovanjeSheetInfoData] = useState(
        {} as any
    );
    const [groupSheetInfoData, setGroupSheetInfoData] = useState({} as any);
    const [loading, setLoading] = useState(true);
    const [sheets, setSheets] = useState([] as any[]);

    const napredovanjeSheetInfo = async () => {
        const sheetInfoNapredovanje = await getSheetInfo(
            settings.napredovanje.id
        );
        setNapredovanjeSheetInfoData(sheetInfoNapredovanje.data);
        setLoading(false);
    };

    const groupSheetInfo = async () => {
        const sheetInfoGroup = await getSheetInfo(settings.group.id);
        setGroupSheetInfoData(sheetInfoGroup?.data);
        setLoading(false);
    };

    const createNewGroupSheet = async (title?: string) => {
        const result = await createSheet(title || "Skupine");
        const table = await formatSheet(
            result.data.spreadsheetId,
            FormatedSheet.SKUPINE
        );

        if (result?.data) {
            settings.group = {
                id: result.data.spreadsheetId,
                link: result.data.spreadsheetUrl
            };
            saveSettings(settings);
            groupSheetInfo();
        }
    };

    const createNewONSheet = async (title?: string) => {
        const result = await createSheet(title || "Napredovanje");
        const table = await formatSheet(
            result.data.spreadsheetId,
            FormatedSheet.ON
        );

        if (result?.data) {
            settings.group = {
                id: result.data.spreadsheetId,
                link: result.data.spreadsheetUrl
            };
            saveSettings(settings);
            groupSheetInfo();
        }
    };

    const getFiles = async () => {
        const foo = await getSheets();
        setSheets(foo);
    };

    useEffect(() => {
        getFiles();
        if (settings.napredovanje) napredovanjeSheetInfo();
        if (settings.group) groupSheetInfo();
    }, [settings]);

    return (
        <div>
            <Subtitle title="Osebno napredovanje" />
            <TextInputButton
                label="Spreadsheet link"
                placeholder="link"
                id="napredovanje_input"
                clearButton={true}
                onButtonClick={(title?: string) => {
                    toast.promise(
                        createNewONSheet(title), // The promise you are awaiting
                        {
                            loading: "Creating new sheet...", // Message shown during loading
                            success: "Sheet created successfully!", // Message shown on success
                            error: "Failed to create sheet." // Message shown on error
                        }
                    );
                }}
            />
            <div className="mb-3">
                <Select
                    label="or select"
                    placeholder=""
                    id="napredovanje_sheet_select"
                    options={sheets}
                ></Select>
            </div>

            <SheetInfo
                loading={loading}
                title={napredovanjeSheetInfoData?.properties?.title}
                index={FormatedSheet.ON}
                sheet_id={settings?.napredovanje?.id}
                link={settings?.napredovanje?.link}
            />

            <Horizontal />

            <Subtitle title="Tekmovanje med vodi" />
            <TextInputButton
                label={"Spreadsheet link"}
                id={"group_input"}
                placeholder={"link"}
                clearButton={true}
                onButtonClick={(title?: string) => {
                    toast.promise(
                        createNewGroupSheet(title), // The promise you are awaiting
                        {
                            loading: "Creating new sheet...", // Message shown during loading
                            success: "Sheet created successfully!", // Message shown on success
                            error: "Failed to create sheet." // Message shown on error
                        }
                    );
                }}
            />
            <div className="mb-3">
                <Select
                    label="or select"
                    placeholder=""
                    id="group_sheet_select"
                    options={sheets}
                ></Select>
            </div>

            <SheetInfo
                loading={loading}
                title={groupSheetInfoData?.properties?.title}
                index={FormatedSheet.SKUPINE}
                sheet_id={settings?.group?.id}
                link={settings?.group?.link}
                format={true}
            />
        </div>
    );
};

export default NapredovanjeSettings;
