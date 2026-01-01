import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import { DownloadOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Dashboard() {
  // استخدام useRef لتحديد محتوى الصفحة
  const dashboardRef = useRef();

  const handleDownloadPDF = () => {
    if (!dashboardRef.current) return;

    html2canvas(dashboardRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    }).catch((err) => {
      console.error("حدث خطأ عند تنزيل PDF:", err);
    });
  };

  return (
    <div>
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        <Button sx={{ padding: "6px 8px" }} variant="contained" onClick={handleDownloadPDF}>
          تنزيل التقرير
          <DownloadOutlined sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* أرفق المرجع هنا */}
      <div ref={dashboardRef}>
        <Row1 />
        <Row2 />
        <Row3 />
      </div>
    </div>
  );
}
