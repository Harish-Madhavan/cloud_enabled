# CalcPulse | Smart Multi-Mode Calculator App
### Implementing Unit 1: Modern Front-End Component Architecture (9 Hours)

A functional, modern React calculation application (Standard, Scientific, Statistical, Live Currency Exchange, and Audit History) engineered to naturally and directly implement all 9 topics from the **Unit 1 syllabus**.

---

## 🎯 How Each Syllabus Topic Is Implemented

| # | Unit 1 Topic | Role in the Calculator Application | Key Implementation Details |
|---|---|---|---|
| 1 | **ES6+** | Math engines, data transformations, and state pipelines | • **Arrow functions** for pure calculation dispatchers<br>• **Destructuring**: `{ calcId } = useParams()`, `{ rates, time_last_update_utc } = data`<br>• **Spread operator (`...`)**: Immutable state updates `[newItem, ...prev]` and dataset stats `Math.min(...numbers)`<br>• **Array methods**: `split().map().filter().reduce()` computing Sum, Mean, Variance, and Std Deviation<br>• **Template literals**: `` `${prevValue} ${operator} ${current}` ``<br>• **Optional chaining & nullish coalescing**: `rates?.[currency] ?? 1` |
| 2 | **Component Architecture** | Modular UI design & composition | • **Atomic component structure**: Atoms (`CalcButton`), Molecules (`Display`), Organisms (`CardWrapper`, `Keypad`), Layout (`Navbar`, `Footer`)<br>• **Container vs Presentational pattern**: `StandardCalcPage` manages math state; presentational `Display` and `CalcButton` render pure UI via props<br>• **Composition**: `CardWrapper` uses the `children` prop instead of prop drilling |
| 3 | **JSX** | Dynamic layout and view states | • **Embedded expressions**: `{memoryValue}`, `{formattedResult}`, `{sessionTime}`<br>• **Conditional rendering**: Memory badge (`memory !== 0 && <Badge />`), error states (`hasError ? 'Error' : val`), and status pills<br>• **List rendering**: Keypad grid and History items rendered via `.map()` with unique `key` props (`item.id`)<br>• **React Fragments**: `<>...</>` to group modal elements cleanly without unnecessary DOM nodes |
| 4 | **Functional Components** | Pure component architecture | • 100% written in modern functional React components<br>• Clean props destructuring with default parameters: `({ label, variant = 'number', span = 1 })`<br>• Zero legacy class components or `this` binding boilerplate |
| 5 | **useState** | Dynamic application state management | • **Primitive state**: `displayValue`, `operator`, `hasError`, `sessionTime`<br>• **Functional state updates**: `setDisplayValue(prev => ...)` ensuring correct batching<br>• **Controlled form inputs**: Currency amount and stats dataset inputs<br>• **Immutable array state**: History list updated via `setHistory(prev => [newCalc, ...prev])` and deleted via `filter()` |
| 6 | **useEffect** | Lifecycle, subscriptions & cleanups | • **Global keyboard listener**: Listens for physical keys (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`) attached to `window`<br>• **Cleanup functions**: Returns `window.removeEventListener('keydown', ...)` to prevent memory leaks<br>• **Session timer**: `setInterval` with `clearInterval` cleanup<br>• **Network effect**: Exchange rate sync on initial load with request cancellation |
| 7 | **React Router (v6+)** | Multi-mode SPA navigation | • **Declarative routes**: `BrowserRouter`, `Routes`, and `Route`<br>• **Active navigation**: `NavLink` with dynamic active styling for mode switching<br>• **Dynamic route segments**: `/history/:calcId` extracting parameters via `useParams()`<br>• **Programmatic navigation**: `useNavigate()` to return or reload calculations<br>• **Wildcard 404 route**: `path="*"` with `<NotFoundPage />` |
| 8 | **Fetch API** | Real-time currency exchange rates | • Native browser `fetch()` using `async/await`<br>• Real API: Queries `open.er-api.com/v6/latest/USD` for live rates<br>• Complete request lifecycle: Loading indicator, Error handling (`try/catch`), and success payload<br>• **Cancellation**: `AbortController` aborts requests when changing routes or unmounting |
| 9 | **StackBlitz** | Instant browser execution | • Native [`.stackblitzrc`](file:///c:/Users/Harish/Desktop/cloud_enabled/.stackblitzrc) configured with `npm run dev`<br>• Standard Vite ES-modules structure for zero-config WebContainer execution<br>• Built-in StackBlitz launcher modal and direct link generation |

---

## 🧭 Routes & Features

- **`/` (Standard Calculator)**: Full math keypad, memory registers (`M+`, `M-`, `MR`, `MC`), sign toggle, percent, backspace, and physical keyboard support via `useEffect`.
- **`/scientific` (Scientific & Stats)**: Math functions (`sin`, `cos`, `tan`, `sqrt`, `sqr`, `cube`, `ln`, `log`, `n!`, `pi`, `e`) and a Statistical Analyzer computing Sample Size, Sum, Mean, Median, Min, Max, Variance, and Std Dev via ES6+ `reduce()`, `map()`, and `filter()`.
- **`/currency` (Live Currency Calculator)**: Live FX converter querying rates using `Fetch API` with `AbortController`, loading states, error fallbacks, and currency swapping.
- **`/history` (Calculation Tape)**: Audit list of all calculations, filter by mode, delete items, or open detailed view.
- **`/history/:calcId` (Dynamic Record Route)**: Deep inspect single calculation details via `useParams()`.
- **`*` (404 Not Found)**: Catch-all wildcard route.

---

## 🚀 Running the Project

### Local Setup
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Open in browser at http://localhost:3000
```

### Running on StackBlitz
The project includes a native `.stackblitzrc` file:
```json
{
  "startCommand": "npm run dev"
}
```
1. Push this folder to a GitHub repository.
2. Open `https://stackblitz.com/github/<username>/<repo-name>`.
3. StackBlitz runs the dev server inside browser WebContainers immediately.
