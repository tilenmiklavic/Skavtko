import Header from "../../components/Header/header";
import Horizontal from "../../components/Lines/Horizontal";
import Subtitle from "../../components/Text/Subtitle";

function Help() {
  return (
    <div>
      <Header title={"Pomoč"} help={true} />

      <div className="mt-5 flex flex-col gap-5">
        <div>
          <Subtitle title={"Navodila"} />

          <span className="mr-1">
            Navodila za uporabo aplikacije so na voljo na povezavi:
          </span>
          <a
            href="https://boundless-diver-d4d.notion.site/Skavtko-4ae5bedcc4ea414fb409460e3533a2dc"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Navodila
          </a>
        </div>

        <Horizontal />

        <div>
          <Subtitle title={"Izboljšave"} />

          <div>
            <span className="mr-1">
              Predloge za izboljšave in poročila o napakah lahko pošljete na
            </span>
            <a
              href="mailto:tilen.miklavic@skavti.si"
              className="text-blue-500 underline hover:text-blue-700"
            >
              tilen.miklavic@skavti.si
            </a>
          </div>
        </div>

        <div className="content-center w-100 flex justify-center">
          <img src="img/air_support.svg" className="size-40" />
        </div>
      </div>
    </div>
  );
}

export default Help;
