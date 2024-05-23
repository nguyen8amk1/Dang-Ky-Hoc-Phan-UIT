import SubmitYourHocPhanInfo from '../components/SubmitYourHocPhanInfo';
import GeneratedLichThi from '../components/GeneratedLichThi';
import {useState} from 'react';

export function LichThi_GoogleCalendarGenerator() {
    const [step, setStep] = useState(0);

    return (
        <>
            {step == 0 && <SubmitYourHocPhanInfo/>}
            {step == 1 && <GeneratedLichThi />} 
        </>
    );
}
