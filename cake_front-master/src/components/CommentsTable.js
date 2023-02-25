import { Table, Card } from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";

export default function CommentsTable({ data, dataProvided }) {
  // useEffect(() => {
  //   console.log("gggggggggggggggg", data, dataProvided);
  // }, []);
  return (
    <Card className="card-plain table-plain-bg">
      <Card.Header>
        <Card.Title as="h4">Комментарии</Card.Title>
        <p className="card-category">Комментарии пользователей о продукции</p>
        {dataProvided === true ? <></> : <h4>Прокомментируйте первым!</h4>}
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        {data.length > 0 ? (
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">Пользователь</th>
                <th className="border-0">Комментарий</th>
                <th className="border-0">Время</th>
              </tr>
            </thead>
            <tbody>
              {data.map((comment) => (
                <tr>
                  <td>{comment.user}</td>
                  <td>{comment.text}</td>
                  <td>{comment.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}
