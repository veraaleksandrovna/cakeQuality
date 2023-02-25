import { Table, Card } from "react-bootstrap";

export default function QualityMetricsTable({
  dataProvided,
  name,
  margarine_presence,
  preservatives_presence,
  antioxidants_presence,
  benzoic_acid_presence,
  nisin_presence,
  butylhydroxyanisole_presence,
  calcium_sulfite_presence,
  potassium_pyrosulfite_presence,
  sodium_pyrosulfite_presence,
  sodium_benzoate_presence,
}) {
  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h4">Наличие вредных добавок</Card.Title>
        <p className="card-category">
          Чем меньше вредных добавок - тем выше качество продукции
        </p>
        {dataProvided ? <></> : <h4>Нет данных</h4>}
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        {dataProvided ? (
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Добавка</th>
                <th className="border-0">Торт "{name}"</th>
                <th className="border-0">Базовый объект</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Наличие маргарина</td>
                <td>
                  {!margarine_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие консервантов E200-299</td>
                <td>
                  {!preservatives_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие антиокислителей E300-399</td>
                <td>
                  {!antioxidants_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие бензойной кислоты Е-210</td>
                <td>
                  {!benzoic_acid_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие бензоата натрия Е-211</td>
                <td>
                  {!sodium_benzoate_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие пиросульфита натрия Е-223</td>
                <td>
                  {!sodium_pyrosulfite_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие пиросульфита калия Е-224</td>
                <td>
                  {!potassium_pyrosulfite_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие сульфита кальция Е-226</td>
                <td>
                  {!calcium_sulfite_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие низина Е-234</td>
                <td>
                  {!nisin_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
              <tr>
                <td>Наличие бутилгидроксианизола E-320</td>
                <td>
                  {!butylhydroxyanisole_presence ? (
                    <img
                      className="tick-cross"
                      src={require("assets/img/cross.png")}
                    />
                  ) : (
                    <img
                      className="tick-cross"
                      src={require("assets/img/tick.png")}
                    />
                  )}
                </td>
                <td>
                  <img
                    className="tick-cross"
                    src={require("assets/img/cross.png")}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}
