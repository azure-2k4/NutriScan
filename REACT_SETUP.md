# React Integration Guide - NutriScan MERN Stack

## 📦 What's New

Added React component infrastructure to transform NutriScan into a full MERN (MongoDB, Express, React, Node.js) application.

### New Files Created:
- **ProductCard.jsx** - React component for displaying product cards with interactive hover effects
- **package.json** - Dependencies for React, Express, MongoDB, and build tools
- **vite.config.js** - Vite bundler configuration for development and production builds

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd C:\Desktop\Nutriscan
npm install
```

### 2. File Structure for React Integration
```
Nutriscan/
├── index.html              (Current vanilla JS)
├── script.js               (Current vanilla JS)
├── styles.css              (Current styles)
├── ProductCard.jsx         (NEW React component)
├── main.jsx                (NEW React entry point)
├── App.jsx                 (NEW React app)
├── vite.config.js          (NEW Vite config)
└── package.json            (NEW dependencies)
```

### 3. Create React Entry Point (main.jsx)
Create `C:\Desktop\Nutriscan\main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 4. Create React App (App.jsx)
Create `C:\Desktop\Nutriscan\App.jsx`:

```jsx
import React, { useState } from 'react'
import ProductCard from './ProductCard.jsx'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const sampleProducts = [
    {
      name: 'KitKat Milk Chocolate',
      brand: 'Nestlé',
      score: 48,
      tags: 'Moderate Sugar Vegetarian'
    },
    {
      name: 'Rolled Oats Original',
      brand: 'GrainCo',
      score: 92,
      tags: 'Vegetarian Gluten Free Low Sugar'
    }
  ]

  return (
    <div className="react-app">
      <h2>Product Showcase</h2>
      <div className="products-grid">
        {sampleProducts.map((product, idx) => (
          <ProductCard 
            key={idx} 
            product={product} 
            onSelect={setSelectedProduct}
          />
        ))}
      </div>
      {selectedProduct && (
        <div className="selected-info">
          <h3>{selectedProduct.name}</h3>
          <p>Score: {selectedProduct.score}</p>
        </div>
      )}
    </div>
  )
}

export default App
```

### 5. Update index.html
Add this div in your HTML where you want React to render:
```html
<div id="root"></div>
```

### 6. Run Development Server
```bash
npm run dev
```

Your app will be available at `http://localhost:5174`

## 🔧 ProductCard Component Features

The React `ProductCard` component includes:
- ✅ **Interactive Hover Effects** - Smooth animations on hover
- ✅ **Dynamic Score Coloring** - Green (>70), Yellow (40-70), Red (<40)
- ✅ **Reusable** - Accept props for product data and callbacks
- ✅ **Responsive** - Works with your existing CSS

### Usage:
```jsx
<ProductCard 
  product={{ name: 'KitKat', brand: 'Nestlé', score: 48 }}
  onSelect={handleProductSelect}
/>
```

## 🚢 Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## 📝 Backend Integration

Your existing Express backend already works! The vite.config.js includes a proxy to forward API calls:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## ✨ Future React Components to Create

1. **SearchBar** - React search component with auto-suggest
2. **HistoryChart** - React chart for scan history analytics
3. **ProfileEditor** - React form for user profile settings
4. **AdminDashboard** - Full React admin panel
5. **ProductList** - Paginated product listing with React

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Create main.jsx and App.jsx files (templates above)
3. Add `<div id="root"></div>` to index.html
4. Run `npm run dev`
5. Start converting other components to React gradually

This allows you to migrate from vanilla JS to React incrementally!
