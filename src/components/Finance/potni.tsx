import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { getSettings } from "../../services/settings";
import {
  coordinateValid,
  getDirections,
  getPlaces,
} from "../../services/directions";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./potni.css";
import Coordinate from "../../classes/Coordinates";
import LabelValue from "../Common/LabelValue";
import LoadingEmpty from "../Common/LoadingEmpty";
import { appendToSheet } from "../../services/gsheets";
import moment from "moment";
import toast from "react-hot-toast";

mapboxgl.accessToken = process.env.REACT_APP_DIRECTIONS_ACCESS_TOKEN as string;

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on component unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Potni = () => {
  const [settings, setSettings] = useState(getSettings());
  const [options, setOptions] = useState([] as any[]);
  const [placeInputValue, setPlaceInputValue] = useState("");
  const [start, setStart] = useState({ lat: 0, lng: 0 } as Coordinate);
  const [end, setEnd] = useState({ lat: 0, lng: 0 } as Coordinate);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const debouncedSearchTerm = useDebounce(placeInputValue, 500); // 500ms delay

  const directions = async () => {
    let response = await getDirections(start.lng, start.lat, end.lng, end.lat);
    setDistance(response.data.routes[0].distance);
    setTime(response.data.routes[0].duration);
  };

  const places = async (query: string) => {
    let response = await getPlaces(14.5058, 46.0569, query);
    setOptions(response.data.features);
  };

  const savePotni = async () => {
    let tempDistance = (distance / 1000).toFixed(1);

    let profile = JSON.parse(localStorage.getItem("profile")!);
    let date = moment().format("D.M.YYYY");

    let sheetData = [[date, profile.name, start.name, end.name, tempDistance]];

    toast.promise(
      appendToSheet(sheetData, settings.potni.id), // The promise you are awaiting
      {
        loading: "Writing to sheets...", // Message shown during loading
        success: "Data written successfully!", // Message shown on success
        error: "Failed to write data.", // Message shown on error
      }
    );
  };

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(46.0569);
  const [lng, setLng] = useState(14.5058);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      // map.current.addSource("route", {
      //   type: "geojson",
      //   data: {
      //     type: "Feature",
      //     properties: {},
      //     geometry: {
      //       type: "LineString",
      //       coordinates: [
      //         [46.167827, 14.46301],
      //         [46.167826, 14.462955],
      //         [46.167826, 14.462641],
      //         [46.167823, 14.462292],
      //         [46.167818, 14.461851],
      //         [46.16782, 14.461599],
      //         [46.167783, 14.461479],
      //         [46.167678, 14.461357],
      //         [46.167567, 14.461305],
      //         [46.167488, 14.461254],
      //         [46.167343, 14.460828],
      //         [46.167338, 14.460706],
      //         [46.167378, 14.460667],
      //         [46.167493, 14.460641],
      //         [46.167689, 14.460558],
      //         [46.167745, 14.460464],
      //         [46.167681, 14.460205],
      //         [46.167536, 14.459789],
      //         [46.167563, 14.459558],
      //         [46.16771, 14.459394],
      //         [40.1, 17.0],
      //       ],
      //     },
      //   },
      // });
      // map.current.addLayer({
      //   id: "route",
      //   type: "line",
      //   source: "route",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "#fff",
      //     "line-width": 20,
      //   },
      // });

      map.current?.on("move", () => {
        if (!map.current) return;
        setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
        setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(map.current.getZoom().toFixed(2)));
      });

      map.current.on("load", () => {
        if (!map.current) return;

        // map.current.addSource("route", {
        //   type: "geojson",
        //   data: {
        //     type: "Feature",
        //     properties: {},
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [46.167827, 14.46301],
        //         [46.167826, 14.462955],
        //         [46.167826, 14.462641],
        //         [46.167823, 14.462292],
        //         [46.167818, 14.461851],
        //         [46.16782, 14.461599],
        //         [46.167783, 14.461479],
        //         [46.167678, 14.461357],
        //         [46.167567, 14.461305],
        //         [46.167488, 14.461254],
        //         [46.167343, 14.460828],
        //         [46.167338, 14.460706],
        //         [46.167378, 14.460667],
        //         [46.167493, 14.460641],
        //         [46.167689, 14.460558],
        //         [46.167745, 14.460464],
        //         [46.167681, 14.460205],
        //         [46.167536, 14.459789],
        //         [46.167563, 14.459558],
        //         [46.16771, 14.459394],
        //         [40.1, 17.0],
        //       ],
        //     },
        //   },
        // });
        // map.current.addLayer({
        //   id: "route",
        //   type: "line",
        //   source: "route",
        //   layout: {
        //     "line-join": "round",
        //     "line-cap": "round",
        //   },
        //   paint: {
        //     "line-color": "#fff",
        //     "line-width": 20,
        //   },
        // });
      });
    }
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      places(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (coordinateValid(start) && coordinateValid(end)) {
      directions();
    }
  });

  if (settings.potni.id === "") {
    return <LoadingEmpty settings={settings.potni.id} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <Select label="Start" placeholder={undefined} value={start.name}>
        <Input
          label="Start"
          crossOrigin={undefined}
          id="search"
          onChange={(e) => setPlaceInputValue(e.target.value)}
        />
        {options.map((option) => (
          <Option
            key={option.id}
            value={option.place_name}
            onClick={() =>
              setStart({
                lat: option.center[1],
                lng: option.center[0],
                name: option.place_name,
              })
            }
          >
            {option.place_name}
          </Option>
        ))}
      </Select>
      <Select label="Cilj" placeholder={undefined} value={end.name}>
        <Input
          label="Cilj"
          crossOrigin={undefined}
          id="search"
          onChange={(e) => setPlaceInputValue(e.target.value)}
        />
        {options.map((option) => (
          <Option
            key={option.id}
            value={option.place_name}
            onClick={() =>
              setEnd({
                lat: option.center[1],
                lng: option.center[0],
                name: option.place_name,
              })
            }
          >
            {option.place_name}
          </Option>
        ))}
      </Select>

      <div>
        <div className="sidebar">
          Lng: {lng.toFixed(2)} | Lat: {lat.toFixed(2)} | Zoom:{" "}
          {zoom.toFixed(0)}
          <div>Zemljevid je samo za lepo 😇</div>
        </div>
        <div ref={mapContainer} className="map-container" />

        <div className="mt-2">
          <LabelValue
            label={"Distance"}
            value={`${(distance / 1000).toFixed(1).toString()} km`}
          />
          <LabelValue
            label={"Time"}
            value={`${(time / 60).toFixed(0).toString()} min`}
          />
        </div>
      </div>

      <Button color="black" onClick={savePotni} placeholder={undefined}>
        Shrani
      </Button>
    </div>
  );
};

export default Potni;
