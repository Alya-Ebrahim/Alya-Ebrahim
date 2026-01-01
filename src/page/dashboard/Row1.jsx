import { Stack, useTheme } from '@mui/material'
import React from 'react'
import Card from './Card'; // افترضنا أنك عدلت هذا المكون ليقبل 'value'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { data1, data2, data3, data4 } from './Data'; 

export default function Row1() {
    const theme = useTheme();
    
    // دالة لاستخلاص اللون الأساسي
    const getColor = (data) => (data && data.length > 0 ? data[0].color : theme.palette.secondary.main);
    
    const cardColor1 = getColor(data1);
    const cardColor2 = getColor(data2);
    const cardColor3 = getColor(data3);
    const cardColor4 = getColor(data4);

    return (
        <Stack 
            direction={"row"} 
            gap={1.5} // زيادة الفراغ قليلاً
            flexWrap={"wrap"} 
            justifyContent={{xs: "center" , sm: "space-between"}}
        >
            
            {/* 1. متوسط التقييم */}
            <Card 
                icon={<TrendingUpIcon sx={{fontSize: "23px", color: cardColor1}} />} 
                title={ "متوسط تقييم الطلاب لجهات التدريب"} 
                data={data1} 
                value={"4.5"} // ✨ القيمة الرئيسية المضافة
                increase={"+20%"}
                cardColor={cardColor1} 
            />
            
            {/* 2. جهات التدريب */}
            <Card 
                icon={<CheckCircleOutlineIcon sx={{fontSize: "23px", color: cardColor2}}/>} 
                title={"جهات التدريب"} 
                data={data2} 
                value={"150"} // ✨ القيمة الرئيسية المضافة
                increase={"+5%"}
                cardColor={cardColor2}
            />
            
            {/* 3. طلاب قيد التدريب */}
            <Card 
                icon={<GroupIcon sx={{fontSize: "23px", color: cardColor3}} />} 
                title={"طلاب قيد التدريب"} 
                data={data3} 
                value={"1,200"} // ✨ القيمة الرئيسية المضافة
                increase={"+30%"}
                cardColor={cardColor3}
            />
            
            {/* 4. اجمالي الطلاب المسجلين */}
            <Card 
                icon={<PeopleOutlineIcon sx={{fontSize: "23px", color: cardColor4}}/>} 
                title={"اجمالي الطلاب المسجلين"} 
                data={data4} 
                value={"3,500"} // ✨ القيمة الرئيسية المضافة
                increase={"+45%"}
                cardColor={cardColor4}
            />
        </Stack>
    );
}