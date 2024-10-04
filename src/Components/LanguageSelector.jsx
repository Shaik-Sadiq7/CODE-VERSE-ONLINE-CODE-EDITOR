import React, { version } from "react";
import { LANGUAGE_VERSIONS } from "./constant";

const languages = Object.entries(LANGUAGE_VERSIONS);

export default function LanguageSelector({ language, onSelect }) {
  return (
    <>
      <div className="dropdown m-2">
        <button
          className="btn btn-outline-success dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {language}
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {languages.map(([language, version]) => {
            return (
              <li
                key={language}
                className="d-flex align-self-center"
                onClick={() => onSelect(language)}
              >
                <div className="dropdown-item py-0 d-flex">
                  {language} &nbsp;
                  <p className="fw-lighter fst-italic">{version}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
