import { useContext, useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sharePDF } from "../services/pdf.service";

import RNHTMLtoPDF from "react-native-html-to-pdf";
import { initialActivitiesState } from "../common/reducers/activities-reducer";

export default function CreatePdf() {
  const activitiesState = useContext(ActivitiesStateContext);
  // useEffect(() => console.log("perra"), [activitiesState]);

  const htmlContent = activitiesState.todayActivities
    ? `
        <html>
          <head>
            <style>
             @page {
                size: landscape;
                margin: 20mm;
              }
               body {
                font-family: Arial, sans-serif;
                width: 100%;
                margin: 0;
                padding: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th {
                padding: 10px;
                text-align: center;
                border: 1px solid #ddd;
              }
              td {
                padding: 10px;
                text-align: center;
                border: 1px solid #ddd;
              }
              th {
                background-color: #f4f4f4;
              }
            </style>
          </head>
           <body>
            <table>
              <tr>
                <th colspan="7">
                  Production Activities
                </th>
              </tr>
              <tr>
                <th>
                  Nombre:
                </th>
                 <th colspan="6">
                  Michael Ortiz
                </th>
              </tr>
              <tr>
                <th>Date</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Start Hour</th>
                <th>Pause</th>
                <th>Restart</th>
                <th>End Hour</th>
              </tr>
              ${activitiesState.todayActivities
                .map(
                  (activity) =>
                    `
                  <tr>
                    <td>${activity.date || "No date"}</td>
                    <td>${activity.details || "No details"}</td>
                    <td>${activity.quantity || "-"}</td>
                    <td>${activity.start_hour || "00:00"}</td>
                    <td>${activity.pause || "-"}</td>
                    <td>${activity.restart || "-"}</td>
                    <td>${activity.end_hour || "00:00"}</td>
                  </tr>
                `,
                )
                .join("")}
            </table>
          </body>
        </html>
      `
    : "";

  const printToFile = async () => {
    // if (activitiesState.todayActivities) {
    //   sharePDF(htmlContent)
    //     .then((res) => {
    //       console.log("succesxd: ", res);
    //     })
    //     .catch((err) => {
    //       console.log("error puta: ", err);
    //     });
    // }

    try {
      // const file = await RNHTMLtoPDF.convert({
      //   html: htmlContent,
      //   fileName: "puta",
      // });
    } catch (error) {}
  };

  return (
    <View>
      <Pressable onPress={printToFile}>
        <Text>Download Daily Report s</Text>
      </Pressable>
    </View>
  );
}
