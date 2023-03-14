import copy from "copy-to-clipboard";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import React from "react";
import ReactDOM from "react-dom/server";
import * as Mui from "@mui/material";

// Some cusotm utils for app
export const useUtils = () => {
  const theme = Mui.useTheme();
  const doc = new jsPDF();

  // Encode string
  const encode = (text: string) => {
    try {
      return btoa(text);
    } catch {
      return "";
    }
  };

  // Decode string
  const decode = (text: string) => {
    try {
      return atob(text);
    } catch {
      return "";
    }
  };

  // Format Bytes
  const byteFormat = (bytes: number, decimals: number) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  // Download as PDF
  const downloadPDF = (id: string) => {
    doc.text(id, 15, 10);
    autoTable(doc, {
      html: `#${id?.toLowerCase()}`,
      theme: "striped",
    });
    doc.save(`${id?.toLowerCase()}.pdf`);
  };

  // Content copy utils with conetnt and success message
  const contentCopy = (content: string, e?: any) => {
    const copyPath = `<path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z"></path>`;
    const check = `<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>`;
    const target = e.currentTarget;
    copy(content);
    if (target) {
      target.querySelectorAll("svg")[0].style.color =
        theme.palette.success.main;
      target.querySelectorAll("svg")[0].innerHTML = check;
      setTimeout(() => {
        target.querySelectorAll("svg")[0].style.color =
          theme.palette.primary.main;
        target.querySelectorAll("svg")[0].innerHTML = copyPath;
      }, 3000);
    }
  };

  // Use data URL to file convertor
  const useDataURLFile = (dataURL: string, fileName: string) => {
    var byteString = atob(dataURL.split(",")[1]);
    var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);
    for (var i = 0; i < byteString.length; i++)
      dw.setUint8(i, byteString.charCodeAt(i));
    const blob = new Blob([ab], { type: mimeString });
    return new File(
      [blob],
      `${fileName}.${blob.type.split("/").slice(-1)[0]}`,
      {
        type: blob.type,
        lastModified: new Date().getTime(),
      }
    );
  };

  // Focusing elemnt
  const toFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      element.scrollIntoView({ block: "center" });
    }
  };

  // To convert file to Text
  const toText = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // To convert file to Base64
  const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // To covert text to JSON
  const toCSVJson = (csvFile: string) => {
    try {
      const rows: string[][] = [];

      var fieldRegEx = new RegExp(
        '(?:\\s*"((?:""|[^"])*)"\\s*|\\s*((?:""|[^",\\r\\n])*(?:""|[^"\\s,\\r\\n]))?\\s*)(,|[\\r\\n]+|$)',
        "g"
      );
      var row = [];
      var currMatch = null;

      while ((currMatch = fieldRegEx.exec(csvFile))) {
        row.push([currMatch[1], currMatch[2]].join(""));
        if (currMatch[3] != ",") {
          rows.push(row);
          row = [];
        }
        if (currMatch[3].length == 0) break;
      }
      return rows.slice(1).map((cells) => {
        return Object.assign(
          {},
          ...cells.map((cell, index) => ({
            [rows[0][index].trim().toLowerCase().replaceAll(" ", "_")]:
              cell.trim(),
          }))
        );
      });
    } catch {
      return [];
    }
  };

  // to CSV file convertor
  const toCSVFile = (
    titles: string,
    data: Record<string, string | React.ReactNode | number>[]
  ) =>
    `data:text/csv;charset=utf-8,${encodeURI(
      [
        titles,
        data.map((e) => {
          return Object.entries(e)
            .map(([key, value]) =>
              key === "date"
                ? formatTimeString(
                    ReactDOM.renderToString(value as any)
                      .replaceAll(",", "")
                      .replaceAll(/\<.*?\>/gm, "")
                  ).replace(",", "")
                : ReactDOM.renderToString(value as any)
                    .replaceAll(",", "")
                    .replaceAll(/\<.*?\>/gm, "")
            )
            .toString();
        }),
      ]
        .flat()
        .join("\r\n")
    )}`;

  // Time formater
  const formatTimeString = (time: string) => {
    return new Date(time).toLocaleString("en-US");
  };

  // Format date to string type
  const formatDateString = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  // Format date string type to Date type time
  const formatDate = (date: string) => {
    const splitedDate = date.split("/");
    return new Date(+splitedDate[2], +splitedDate[1] - 1, +splitedDate[0]);
  };

  const nestedParser = (name: string, data: any) => {
    let value = "";
    name.split(".").forEach((val) => {
      value = (value || data)[val];
    });
    return value;
  };

  return {
    encode,
    decode,
    byteFormat,
    contentCopy,
    downloadPDF,
    useDataURLFile,
    toFocus,
    toBase64,
    toText,
    toCSVJson,
    toCSVFile,
    formatDate,
    formatDateString,
    formatTimeString,
    nestedParser,
  };
};
