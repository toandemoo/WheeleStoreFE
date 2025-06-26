import BackButton from '@components/BackButton/BackButton';
import Header from '@components/Header/Header';
import ProgressSteps from '@components/ProgressStep/ProgressSteps';
import CheckBikes from './CheckBikes';
import { useState, useEffect } from 'react';
import VerifyPage from './Verify';
import Payment from './Payment';
import BikeConfirm from './BikeConfirm';

function CheckoutPage(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsComponents = [
    CheckBikes,
    BikeConfirm,
    Payment,
  ];

  const StepComponent = stepsComponents[currentStep] || (() => <div>Không tìm thấy bước</div>);

  useEffect(() => {
    if (props.currentStep != null) {
      setCurrentStep(props.currentStep);
    }
  }, [props.currentStep]);

  return (
    <>
      <Header />
      <ProgressSteps
        steps={['Bike choose', 'Bike confirmation', 'Payments']}
        currentStep={currentStep}
      />
      <StepComponent currentStep={setCurrentStep} />
    </>
  );
}

export default CheckoutPage;
