import { Routes, Route, Navigate } from 'react-router-dom';
import Payment from '../Payment/Payment';
import { PaymentInfo } from '../Summary/PaymentInfo';

export const Body = () => {
    return (
        <>
           <Routes>
               <Route path={'*'} element={<Navigate to="/" />}/>
               <Route path="/" element={<Payment />}/>
               <Route path="/paymentinfo" element={<PaymentInfo />}/>
           </Routes>
        </>
    )
}