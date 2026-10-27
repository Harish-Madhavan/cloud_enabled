import React, { useState, useEffect } from 'react';
import { useCalc } from '../context/CalcContext';
import CardWrapper from '../components/CardWrapper';
import { DollarSign, ArrowRightLeft, RefreshCw, AlertCircle, CheckCircle2, Loader2, Ban } from 'lucide-react';

const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 84.12,
  JPY: 152.3,
  CAD: 1.38,
  AUD: 1.51,
  SGD: 1.32
};

export default function CurrencyCalcPage() {
  const { addHistoryItem } = useCalc();

  // Controlled form state (useState)
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  // Network Fetch API States
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [abortController, setAbortController] = useState(null);

  // Native Fetch API call with async/await, AbortController, and Error Handling
  const fetchExchangeRates = async () => {
    // 1. Create AbortController instance
    const controller = new AbortController();
    setAbortController(controller);

    setLoading(true);
    setError(null);

    const apiUrl = 'https://open.er-api.com/v6/latest/USD';

    try {
      const response = await fetch(apiUrl, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // 2. Await JSON parsing
      const data = await response.json();

      // 3. ES6 Destructuring with defaults & validation
      const { rates: fetchedRates, time_last_update_utc } = data;
      if (fetchedRates) {
        setRates(fetchedRates);
        setLastUpdated(time_last_update_utc ? new Date(time_last_update_utc).toLocaleString() : new Date().toLocaleTimeString());
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Fetch request was safely canceled by AbortController signal.');
      } else {
        setError(`Live API fetch failed (${err.message}). Using built-in exchange rates.`);
        setRates(FALLBACK_RATES);
        setLastUpdated('Built-in Offline Rates');
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  // useEffect Hook: Fetch on initial component mount with cleanup function
  useEffect(() => {
    fetchExchangeRates();

    // Abort in-flight network request if user leaves this route
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Calculate Exchange (ES6+ optional chaining & nullish coalescing)
  const numericAmount = parseFloat(amount) || 0;
  const fromRate = rates?.[fromCurrency] ?? 1;
  const toRate = rates?.[toCurrency] ?? 1;
  const convertedResult = (numericAmount / fromRate) * toRate;
  const formattedResult = Math.round(convertedResult * 100) / 100;
  const exchangeRateUnit = Math.round((toRate / fromRate) * 10000) / 10000;

  // Record conversion to shared History
  const handleSaveConversion = () => {
    addHistoryItem({
      mode: 'Currency',
      equation: `${amount} ${fromCurrency} → ${toCurrency}`,
      result: `${formattedResult} ${toCurrency} (Rate: ${exchangeRateUnit})`
    });
  };

  const currencyList = Object.keys(rates).slice(0, 15);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <CardWrapper
        title="Live Currency Converter"
        badgeText="Native Fetch API"
        actions={
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={fetchExchangeRates}
              disabled={loading}
              className="btn btn-secondary btn-sm"
              title="Refetch live rates from open.er-api.com"
            >
              {loading ? <Loader2 size={13} className="spin" /> : <RefreshCw size={13} />}
              <span>Refresh Rates</span>
            </button>
            {loading && (
              <button onClick={handleAbort} className="btn btn-danger btn-sm" title="Abort in-flight request">
                <Ban size={13} /> Abort
              </button>
            )}
          </div>
        }
      >
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Real-time currency exchange rates queried via browser <code>Fetch API</code> with <code>async/await</code>, loading skeletons, and <code>AbortController</code> cleanup.
        </p>

        {/* API Status Alerts */}
        {error && (
          <div style={{
            padding: '0.6rem 0.85rem',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid var(--accent-warning)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#fcd34d',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        {/* Converter Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Amount to Convert
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}
              placeholder="Enter amount..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                From Currency
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="form-select"
              >
                {currencyList.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={swapCurrencies}
              className="btn btn-secondary"
              style={{ height: '42px', padding: '0 0.85rem' }}
              title="Swap currencies"
            >
              <ArrowRightLeft size={16} />
            </button>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                To Currency
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="form-select"
              >
                {currencyList.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Converted Output Result */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            textAlign: 'center',
            marginTop: '0.5rem'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONVERTED AMOUNT</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
              {formattedResult.toLocaleString()} {toCurrency}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              1 {fromCurrency} = {exchangeRateUnit} {toCurrency} • Updated: {lastUpdated}
            </div>

            <button
              onClick={handleSaveConversion}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '1rem' }}
            >
              Save to Calculation History
            </button>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}
