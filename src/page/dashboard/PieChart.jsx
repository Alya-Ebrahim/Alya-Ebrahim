import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box} from '@mui/material'; 

const data = [
 { id: "منجز", label: "تدريب منجز بنجاح", value: 850, color: "hsl(140, 70%, 50%)" }, 
 { id: "قيد التدريب", label: "طلاب قيد التدريب", value: 450, color: "hsl(210, 70%, 50%)" }, 
 { id: "معلق", label: "حالات معلقة", value: 200, color: "hsl(30, 70%, 50%)" } 
];



export default function PieChart() {
  return (
    <Box sx={{height:"100%" }}>
       <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
        innerRadius={0.5}
        enableArcLinkLabels={false}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                translateY: 200,
                itemWidth: 100,
                itemHeight: 30,
                symbolShape: 'circle'
            }
        ]}
    />
    </Box>
  )
}

