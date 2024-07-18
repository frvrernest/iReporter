import React, { createContext, useState } from 'react';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    setReports((prevReports) => [...prevReports, report]);
  };

  const updateReport = (updatedReport) => {
    setReports(prevReports =>
      prevReports.map(report => (report.id === updatedReport.id ? updatedReport : report))
    );
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
