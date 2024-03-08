import { useEffect, useState } from "react";
import { getSheet, sheet2Object } from "../../services/gsheets";
import { Card, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header/header";

function Home() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([1, 1, 2]);

  const getData = async () => {
    console.log("Getting sheet");
    const sheetId = JSON.parse(localStorage.getItem("settings")!).prisotnost.id;
    const result = await getSheet(sheetId);
    const obj = sheet2Object(result.data.values);
    setData(obj);
    console.log(obj);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <Header title={"Prisotnost"} />
      </div>
      <div className="flex flex-col gap-2">
        {data.map((user: any) => {
          return (
            <Card placeholder={undefined}>
              <div className="p-5 flex flex-row justify-between">
                <div>
                  <h5 className="text-2xl font-semibold">{user.Ime}</h5>
                  <p className="mt-2 text-gray-500">{user.Vod}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <IconButton placeholder={undefined} size="lg">
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircleCheck}
                    />
                  </IconButton>
                  <IconButton placeholder={undefined} size="lg">
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircle}
                    />
                  </IconButton>
                  <IconButton placeholder={undefined} size="lg">
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircleXmark}
                    />
                  </IconButton>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
