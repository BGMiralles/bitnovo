import { Routes, Route, Navigate } from 'react-router-dom';
import Payment from '../Payment/Payment';
import { PaymentInfo } from '../Summary/PaymentInfo';
import Ok from '../Ok/Ok';
import Ko from '../ko/ko';

export const Body = () => {
    return (
        <>
           <Routes>
               <Route path={'*'} element={<Navigate to="/" />}/>
               <Route path="/" element={<Payment />}/>
               <Route path="/paymentinfo" element={<PaymentInfo />}/>
               <Route path="/ok" element={<Ok />}/>
               <Route path="/ko" element={<Ko />}/>
           </Routes>
        </>
    )
}