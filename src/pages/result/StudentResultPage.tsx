import { useEffect, useState } from "react";
import { getOwnResults } from "../../api/result.api";
import type { IResult } from "../../types/result.types";
import ResultTable from "../../components/result/Result.Table";

const StudentResultPage = () => {
  const [results, setResults] = useState<IResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await getOwnResults();
      setResults(res.data.data);
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>My Results</h2>
      <ResultTable results={results} />
    </div>
  );
};

export default StudentResultPage;