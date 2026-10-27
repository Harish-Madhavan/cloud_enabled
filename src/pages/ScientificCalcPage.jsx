import React, { useState } from 'react';
import { useCalc } from '../context/CalcContext';
import Display from '../components/Display';
import CalcButton from '../components/CalcButton';
import CardWrapper from '../components/CardWrapper';
import { Binary, Sigma, BarChart2, CheckCircle2 } from 'lucide-react';

export default function ScientificCalcPage() {
  const { addHistoryItem } = useCalc();

  // Scientific Calculator State
  const [displayValue, setDisplayValue] = useState('0');
  const [equationPreview, setEquationPreview] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  // Statistics Dataset State (ES6+ array processing demo)
  const [datasetInput, setDatasetInput] = useState('14, 28, 35, 42, 56, 70, 84');
  const [statsResult, setStatsResult] = useState(null);

  // Factorial helper
  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  // Scientific Single-Operand Functions
  const handleScientificFunction = (fnName) => {
    const current = parseFloat(displayValue);
    let result = 0;
    let formula = '';

    switch (fnName) {
      case 'sqrt':
        result = Math.sqrt(current);
        formula = `sqrt(${current})`;
        break;
      case 'sqr':
        result = Math.pow(current, 2);
        formula = `sqr(${current})`;
        break;
      case 'cube':
        result = Math.pow(current, 3);
        formula = `cube(${current})`;
        break;
      case 'sin':
        result = Math.sin((current * Math.PI) / 180);
        formula = `sin(${current}°)`;
        break;
      case 'cos':
        result = Math.cos((current * Math.PI) / 180);
        formula = `cos(${current}°)`;
        break;
      case 'tan':
        result = Math.tan((current * Math.PI) / 180);
        formula = `tan(${current}°)`;
        break;
      case 'log':
        result = Math.log10(current);
        formula = `log(${current})`;
        break;
      case 'ln':
        result = Math.log(current);
        formula = `ln(${current})`;
        break;
      case 'fact':
        result = factorial(current);
        formula = `fact(${current})`;
        break;
      case 'inv':
        result = 1 / current;
        formula = `1/(${current})`;
        break;
      case 'pi':
        result = Math.PI;
        formula = 'π';
        break;
      case 'e':
        result = Math.E;
        formula = 'e';
        break;
      default:
        return;
    }

    const rounded = Math.round(result * 1e8) / 1e8;
    setDisplayValue(String(rounded));
    setEquationPreview(`${formula} =`);
    setIsCalculated(true);

    addHistoryItem({
      mode: 'Scientific',
      equation: formula,
      result: rounded
    });
  };

  // Digits input
  const inputDigit = (d) => {
    if (isCalculated || displayValue === '0') {
      setDisplayValue(String(d));
      setIsCalculated(false);
    } else {
      setDisplayValue((prev) => prev + d);
    }
  };

  // Compute Statistics using pure ES6+ array methods: map(), filter(), reduce(), and spread (...)
  const computeDatasetStats = (e) => {
    e.preventDefault();

    // 1. ES6 String split, map, and filter
    const parsedNumbers = datasetInput
      .split(/[\s,]+/)
      .map((item) => parseFloat(item.trim()))
      .filter((num) => !isNaN(num));

    if (parsedNumbers.length === 0) return;

    // 2. ES6 reduce() for Sum & Count
    const count = parsedNumbers.length;
    const sum = parsedNumbers.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // 3. ES6 Spread operator (...) for Min & Max
    const min = Math.min(...parsedNumbers);
    const max = Math.max(...parsedNumbers);

    // 4. ES6 map() and reduce() for Variance and Standard Deviation
    const squareDiffs = parsedNumbers.map((val) => Math.pow(val - mean, 2));
    const variance = squareDiffs.reduce((acc, curr) => acc + curr, 0) / count;
    const stdDev = Math.sqrt(variance);

    // 5. Median calculation
    const sorted = [...parsedNumbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const statsData = {
      count,
      sum: Math.round(sum * 100) / 100,
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      min,
      max,
      range: max - min,
      variance: Math.round(variance * 100) / 100,
      stdDev: Math.round(stdDev * 100) / 100
    };

    setStatsResult(statsData);

    addHistoryItem({
      mode: 'Statistics',
      equation: `Mean([${parsedNumbers.slice(0, 3).join(', ')}...])`,
      result: `Mean: ${statsData.mean}, Sum: ${statsData.sum}`
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      <div className="grid-2">

        {/* Left: Scientific Calculator */}
        <div>
          <CardWrapper title="Scientific Calculator" badgeText="Math Engine">
            <Display
              equation={equationPreview}
              currentValue={displayValue}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', marginTop: '1rem' }}>
              <CalcButton label="sin" onClick={() => handleScientificFunction('sin')} variant="scientific" />
              <CalcButton label="cos" onClick={() => handleScientificFunction('cos')} variant="scientific" />
              <CalcButton label="tan" onClick={() => handleScientificFunction('tan')} variant="scientific" />
              <CalcButton label="√x" onClick={() => handleScientificFunction('sqrt')} variant="scientific" />
              <CalcButton label="x²" onClick={() => handleScientificFunction('sqr')} variant="scientific" />

              <CalcButton label="ln" onClick={() => handleScientificFunction('ln')} variant="scientific" />
              <CalcButton label="log" onClick={() => handleScientificFunction('log')} variant="scientific" />
              <CalcButton label="n!" onClick={() => handleScientificFunction('fact')} variant="scientific" />
              <CalcButton label="1/x" onClick={() => handleScientificFunction('inv')} variant="scientific" />
              <CalcButton label="x³" onClick={() => handleScientificFunction('cube')} variant="scientific" />

              <CalcButton label="π" onClick={() => handleScientificFunction('pi')} variant="scientific" />
              <CalcButton label="e" onClick={() => handleScientificFunction('e')} variant="scientific" />
              <CalcButton label="AC" onClick={() => { setDisplayValue('0'); setEquationPreview(''); }} variant="action" />
              <CalcButton label="⌫" onClick={() => setDisplayValue(p => p.length > 1 ? p.slice(0, -1) : '0')} variant="action" />
              <CalcButton label="C" onClick={() => setDisplayValue('0')} variant="action" />

              <CalcButton label="7" onClick={() => inputDigit(7)} />
              <CalcButton label="8" onClick={() => inputDigit(8)} />
              <CalcButton label="9" onClick={() => inputDigit(9)} />
              <CalcButton label="4" onClick={() => inputDigit(4)} />
              <CalcButton label="5" onClick={() => inputDigit(5)} />

              <CalcButton label="6" onClick={() => inputDigit(6)} />
              <CalcButton label="1" onClick={() => inputDigit(1)} />
              <CalcButton label="2" onClick={() => inputDigit(2)} />
              <CalcButton label="3" onClick={() => inputDigit(3)} />
              <CalcButton label="0" onClick={() => inputDigit(0)} />
            </div>
          </CardWrapper>
        </div>

        {/* Right: Statistical Dataset Engine (Pure ES6+ array methods) */}
        <div>
          <CardWrapper title="Statistical Dataset Analyzer" badgeText="ES6+ Reducers">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Enter numbers to compute descriptive statistics via <code>map()</code>, <code>filter()</code>, <code>reduce()</code>, and spread <code>...</code>
            </p>

            <form onSubmit={computeDatasetStats} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <textarea
                rows={3}
                value={datasetInput}
                onChange={(e) => setDatasetInput(e.target.value)}
                placeholder="e.g. 10, 25, 45, 60, 80"
                className="form-textarea"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
              />

              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sigma size={16} /> Compute Summary Statistics
              </button>
            </form>

            {/* Live Computed Statistics Card */}
            {statsResult && (
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} /> ES6+ Statistical Computations
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.88rem' }}>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sample Size (N):</span> <strong>{statsResult.count}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sum (reduce):</span> <strong style={{ color: '#34d399' }}>{statsResult.sum}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Mean (Average):</span> <strong style={{ color: '#67e8f9' }}>{statsResult.mean}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Median:</span> <strong>{statsResult.median}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Min (Spread ...):</span> <strong>{statsResult.min}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Max (Spread ...):</span> <strong>{statsResult.max}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Variance:</span> <strong>{statsResult.variance}</strong>
                  </div>
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Std Deviation (σ):</span> <strong style={{ color: '#a5b4fc' }}>{statsResult.stdDev}</strong>
                  </div>
                </div>
              </div>
            )}
          </CardWrapper>
        </div>

      </div>
    </div>
  );
}
