import React, { useState } from "react";
import { executeCode } from "./api";

export default function Output({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoader(true);
      setOutput(null);
      const result = await executeCode(language, sourceCode);
      setOutput(result.run.output.split("\n"));
      result.run.stderr ? setIsError(true) : setIsError(false);
      console.log("Error" + isError);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <div className="contianer output">
        <button
          type="button"
          className="btn btn-outline-success m-2"
          onClick={runCode}
        >
          <span
            className={`${isLoader ? "spinner-border" : ""} spinner-border-sm`}
            role="status"
            aria-hidden="true"
          ></span>
          {isLoader ? "Loading" : "Run Code"}
        </button>

        <div
          className={`outputResult contaienr p-2 ${
            isError ? "text-danger" : ""
          }`}
          // style={{ color: isError ? "red !important" : "white" }}
        >
          {output
            ? output.map((line, i) => <p key={i}>{line}</p>)
            : 'Click "Run Code" to see the output here..'}
        </div>

        {isLoader && (
          <div className="text-center loader">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
