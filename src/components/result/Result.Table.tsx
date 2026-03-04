import React from "react";
import type { IResult } from "../../types/result.types";

interface Props {
  results: IResult[];
}

const ResultTable: React.FC<Props> = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Semester</th>
          <th>CGPA</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result._id}>
            <td>{result.semester}</td>
            <td>{result.cgpa}</td>
            <td>{result.overallStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;