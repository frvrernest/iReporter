// components/ReportsContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const storedReports = await AsyncStorage.getItem('reports');
        if (storedReports) {
          setReports(JSON.parse(storedReports));
        }
      } catch (error) {
        console.error('Failed to load reports', error);
      }
    };

    loadReports();
  }, []);

  const addReport = async (newReport) => {
    try {
      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Failed to save report', error);
    }
  };

  const updateReport = async (updatedReport) => {
    try {
      const updatedReports = reports.map(report =>
        report.id === updatedReport.id ? updatedReport : report
      );
      setReports(updatedReports);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Failed to update report', error);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Failed to delete report', error);
    }
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReport, deleteReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext };
