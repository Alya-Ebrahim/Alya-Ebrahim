// src/components/SummaryCard.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
        cursor: 'pointer',
    },
}));

const IconBox = styled(Box)(({ theme }) => ({
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main, // لون أساسي
}));

const SummaryCard = ({ title, value, icon, onClick, isClickable = false }) => {
    return (
        <StyledPaper 
            elevation={3}
            onClick={onClick}
            sx={{ 
                cursor: isClickable ? 'pointer' : 'default',
            }}
        >
            <IconBox>
                {/* عرض الأيقونة المرسلة (يمكن أن تكون رمزاً أو مكون MUI) */}
                {icon}
            </IconBox>
            
            <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                {value}
            </Typography>
            
            <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 0.5 }}>
                {title}
            </Typography>
        </StyledPaper>
    );
};

export default SummaryCard;