import { ResponsiveLine } from '@nivo/line'
import { Box } from '@mui/material'; 
import React from 'react'

const completedTrainingData = [
  {
    id: "تدريب منجز بنجاح",
    data: [
      { x: "2020", y: 150 },
      { x: "2021", y: 180 },
      { x: "2022", y: 230 },
      { x: "2024", y: 200 },
      { x: "2025", y: 290 },
      { x: "2026", y: 280 },
    ],
  },
];

export default function CompletedTrainingLine() {
  return (
    <Box sx={{ height: "60vh", width: "100%" }}> 
      <ResponsiveLine
        data={completedTrainingData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisBottom={{
          legend: 'السنوات',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          legend: 'عدد الطلاب المنجزين',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enablePoints={true}
        enableGridX={true}
        enableGridY={true}
        useMesh={true}
        enableCrosshair={true}
        legends={[]}
      />
    </Box>
  )
}
