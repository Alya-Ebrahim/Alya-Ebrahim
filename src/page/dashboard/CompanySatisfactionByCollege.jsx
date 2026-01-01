import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function CompanySatisfactionByCollege() {

    const data = {
        "كلية علوم الحاسب": [
            { company: "شركة الابتكار", satisfaction: 4.5 },
            { company: "مؤسسة النجاح", satisfaction: 4.2 },
            { company: "تقنية المستقبل", satisfaction: 4.0 },
        ],
        "كلية الهندسة": [
            { company: "هندسة برو", satisfaction: 3.8 },
            { company: "مجموعة البناء", satisfaction: 4.1 },
        ],
        "كلية إدارة الأعمال": [
            { company: "بيزنس ستار", satisfaction: 4.7 },
            { company: "حلول الغد", satisfaction: 4.3 },
        ],
    };

    const colleges = Object.keys(data);
    const [selectedCollege, setSelectedCollege] = useState(colleges[0]);

    return (
        <div style={{ direction: "rtl", width: "100%" }}>
            
            {/* ====== الفلتر ====== */}
            <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                    اختر الكلية:
                </label>
                <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    style={{
                        padding: "15px",
                        marginRight: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                >
                    {colleges.map((college) => (
                        <option key={college} value={college}>
                            {college}
                        </option>
                    ))}
                </select>
            </div>

            {/* ====== المخطط ====== */}
            <div style={{ height: "65vh", width: "100%" }}>
                <ResponsiveBar
                    data={data[selectedCollege]}
                    keys={["satisfaction"]}
                    indexBy="company"
                    margin={{ top: 50, right: 60, left: 60, bottom: 120 }}
                    padding={0.3}
                    colors={{ scheme: "set2" }}
                    axisBottom={{
                      
                        legend: "جهة التدريب",
                        legendPosition: "middle",
                        legendOffset: 60,
                    }}
                    axisLeft={{
                        legend: "متوسط رضا الطلاب",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                    labelSkipWidth={0}
                    labelSkipHeight={0}
                />
            </div>
        </div>
    );
}
