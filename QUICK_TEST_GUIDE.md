# Quick Testing Guide

## ✅ Working Search Terms (Demo Products)

These will immediately load the product **without hitting the API**:

| Search Term | Product | Barcode |
|------------|---------|---------|
| `oats` | Rolled Oats | 8901234567890 |
| `oat` | Rolled Oats | 8901234567890 |
| `yogurt` | Greek Yogurt | 8900012345678 |
| `yoghurt` | Greek Yogurt | 8900012345678 |
| `greek yogurt` | Greek Yogurt | 8900012345678 |
| `chips` | Potato Chips | 5012345678901 |
| `chip` | Potato Chips | 5012345678901 |
| `cola` | Cola Fizzy | 4901234567890 |
| `granola` | Granola Bar | 7891234567890 |
| `chocolate granola` | Granola Bar | 7891234567890 |
| `almonds` | Roasted Almonds | 3456789012345 |
| `almond` | Roasted Almonds | 3456789012345 |
| `roasted almonds` | Roasted Almonds | 3456789012345 |
| `nutella` | Nutella Spread | 3017620422003 |
| `kitkat` | KitKat Bar | 7613032707717 |
| `kit kat` | KitKat Bar | 7613032707717 |

---

## 🧪 How to Test

### Test 1: Search for Demo Product
1. **Log in** to your account
2. **Type in search box**: `roasted almonds`
3. **Press Enter**
4. **Expected**: Product loads immediately, appears in sidebar

### Test 2: Use Exact Barcode
1. **Open DevTools** (F12) → Network tab
2. **Type in search box**: `3456789012345`
3. **Press Enter**
4. **Expected**: 
   - API call to `/api/scan/barcode/3456789012345`
   - Status: 200 OK (or 422 if barcode not in system)
   - Product should load or show error

### Test 3: Check Sidebar After Scan
1. After searching/scanning any product
2. **Open console** (F12)
3. **Run**:
   ```javascript
   NutriApi.getHistory()
     .then(data => console.log('Scans now:', data.data.length))
   ```
4. **Expected**: Should show 1 or more scans

---

## 🔧 If Search Still Doesn't Work

### Open Console and Check
1. Press **F12**
2. Go to **Console** tab
3. Search for a product (e.g., "roasted almonds")
4. Look for console messages showing what matched

You should see something like:
```
Search query: roasted almonds
Found partial match: almonds → almonds
```

If you see `showToast('Product not found...')` instead, the keyword didn't match.

---

## 📋 Backend Barcode Requirements

When you use actual barcodes (like `3456789012345`), your backend must:

1. Have the product in database
2. Return proper response:
   ```json
   {
     "success": true,
     "data": {
       "product": {
         "name": "Roasted Almonds",
         "brand": "NutHouse",
         "barcode": "3456789012345"
       },
       "score": 85,
       "colorFlag": "green"
     }
   }
   ```

3. If barcode not found, return 422 (which is what you're seeing)

---

## ✨ What Should Happen After Fix

### Scenario 1: Demo Product
```
User types: "roasted almonds"
             ↓
Frontend recognizes "almonds" keyword
             ↓
Loads demo product (NO API call)
             ↓
Shows on dashboard immediately ✅
```

### Scenario 2: Real Barcode
```
User types: "3456789012345" (or scans it)
             ↓
Makes POST to /api/scan/barcode/3456789012345
             ↓
Backend returns product info (200 OK)
             ↓
Shows on dashboard ✅
```

### Scenario 3: Unknown Barcode
```
User types: "1234567890000" (not in system)
             ↓
Makes POST to /api/scan/barcode/1234567890000
             ↓
Backend returns 422 (unprocessable)
             ↓
Frontend shows: "Product not found" ⚠️
```

---

## 🎯 Next Steps

1. **Refresh the page** (`Ctrl+Shift+R` to clear cache)
2. **Log in**
3. **Try searching**: `roasted almonds`
4. **Check if it loads** without the 422 error
5. **If still fails**, open console and look at logged messages

Let me know what happens! 🚀
