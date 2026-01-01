import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography, Paper, Popover, useTheme } from '@mui/material';

// =========================================================
// 1. البيانات الثابتة لتوزيع الجهات
// =========================================================
const sanaaDistributionData = [
    { 
        district: "مديرية التحرير", 
        "جهات تدريب": 15,
        companies: ["شركة أمان تكنولوجي", "مركز الإبداع للبرمجة", "معهد المستقبل", "الشركة اليمنية للاتصالات", "جهة تدريب 5", "جهة تدريب 6", "جهة تدريب 7", "جهة تدريب 8", "جهة تدريب 9", "جهة تدريب 10", "جهة تدريب 11", "جهة تدريب 12", "جهة تدريب 13", "جهة تدريب 14", "جهة تدريب 15"]
    },
    { 
        district: "مديرية السبعين", 
        "جهات تدريب": 12,
        companies: ["مجموعة هائل سعيد", "شركة برمجيات النجاح", "المؤسسة العامة للكهرباء", "شركة الرشيد", "جهة تدريب 5", "جهة تدريب 6", "جهة تدريب 7", "جهة تدريب 8", "جهة تدريب 9", "جهة تدريب 10", "جهة تدريب 11", "جهة تدريب 12"]
    },
    { 
        district: "مديرية الوحدة", 
        "جهات تدريب": 18,
        companies: ["بنك اليمن والكويت", "جامعة صنعاء", "مختبرات التقنية الحديثة", "مركز اللغات", "جهة تدريب 5", "جهة تدريب 6", "جهة تدريب 7", "جهة تدريب 8", "جهة تدريب 9", "جهة تدريب 10", "جهة تدريب 11", "جهة تدريب 12", "جهة تدريب 13", "جهة تدريب 14", "جهة تدريب 15", "جهة تدريب 16", "جهة تدريب 17", "جهة تدريب 18"]
    },
    { district: "مديرية معين", "جهات تدريب": 8, companies: ["شركة مياه", "مصنع أدوية", "شركة سياحة", "مكتب محاماة", "جهة 5", "جهة 6", "جهة 7", "جهة 8"] },
    { district: "مديرية شعوب", "جهات تدريب": 5, companies: ["مؤسسة خيرية", "مدرسة دولية", "استديو تصميم", "شركة استيراد", "جهة 5"] },
];

// =========================================================
// 2. موضوع الرسم البياني (Theme)
// =========================================================
const chartTheme = {
    axis: {
        domain: { line: { stroke: '#ddd' } },
        ticks: { line: { stroke: '#ddd' }, text: { fontSize: 11, fill: '#666' } },
        legend: { text: { fontSize: 13, fill: '#333', fontWeight: 'bold' } },
    },
    grid: { line: { stroke: '#eee' } },
    legends: { text: { fontSize: 12, fill: '#333' } },
};

// =========================================================
// 3. المكون الرئيسي (SanaaBarChart)
// =========================================================
export default function SanaaBarChart() {
    const theme = useTheme();
    const [popoverAnchor, setPopoverAnchor] = useState(null); 
    const [popoverCompanies, setPopoverCompanies] = useState(null);
    const [popoverTitle, setPopoverTitle] = useState("");

    const hasData = sanaaDistributionData && sanaaDistributionData.length > 0;
    
    // دالة فتح Popover عند النقر على العمود
    const handleBarClick = (bar, event) => {
        setPopoverCompanies(bar.data.companies);
        setPopoverTitle(`${bar.data.district} (${bar.data["جهات تدريب"]})`);
        setPopoverAnchor(event.currentTarget);
    };

    // دالة إغلاق Popover
    const handlePopoverClose = () => {
        setPopoverAnchor(null);
    };

    const isPopoverOpen = Boolean(popoverAnchor);

    // موضوع مخصص لإضافة نمط المؤشر 'pointer'
    const interactiveTheme = {
        ...chartTheme,
        bar: {
            itemOpacity: 1,
            itemHoverOpacity: 0.9,
            cursor: 'pointer', // يجعل العمود يبدو قابلاً للنقر
        },
    };

    return (
        <Box height="100%" width="100%">
            
            {/* ✨ التوجيه الواضح لرئيس اللجنة */}
            <Typography variant="subtitle2" align="center" color="text.secondary" p={1} sx={{ bgcolor: theme.palette.action.hover, borderRadius: 1 }}>
                🔴 **انقر على أي عمود** للمديرية لعرض **قائمة الشركات المعتمدة** فيها.
            </Typography>
            
            {hasData ? (
                <Box height="calc(100% - 60px)" width="100%"> {/* تم تعديل الارتفاع ليتسع لـ Typography */}
                    <ResponsiveBar 
                        data={sanaaDistributionData}
                        keys={['جهات تدريب']} 
                        indexBy="district" 
                        theme={interactiveTheme}
                        colors={{ scheme: 'category10' }} 
                        layout="horizontal" 
                        margin={{ top: 10, right: 100, bottom: 50, left: 140 }} 
                        
                        isInteractive={true}
                        onClick={handleBarClick} 
                        
                        // ✨ حذف خاصية tooltip لتبسيط الواجهة
                        
                        // المحاور
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'عدد جهات التدريب المعتمدة',
                            legendPosition: 'middle',
                            legendOffset: 36
                        }}
                        axisLeft={{ 
                            tickSize: 0,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'مديرية صنعاء', 
                            legendPosition: 'middle', 
                            legendOffset: -130 
                        }}
                        legends={[
                            { 
                                dataFrom: 'keys', 
                                anchor: 'right', 
                                direction: 'column', 
                                translateX: 110, 
                                itemWidth: 80, 
                                itemHeight: 30 
                            }
                        ]}
                        enableLabel={false} 
                        padding={0.3}
                    />
                </Box>
            ) : (
                <Typography variant="body1" align="center" p={3}>
                    جاري تحميل بيانات توزيع المديريات...
                </Typography>
            )}

            {/* مكون Popover لعرض أسماء الشركات عند النقر */}
            <Popover
                open={isPopoverOpen}
                anchorEl={popoverAnchor}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Paper sx={{ p: 2, maxWidth: 350, direction: 'rtl', maxHeight: 300, overflowY: 'auto' }}>
                    <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} mb={1}>
                        {popoverTitle}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        قائمة جهات التدريب:
                    </Typography>
                    <Box component="ul" sx={{ padding: '0 0 0 20px', margin: 0 }}>
                        {popoverCompanies && popoverCompanies.map((company, index) => (
                            <Typography key={index} component="li" variant="body2">{company}</Typography>
                        ))}
                    </Box>
                </Paper>
            </Popover>
        </Box>
    );
}