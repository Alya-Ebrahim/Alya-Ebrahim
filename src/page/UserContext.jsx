import React, { createContext, useContext, useState, useMemo } from 'react';

// ------------------------------------------------------------------
// 📚 البيانات الأولية (Static Data for Local State Initialization)
// ------------------------------------------------------------------
const INITIAL_SUPERVISORS = [
    { id: 1, name: 'محمد الدويل', major: 'نظم معلومات', currentStudents: 11, status: 'نشط', email: 'mohamed@example.com', phone: '771234567', college: 'الحاسبات' },
    { id: 2, name: 'عبداللطيف غلاب', major: 'علوم حاسوب', currentStudents: 12, status: 'نشط', email: 'abdullatif@example.com', phone: '777654321', college: 'الحاسبات' },
    { id: 3, name: 'بلال الفهيدي', major: 'هندسة معماري', currentStudents: 20, status: 'غير نشط', email: 'bilal@example.com', phone: '770123456', college: 'الهندسة' }, 
    { id: 4, name: 'احمد فؤاد', major: 'ادارة اعمال ', currentStudents: 8, status: 'نشط', email: 'ahmed@example.com', phone: '774567890', college: 'التجارة' },
    { id: 9, name: 'عائشة الحدم', major: 'طب اسنان', currentStudents: 11, status: 'غير نشط', email: 'aisha@example.com', phone: '779876543', college: 'طب' },
];

const INITIAL_PROVIDERS = [
    { id: 1, name: 'تليمن', supervisor: 'محمد احمد', supportedMajors: 'هندسة برمجيات', currentStudents: 11, website: 'telemen.com', contact: '967771111111', college: 'الحاسبات' },
    { id: 2, name: 'سبأفون', supervisor: 'منصور ابراهيم', supportedMajors: 'نظم معلومات', currentStudents: 12, website: 'sabafon.com', contact: '967772222222', college: 'الحاسبات' },
    { id: 3, name: ' العامودي للهندسة', supervisor: 'احمد عبدالاله', supportedMajors: 'هندسة معماري ', currentStudents: 20, website: 'yemen4g.com', contact: '967773333333', college: 'الهندسة' },
    { id: 4, name: ' مستشفى الجمهوري', supervisor: 'فاروق ابو قطينة', supportedMajors: 'طب اسنان ', currentStudents: 30, website: 'yemenmobile.com', contact: '967774444444', college: 'طب' },
    { id: 5, name: 'you', supervisor: 'اسماعيل مفتاح', supportedMajors: 'ذكا اصطناعي', currentStudents: 5, website: 'you.com', contact: '967775555555', college: 'الحاسبات' },
];

// ------------------------------------------------------------------

// إنشاء السياق (Context)
const UserContext = createContext();

// Hook مخصص لسهولة الاستخدام
export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};

// المزود (Provider)
export const UserProvider = ({ children }) => {
    // إدارة الحالة باستخدام useState
    const [supervisors, setSupervisors] = useState(INITIAL_SUPERVISORS);
    const [trainingProviders, setTrainingProviders] = useState(INITIAL_PROVIDERS);
    
    // دالة للبحث عن مستخدم معين بالـ ID والـ Type
    const findUser = (id, type) => {
        const idNum = parseInt(id, 10);
        const data = type === 'supervisor' ? supervisors : trainingProviders;
        return data.find(user => user.id === idNum);
    };

    // دالة لإضافة مستخدم (مشرف أو جهة تدريب)
    const addUser = (data, type) => {
        const newData = {
            ...data,
            id: Date.now(), // تعيين ID فريد
        };

        if (type === 'supervisor') {
            setSupervisors(prev => [...prev, newData]);
        } else if (type === 'provider') {
            setTrainingProviders(prev => [...prev, newData]);
        }
        return true;
    };

    // دالة لتعديل بيانات مستخدم موجود
    const editUser = (id, type, updatedData) => {
        const idNum = parseInt(id, 10);
        const updater = (prev) => prev.map(user => 
            user.id === idNum ? { ...user, ...updatedData } : user
        );

        if (type === 'supervisor') {
            setSupervisors(updater);
        } else if (type === 'provider') {
            setTrainingProviders(updater);
        }
        return true;
    };

    // دالة لحذف مستخدم (مشرف أو جهة تدريب)
    const deleteUser = (id, type) => {
        const idNum = parseInt(id, 10);
        
        if (type === 'supervisor') {
            setSupervisors(prev => prev.filter(user => user.id !== idNum));
        } else if (type === 'provider') {
            setTrainingProviders(prev => prev.filter(user => user.id !== idNum));
        }
        return true;
    };

    // تجميع القيم المراد تمريرها عبر السياق
    const contextValue = useMemo(() => ({
        supervisors,
        trainingProviders,
        addUser,
        editUser,
        deleteUser,
        findUser,
    }), [supervisors, trainingProviders]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};