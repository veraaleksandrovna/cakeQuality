import { Table, Card} from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";

export default function QuestionnaireResultsTable({
  data,
  dataProvided,
}) 
{

  // useEffect(() => {
  //   console.log('ttt', data, dataProvided)
  
  // }, []);
  return (
    <Card className="card-plain table-plain-bg">
    <Card.Header>
      <Card.Title as="h4">Результаты анкетирования</Card.Title>
      <p className="card-category">
        Ответы пользователей о качестве продукции
      </p>
      {dataProvided && data.length > 0?<></>:<h4>Нет данных</h4>}
    </Card.Header>
    <Card.Body className="table-full-width table-responsive px-0">
    {dataProvided && data.length > 0 ?
      <Table className="table-hover">
        <thead>
          <tr>
            <th className="border-0">Пользователь</th>
            <th className="border-0">Средгяя оценка</th>
            <th className="border-0">Внешний вид и форма</th>
            <th className="border-0">Структура и консистенция</th>
            <th className="border-0">Запах и вкус</th>
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
          <tr>
          <td>{row.user}</td>
          <td>{row.grade}</td>
          <td>{row.shape_and_appearance}</td>
          <td>{row.structure_and_consistency}</td>
          <td>{row.taste_and_smell}</td>
        </tr>
		  ))}
        </tbody>
      </Table>
:<></>}
    </Card.Body>
  </Card>
  );
}
