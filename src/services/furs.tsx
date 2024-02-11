export async function getReciptData(zoi: string) {
  // STATUS table
  // 22 - Račun ni potrjen ali pa je potekel skrajni rok za preverjanje.
  // 50 - Rok za preverjanje računa je potekel
  // 60 - Račun je že bil preverjen

  // Response example
  // Data: {
  // Address: ""
  // CustomerVatNumber: ""
  // Date: "5.10.2023"
  // InvoiceAmount: "16.26"
  // InvoiceNumber: "4919-2-110499"
  // Name: "MUELLER DROGERIJA D.O.O."
  // TaxNumber: "87790289"
  // Time: "15:45:31"
  // VerificationLogGUID: "1A9A7BF84328350FEC764AD12A4FEC16"
  // ZOI: "7fbd646dc3e969109a5dac1365cd5282"
  // kanal: "PORTA"
  // status: 50
  // text: "Rok za preverjanje računa je potekel."
  // }

  const url = "https://blagajne.fu.gov.si/v2/mobile_cr/check_invoice";
  const payload = {
    Data: {
      ZOI: zoi,
      kanal: "PORTA",
    },
    mobileDevice: {
      platform: "BROWSER",
      model: "browser",
      uuid: Math.floor(Math.random() * 10 ** 13).toString(),
    },
    user: {
      davcna: "",
      contest: "false",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic dnplbWlyYWN1bjp2a2xvcGlyYXp1bQ==",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error("Fetching error: ", error);
    throw error;
  }
}

export async function getReciptDataMock(zoi: string) {
  let response = {
    ZOI: "98d9ce883399b9dbbcd9bc4915e7789d",
    TaxNumber: "91043522",
    Time: "11:58:00",
    Date: "27.1.2024",
    Name: "HOFER TRGOVINA D.O.O.",
    Address: "",
    CustomerVatNumber: "SI26611066",
    InvoiceAmount: "63.52",
    InvoiceNumber: "381079-002-4984",
    VerificationLogGUID: "C61FC558DD312B6BFEF9AE208D5E6212",
    kanal: "PORTA",
    status: 10,
    text: "Račun je potrjen pri FURS",
    valid: true,
  };

  return response;
}
