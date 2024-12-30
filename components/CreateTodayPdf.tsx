import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { ActivitiesStateContext } from "./contexts/ActivitiesContext";
import { sharePDF } from "../services/pdf.service";

import { buttonsStyles } from "../common/styles/styles";

export default function CreateTodayPdf() {
  const { todayActivities } = useContext(ActivitiesStateContext);

  const spanishHtmlContent = todayActivities
    ? `
        <html>

      <head>
          <style>
              @page {
                  size: landscape;
                  margin: 10mm;
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
                  border: 2px solid black;
                  background: rgb(233, 233, 233);
              }

              td {
                  padding: 10px;
                  text-align: center;
                  border: 2px solid black;
              }

              .table__title {
                  font-size: 20px;
              }

              .row__name {
                  margin: 0;
                  padding: 0;
              }

              .row__name__text {
                  text-align: left;
                  margin: 0;
                  padding: .3%;
              }

              .table__date {
                  width: 10%;
              }

              .table__details {
                  width: 100%;
              }

              .table__quantity {
                  width: 5%;
              }

              .table__start_hour {
                  width: 5%;
              }

              .table__pause {
                  width: 5%;
              }

              .table__restart {
                  width: 5%;
              }

              .table__end_hour {
                  width: 5%;
              }

              .table__details__content {
                  text-align: left;
              }
          </style>
      </head>
      <body>
          <table>
              <tr>
                  <th class="table__title" colspan="7">
                      <!-- PRODUCTION ACTIVITIES -->
                      ACTIVIDADES DE PRODUCCIÓN
                  </th>
              </tr>
              <tr class="row__name">
                  <th class="row__name">
                      Nombre:
                  </th>
                  <td class="row__name__text" colspan="6">
                      Michael Ortiz
                  </td>
              </tr>
              <tr>
                  <th class="table__date">DIA/FECHA</th>
                  <th class="table__details">DETALLE DE ACTIVIDAD</th>
                  <th class="table__quantity">CANTIDAD</th>
                  <th class="table__start_hour">HORA INICIO</th>
                  <th class="table__pause">PAUSA</th>
                  <th class="table__restart">REINICIO</th>
                  <th class="table__end_hour">HORA FINAL</th>
              </tr>
              ${todayActivities
                .map(
                  (activity) =>
                    `
                <tr>
                  <td>${activity.date}</td>
                  <td class="table__details__content">
                    ${activity.details || "Sin detalles"}
                  </td>
                  <td>${activity.quantity || "0"}</td>
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
    if (todayActivities) {
      sharePDF(spanishHtmlContent)
        .then((res) => {
          console.log("succesxd: ", res);
        })
        .catch((err) => {
          console.log("error puta: ", err);
        });
    }
  };

  return (
    <View>
      {todayActivities ? (
        <Pressable onPress={printToFile} style={[buttonsStyles.main_donwnload]}>
          <Text style={[buttonsStyles.main_donwnload_text]}>
            Download Daily Report
          </Text>
        </Pressable>
      ) : (
        <Text style={[buttonsStyles.main_donwnload_text]}>
          No data to share
        </Text>
      )}
    </View>
  );
}
