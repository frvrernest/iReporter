import React, { createContext, useState } from 'react';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    setReports((prevReports) => [...prevReports, report]);
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
