import { useEffect } from "react";
import { getSheet } from "../../services/gsheets";

function Home() {
  const getData = async () => {
    console.log("Getting sheet");
    const result = await getSheet();
    console.log(result);
  };

  useEffect(() => {
    console.log("useEffect");
    getData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our website!</p>
    </div>
  );
}

export default Home;
