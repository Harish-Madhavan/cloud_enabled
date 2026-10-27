import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalcProvider } from './context/CalcContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Calculator Pages
import StandardCalcPage from './pages/StandardCalcPage';
import ScientificCalcPage from './pages/ScientificCalcPage';
import CurrencyCalcPage from './pages/CurrencyCalcPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <CalcProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Standard Math Calculator */}
              <Route path="/" element={<StandardCalcPage />} />

              {/* Scientific & Statistical Data Reducer Calculator */}
              <Route path="/scientific" element={<ScientificCalcPage />} />

              {/* Real-time Currency Converter using native Fetch API */}
              <Route path="/currency" element={<CurrencyCalcPage />} />

              {/* Calculation History Tape */}
              <Route path="/history" element={<HistoryPage />} />

              {/* Dynamic route segment for single past calculation */}
              <Route path="/history/:calcId" element={<HistoryDetailPage />} />

              {/* Wildcard 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CalcProvider>
  );
}
