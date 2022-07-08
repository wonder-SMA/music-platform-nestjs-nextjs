import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface StepWrapperProps {
  activeStep: number;
  children?: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите трек'];

  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) =>
          <Step
            key={index}
            completed={activeStep > index}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        )}
      </Stepper>
      <Grid container justifyContent="center" style={{ margin: '70px 0', height: 270 }}>
        <Card style={{ width: 600 }}>
          {children}
        </Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
