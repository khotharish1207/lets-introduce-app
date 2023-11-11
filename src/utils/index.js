import { saveAs } from "file-saver";

export const hasLightBG = (hex) => {
  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  const brightness = Math.round(
    (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
  );
  return brightness > 125 ? true : false;
};

export const getHref = (e) => {
  let value = null;
  if (e.name === "Viber" && e.value)
    value = e.value.replace(/[\s\-()]/g, "").replace(/\+/, "%2B");
  return e.href
    ? e.href + (value || e.value) + (e.hrefEnd ? e.hrefEnd : "")
    : value || e.value;
};

export const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const mediaType = (t) => {
  switch (true) {
    case t === "image/jpeg" || t === "image/png":
      return "image";
    case t === "audio/mpeg":
      return "music";
    case t === "video/mp4" || t === "video/webm":
      return "video";
    case t === "application/pdf":
      return "document";
    default:
      return "";
  }
};

export const getFileName = (file) => {
  return file.name.replace(/(?:\.([^.]+))?$/, "");
};

export const formatBytes = (a, b = 2) => {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
};

export const dataURIToBinary = (dataURI) => {
  const BASE64_MARKER = ";base64,";
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

export const stripAttr = (val) => {
  if (/<iframe(.*)\/iframe>/.test(val)) {
    let iframe = val.match(/<iframe(.*)\/iframe>/)[0];
    return iframe.match(/src="?([^"\s]+)"/)[1];
  } else if (/\/\/www\.instagram\.com\/embed\.js/.test(val)) {
    return `${
      val.match(/data-instgrm-permalink="(.*?)\/\?/)[1]
    }/embed/captioned`;
  }
  return null;
};

export const sharingPage = () => {};

export const getGreetMsg = () => {
  var hours = new Date().getHours();

  switch (true) {
    case hours >= 5 && hours <= 11:
      return `Hello! Good Morning! Have a nice day`;
    case hours === 12:
      return "Good Noon Visitor!";
    case hours >= 13 && hours <= 17:
      return "Good Afternoon!";
    case hours >= 18 && hours <= 20:
      return "Good Evening!";
    case hours >= 21 && hours <= 11:
      return "Good Night!";
    default:
      return "Wow! You`re still awake. Working Late?";
  }
};

export const saveContact = ({ contactInformation, vCard, fullName }) => {
  const vcardTemplate = `
BEGIN:VCARD
VERSION:3.0
N:${contactInformation?.fname || ""}
FN:${fullName}
ORG:${contactInformation?.org || ""}
ADR;TYPE=WORK:${contactInformation?.addr || ""}
TITLE:${contactInformation?.title || ""}
TEL;TYPE=CELL:${vCard?.mobile}
TEL;TYPE=WORK:${vCard?.office}
TEL;TYPE=HOME:${vCard?.home}
TEL;TYPE=MSG:${vCard?.sms}
END:VCARD
  `;

  const blob = new Blob([vcardTemplate], {
    type: "text/vcard",
  });
  saveAs(window.URL.createObjectURL(blob), `${fullName}.vcf`);
};
