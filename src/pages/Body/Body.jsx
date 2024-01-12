import { Routes, Route, Navigate } from 'react-router-dom';
import Payment from '../Payment/Payment';

export const Body = () => {
    return (
        <>
           <Routes>
               <Route path={'*'} element={<Navigate to="/" />}/>
               <Route path="/" element={<Payment />}/>
               <Route path="/pago" element={<Payment />}/>
           </Routes>
        </>
    )
}