Детальний покроковий розбір: що відбувається при натисканні кнопки Good

Припустимо, початковий state:

votes = { good: 0, neutral: 0, bad: 0 }

Кроки (покроково)

Користувач клікає кнопку Good у компоненті VoteOptions.

VoteOptions виконує onClick={() => onVote('good')} — викликає пропс onVote з аргументом 'good'.

Пропс onVote — це посилання на функцію handleVote з App. App.handleVote('good') викликається.

handleVote виконує:

setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }))


prev = { good: 0, neutral: 0, bad: 0 }.

[type] розгортається в good.

Створюється новий обʼєкт: { good: 1, neutral: 0, bad: 0 }.

React отримує команду оновити state — він планує перерендер App з новим votes. (React батчить оновлення для ефективності.)

Під час нового рендеру App обчислює:

totalVotes = 1 + 0 + 0 = 1

positiveRate = Math.round((votes.good / totalVotes) * 100) = Math.round((1/1)*100) = 100

App передає оновлені пропси в VoteStats: votes={...}, totalVotes=1, positiveRate=100.

VoteStats перерендерюється і відображає:

Good: 1

Neutral: 0

Bad: 0

Total: 1

Positive: 100%

App також передає canReset={totalVotes > 0} в VoteOptions. Оскільки totalVotes === 1, canReset стає true — VoteOptions починає рендерити кнопку Reset.

Якщо користувач натисне Reset, VoteOptions викличе onReset, тобто App.resetVotes(), що скине стан до {0,0,0}, і UI повернеться в стан без статистики.

Додаткові важливі моменти / антипатерни

Не мутуй state (не роби votes.good++ або prev.good++). Завжди повертай новий обʼєкт { ...prev, [type]: prev[type] + 1 }.

Використовуй функціональний setState (setVotes(prev => ...)), щоб уникнути гонок, якщо багато кліків швидко.

Не зберігай похідні в state (totalVotes, positiveRate) — обчислюй на льоту.

Типізація (Votes, VoteType) допомагає уникати помилок (наприклад, не вдасться випадково передати 'great' — TypeScript вкаже помилку).
























# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
