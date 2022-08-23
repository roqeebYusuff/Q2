import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import { fetchCovid } from "./states";

function App() {
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCovid());
  }, []);

  return (
    <Container>
      <h2>Covid stats in Nigeria</h2>
      {state.loading && <>Loading...</>}
      {!state.loading && state.error ? <>Error: {state.error} </> : null}
      {!state.loading && state?.records?.states?.length ? (
        <>
          <span>
            Total Samples Tested: <b>{state.records.totalSamplesTested} </b>
          </span>
          <span>
            TotalConfirmedCases: <b>{state.records.totalConfirmedCases} </b>
          </span>
          <span>
            totalActiveCases: <b>{state.records.totalActiveCases} </b>
          </span>
          <span>
            discharged: <b>{state.records.discharged} </b>
          </span>
          <span>
            death: <b>{state.records.death} </b>
          </span>
          <Table bordered borderless hover responsive size="sm" striped>
            <thead>
              <tr>
                <th>State</th>
                <th>Confirmed Cases</th>
                <th>Cases On Admission</th>
                <th>Death</th>
                <th>Discharged</th>
              </tr>
            </thead>
            <tbody>
              {state?.records?.states?.map((rec) => (
                <tr>
                  <th scope="row">{rec.state}</th>
                  <td>{rec.confirmedCases}</td>
                  <td>{rec.casesOnAdmission}</td>
                  <td>{rec.death}</td>
                  <td>{rec.discharged}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default App;
