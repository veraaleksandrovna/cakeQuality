import "../styles/common.scss";
import ChartistGraph from "react-chartist";
import { Card } from "react-bootstrap";
import React from "react";

export default function QuestionnaireComparison({
  cakeAnswersInfo,
  dataProvided,
}) {
  return (
    <>
      {dataProvided && cakeAnswersInfo.length > 0 ? (
        <Card className="p-3">
          <Card.Header>
            <Card.Title as="h4">Результаты анкетирования</Card.Title>
            <p className="card-category">
              Графическая демонстрация результатов анкетирования
            </p>
          </Card.Header>
          <Card.Body>
            <div className="ct-chart" id="chartHours">
              <ChartistGraph
                data={{
                  labels: [
                    "Форма и внешность",
                    "Структура и консистенция",
                    "Вкус и запах",
                    "Итоговая оценка",
                  ],
                  series: cakeAnswersInfo,
                }}
                type="Line"
                options={{
                  low: 1,
                  high: 5,
                  showArea: false,
                  height: "245px",
                  axisX: {
                    showGrid: false,
                  },
                  lineSmooth: true,
                  showLine: true,
                  showPoint: true,
                  fullWidth: true,
                  chartPadding: {
                    right: 50,
                  },
                }}
                responsiveOptions={[
                  [
                    "screen and (max-width: 640px)",
                    {
                      axisX: {
                        labelInterpolationFnc: function (value) {
                          return value[0];
                        },
                      },
                    },
                  ],
                ]}
              />
            </div>
          </Card.Body>
          {/* <Card.Footer>
        <div className="legend">
          <i className="fas fa-circle text-info"></i>
          Open <i className="fas fa-circle text-danger"></i>
          Click <i className="fas fa-circle text-warning"></i>
          Click Second Time
        </div>
      </Card.Footer> */}
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
