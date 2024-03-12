import Coordinate from "../classes/Coordinates";

export async function getDirections(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  //   const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  const access_token = process.env.REACT_APP_DIRECTIONS_ACCESS_TOKEN;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    lat1: lat1,
    lng1: lng1,
    lat2: lat2,
    lng2: lng2,
  };

  try {
    const response = await fetch("/api/directions/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function getPlaces(lat: number, lng: number, query: string) {
  //   const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  const access_token = process.env.REACT_APP_DIRECTIONS_ACCESS_TOKEN;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    lat: lat,
    lng: lng,
    query: query,
  };

  try {
    const response = await fetch("/api/directions/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export function coordinateValid(coordinate: Coordinate) {
  return coordinate.lat !== 0 && coordinate.lng !== 0;
}
