

import './App.css'
import { useState, useEffect } from 'react';
import data from '../data.json'
import { aggregateByYear, aggregateByCrop } from '../src/utills/categorized';
import { Table, Container, Title } from '@mantine/core';

// Define types for state data
interface YearlyCropData {
  Year: string;
  MaxCrop: string;
  MinCrop: string;
}

interface CropAverageData {
  Crop: string;
  AvgYield: number;
  AvgArea: number;
}


function App() {
  const [yearlyData, setYearlyData] = useState<YearlyCropData[]>([]);
  const [cropAverageData, setCropAverageData] = useState<CropAverageData[]>([]);


  useEffect(() => {
    // fetching json data and covert by categorized
    setYearlyData(aggregateByYear(data));
    setCropAverageData(aggregateByCrop(data));
  }, []);

  return (
    <>
      <div>
        <Container>
          <Title order={2} mt="md">Assignment of 2 Table Created By Ravi Ranjan Jha</Title>

          {/* Yearly Crop Data Table */}
          <Title order={3} mt="md">Yearly Crop Data</Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Crop with Maximum
                  Production in that Year</th>
                <th>Crop with Minimum
                  Production in that Year</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Year}</td>
                  <td>{row.MaxCrop}</td>
                  <td>{row.MinCrop}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Crop Average Data Table */}
          <Title order={3} mt="md">Crop Average Data</Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Average Yield of the
                  Crop between
                  1950-2020</th>
                <th>Average Cultivation Area
                  of the Crop between
                  1950-2020</th>
              </tr>
            </thead>
            <tbody>
              {cropAverageData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Crop}</td>
                  <td>{row.AvgYield}</td>
                  <td>{row.AvgArea}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  )
}

export default App
