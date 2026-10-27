import React, { useState, useEffect, useCallback } from 'react';
import { useCalc } from '../context/CalcContext';
import Display from '../components/Display';
import CalcButton from '../components/CalcButton';
import CardWrapper from '../components/CardWrapper';
import { Delete, RotateCcw, History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StandardCalcPage() {
  const { addHistoryItem, memory, setMemory, history } = useCalc();

  // Component State (useState Hook)
  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [equationPreview, setEquationPreview] = useState('');
  const [hasError, setHasError] = useState(false);

  // Clear All
  const clearAll = useCallback(() => {
    setDisplayValue('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setEquationPreview('');
    setHasError(false);
  }, []);

  // Number Input with functional update pattern
  const inputDigit = useCallback((digit) => {
    setHasError(false);
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue((prev) => (prev === '0' ? String(digit) : prev + digit));
    }
  }, [waitingForOperand]);

  // Decimal Point
  const inputDot = useCallback(() => {
    setHasError(false);
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue((prev) => prev + '.');
    }
  }, [displayValue, waitingForOperand]);

  // Backspace / Delete
  const handleBackspace = useCallback(() => {
    if (waitingForOperand || hasError) return;
    setDisplayValue((prev) => {
      if (prev.length <= 1 || (prev.length === 2 && prev.startsWith('-'))) {
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, [waitingForOperand, hasError]);

  // Negate sign (+/-)
  const toggleSign = useCallback(() => {
    setDisplayValue((prev) => {
      const num = parseFloat(prev);
      return String(num * -1);
    });
  }, []);

  // Percent
  const inputPercent = useCallback(() => {
    const num = parseFloat(displayValue);
    const result = num / 100;
    setDisplayValue(String(result));
    setEquationPreview(`${displayValue}%`);
  }, [displayValue]);

  // Calculation logic (ES6+ arrow functions & template literals)
  const performCalculation = useCallback(() => {
    if (operator === null || prevValue === null) return;

    const current = parseFloat(displayValue);
    let calculated = 0;

    switch (operator) {
      case '+':
        calculated = prevValue + current;
        break;
      case '-':
        calculated = prevValue - current;
        break;
      case '×':
      case '*':
        calculated = prevValue * current;
        break;
      case '÷':
      case '/':
        if (current === 0) {
          setHasError(true);
          setDisplayValue('Cannot divide by zero');
          return;
        }
        calculated = prevValue / current;
        break;
      default:
        return;
    }

    // Clean rounding for floating point issues
    const rounded = Math.round(calculated * 1e10) / 1e10;
    const equationStr = `${prevValue} ${operator} ${current}`;

    // Add to shared History state
    addHistoryItem({
      mode: 'Standard',
      equation: equationStr,
      result: rounded
    });

    setEquationPreview(`${equationStr} =`);
    setDisplayValue(String(rounded));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [operator, prevValue, displayValue, addHistoryItem]);

  // Operator handling
  const handleOperator = useCallback((nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setEquationPreview(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const current = prevValue;
      let calculated = 0;

      if (operator === '+') calculated = current + inputValue;
      else if (operator === '-') calculated = current - inputValue;
      else if (operator === '×' || operator === '*') calculated = current * inputValue;
      else if (operator === '÷' || operator === '/') calculated = current / inputValue;

      const rounded = Math.round(calculated * 1e10) / 1e10;
      setPrevValue(rounded);
      setDisplayValue(String(rounded));
      setEquationPreview(`${rounded} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [displayValue, prevValue, operator]);

  // Memory Handlers
  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => {
    setDisplayValue(String(memory));
    setWaitingForOperand(true);
  };
  const handleMemoryAdd = () => {
    const val = parseFloat(displayValue) || 0;
    setMemory((prev) => prev + val);
  };
  const handleMemorySubtract = () => {
    const val = parseFloat(displayValue) || 0;
    setMemory((prev) => prev - val);
  };

  // useEffect Hook: Keyboard Event Listener with vital cleanup
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        inputDigit(Number(key));
      } else if (key === '.') {
        e.preventDefault();
        inputDot();
      } else if (key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        performCalculation();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        e.preventDefault();
        clearAll();
      } else if (key === '%') {
        e.preventDefault();
        inputPercent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // CRITICAL: Cleanup function runs when dependencies change or component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    inputDigit,
    inputDot,
    handleOperator,
    performCalculation,
    handleBackspace,
    clearAll,
    inputPercent
  ]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div className="calculator-layout-grid">
        
        {/* Main Calculator Body */}
        <div className="calculator-wrapper">
          {/* Reusable Display Component */}
          <Display
            equation={equationPreview}
            currentValue={displayValue}
            memoryValue={memory}
            hasError={hasError}
          />

          {/* Calculator Keypad */}
          <div className="calc-keypad-grid">
            {/* Row 1: Memory Operations */}
            <CalcButton label="MC" onClick={handleMemoryClear} variant="memory" />
            <CalcButton label="MR" onClick={handleMemoryRecall} variant="memory" />
            <CalcButton label="M+" onClick={handleMemoryAdd} variant="memory" />
            <CalcButton label="M-" onClick={handleMemorySubtract} variant="memory" />

            {/* Row 2: Clear & Actions */}
            <CalcButton label="AC" onClick={clearAll} variant="action" />
            <CalcButton label="+/-" onClick={toggleSign} variant="action" />
            <CalcButton label="%" onClick={inputPercent} variant="action" />
            <CalcButton label="÷" onClick={() => handleOperator('÷')} variant="operator" />

            {/* Row 3 */}
            <CalcButton label="7" onClick={() => inputDigit(7)} />
            <CalcButton label="8" onClick={() => inputDigit(8)} />
            <CalcButton label="9" onClick={() => inputDigit(9)} />
            <CalcButton label="×" onClick={() => handleOperator('×')} variant="operator" />

            {/* Row 4 */}
            <CalcButton label="4" onClick={() => inputDigit(4)} />
            <CalcButton label="5" onClick={() => inputDigit(5)} />
            <CalcButton label="6" onClick={() => inputDigit(6)} />
            <CalcButton label="-" onClick={() => handleOperator('-')} variant="operator" />

            {/* Row 5 */}
            <CalcButton label="1" onClick={() => inputDigit(1)} />
            <CalcButton label="2" onClick={() => inputDigit(2)} />
            <CalcButton label="3" onClick={() => inputDigit(3)} />
            <CalcButton label="+" onClick={() => handleOperator('+')} variant="operator" />

            {/* Row 6 */}
            <CalcButton label="0" onClick={() => inputDigit(0)} span={1} />
            <CalcButton label="." onClick={inputDot} />
            <CalcButton label="⌫" onClick={handleBackspace} ariaLabel="Backspace" />
            <CalcButton label="=" onClick={performCalculation} variant="equal" />
          </div>
        </div>

        {/* Sidebar: Calculation Tape / History Preview (Component Composition) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CardWrapper
            title="Recent Tape"
            badgeText="Live State"
            actions={
              <Link to="/history" style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                View All <ArrowRight size={13} />
              </Link>
            }
          >
            {history.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                No calculations yet. Start crunching numbers!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '340px', overflowY: 'auto' }}>
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setDisplayValue(item.result);
                      setEquationPreview(`${item.equation} =`);
                      setWaitingForOperand(true);
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'border-color var(--transition-fast)'
                    }}
                    title="Click to load into calculator"
                  >
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.mode}</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {item.equation}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      = {item.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardWrapper>

          <div className="demo-box" style={{ margin: 0, padding: '0.85rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
              💡 Keyboard Ready
            </span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Use your physical numeric keypad, Enter, Backspace, and Escape. Listened via <code>useEffect</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
