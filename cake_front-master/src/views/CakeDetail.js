import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";
import "../styles/common.scss";
import axios from "axios";
import { API_URL_CAKE_DETAIL_INFO, API_URL_COMMENTS } from "../api/CakeApiUrls";
import { useParams } from "react-router-dom";
import QualityMetricsTable from "../components/QualityMetricsTable";
import QuestionnaireResultsTable from "../components/QuestionnaireResultsTable";
import CakeDetailCard from "../components/CakeDetailCard";
import Questionnaire from "../components/Questionnaire";
import SendQuealityMetrics from "../components/SendQuealityMetrics";
import QuestionnaireComparison from "../components/QuestionnaireComparison";
import CommentsTable from "../components/CommentsTable";
import AddComment from "../components/AddComment";


export default function CakeDetail() {
  const cakeId = useParams().id;
  const [cakeInfoQuolityMetricsLength, setCakeInfoQuolityMetricsLength] =
    useState(0);
  const [cakeInfo, setCakeInfo] = useState([]);
  const [commentsInfo, setCommentsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baseCakeInfo, setBaseCakeInfo] = useState([]);
  const [cakeAnswersInfo, setCakeAnswersInfo] = useState([]);

  useEffect(() => {}, [cakeInfo]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let questionnaireList = [];
    axios.get(`${API_URL_CAKE_DETAIL_INFO}${cakeId}/`).then((response) => {
      setCakeInfoQuolityMetricsLength(
        Object.keys(response.data.quality_metrics).length
      );
      setCakeInfo(response.data);

      if (response.data.questionnaire_results) {
        response.data.questionnaire_results.map((el) =>
          questionnaireList.push([
            el.shape_and_appearance,
            el.structure_and_consistency,
            el.taste_and_smell,
            el.grade,
          ])
        );
        setCakeAnswersInfo(questionnaireList);
      }
    });
    axios.get(`${API_URL_COMMENTS}${cakeId}/`).then((response) => {
      setCommentsInfo(response.data[0]);
    });
    setLoading(false);
  };

  return (
    <div className="CakeDetail">
      <>
        <Container fluid>
          <Row>
            <Col md="6">
              {cakeInfo ? (
                <CakeDetailCard
                  average_grade={cakeInfo.average_grade}
                  composition={cakeInfo.composition}
                  country={cakeInfo.country}
                  description={cakeInfo.description}
                  image={cakeInfo.image}
                  manufacturer={cakeInfo.manufacturer}
                  name={cakeInfo.name}
                  id={cakeId}
                />
              ) : (
                <></>
              )}
            </Col>
            <Col md="6">
              {cakeInfoQuolityMetricsLength != 0 ? (
                <QualityMetricsTable
                  dataProvided={true}
                  name={cakeInfo.name}
                  margarine_presence={
                    cakeInfo.quality_metrics.margarine_presence
                  }
                  preservatives_presence={
                    cakeInfo.quality_metrics.preservatives_presence
                  }
                  antioxidants_presence={
                    cakeInfo.quality_metrics.antioxidants_presence
                  }
                  benzoic_acid_presence={
                    cakeInfo.quality_metrics.benzoic_acid_presence
                  }
                  sodium_benzoate_presence={
                    cakeInfo.quality_metrics.sodium_benzoate_presence
                  }
                  calcium_sulfite_presence={
                    cakeInfo.quality_metrics.calcium_sulfite_presence
                  }
                  nisin_presence={cakeInfo.quality_metrics.nisin_presence}
                  sodium_pyrosulfite_presence={
                    cakeInfo.quality_metrics.sodium_pyrosulfite_presence
                  }
                  potassium_pyrosulfite_presence={
                    cakeInfo.quality_metrics.potassium_pyrosulfite_presence
                  }
                  butylhydroxyanisole_presence={
                    cakeInfo.quality_metrics.butylhydroxyanisole_presence
                  }
                />
              ) : (
                <QualityMetricsTable dataProvided={false} />
              )}
            </Col>
            </Row>
            
          {cakeInfo.questionnaire_results ? (
            <Row>
              <Col>
                <QuestionnaireComparison
                  dataProvided={true}
                  cakeAnswersInfo={cakeAnswersInfo}
                />
              </Col>
              <Col>
                <QuestionnaireResultsTable
                  dataProvided={true}
                  data={cakeInfo.questionnaire_results}
                />
              </Col>
            </Row>
          ) : (
            <>
              <Col>
                <QuestionnaireComparison dataProvided={false} />
              </Col>
              <Col>
                <QuestionnaireResultsTable dataProvided={false} />
              </Col>
            </>
          )}
          <Row>
            {((localStorage.getItem("is_superuser") == "true" && cakeId == 1) ||
              (cakeId != 1 && localStorage.getItem("logged_in") == "true")) &&
            cakeInfoQuolityMetricsLength == 0 ? (
              <Col className="md-6">
                <SendQuealityMetrics id={cakeId} />
              </Col>
            ) : (
              <></>
            )}
            {(localStorage.getItem("is_superuser") == "true" && cakeId == 1) ||
            (cakeId != 1 && localStorage.getItem("logged_in") == "true") ? (
              <Col className="md-6">
                <Questionnaire id={cakeId} />
              </Col>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Col>
                <CommentsTable
                dataProvided={commentsInfo.length > 0 ? true : false}
                data={commentsInfo}
              />
              {(localStorage.getItem("is_superuser") == "true" && cakeId == 1) ||
            (cakeId != 1 && localStorage.getItem("logged_in") == "true") ? (
                <AddComment cakeId={cakeId} />
            ) : (
              <></>
            )}
            </Col>
            
          </Row>
        </Container>
      </>
    </div>
  );
}
