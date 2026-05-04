# NutriScan Debugging Guide

## Issues Reported
1. **Search/Scan not updating Recent Scans sidebar**
2. **History Analytics page not showing data**
3. **Health goals always showing as selected**

---

## Debugging Steps

### Step 1: Check Browser Console
Open your browser's Developer Tools (F12) and go to the Console tab.

Run the diagnostic function:
```javascript
diagnose App()
```

This will output:
- Whether you're logged in (token exists)
- Your user role
- API base URL
- Actual API response or error

### Step 2: Verify Backend is Running
Make sure your backend API server is running on `http://localhost:5000`

Check if these endpoints exist and are working:
- `POST /api/auth/login` - Login
- `GET /api/profile` - Get user profile
- `GET /api/scan/history` - Get scan history
- `POST /api/scan/barcode/:barcode` - Scan a product

### Step 3: Check Network Requests
In Browser DevTools → Network tab:
1. Log in
2. Search/scan a product
3. Check the network requests:
   - `POST /api/scan/barcode/...` or similar - should return 200 OK
   - `GET /api/scan/history` - should return 200 OK with data array

---

## Expected Behavior After These Fixes

### When User Logs In:
1. ✅ Profile data loads (name, avatar, health goals)
2. ✅ Recent scans sidebar populates
3. ✅ Stats update (Total Scans, Avg Score, Red Flags)
4. ✅ Analytics charts show data
5. ✅ Health goals checkboxes are checked (based on saved profile)

### When User Searches/Scans Product:
1. ✅ Product displays on dashboard
2. ✅ "Recent Scans" sidebar updates (within 100ms)
3. ✅ "All Scan Records" history table updates
4. ✅ Analytics charts update with new data

### When User Logs Out:
1. ✅ All user data cleared from sidebar
2. ✅ Dashboard emptied (shows empty state)
3. ✅ History page shows "Sign in" message
4. ✅ Health goals checkboxes unchecked
5. ✅ Redirected to landing page
6. ✅ Sidebar shows "Guest User" with "Demo Mode" badge

---

## Common Issues & Solutions

### Issue: "Sign in to view your scan history" always shows
**Cause**: API endpoint `/api/scan/history` doesn't exist or token not being sent

**Solution**:
1. Check backend has the history endpoint implemented
2. Verify token is being sent in Authorization header
3. Check console logs - run `diagnoseApp()` to see actual error

### Issue: Health goals always selected
**Expected Behavior**: 
- When **logged in**: Goals selected by user in their profile are checked
- When **logged out**: All checkboxes should be unchecked

**If toggled stay checked after logout**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check logout function is being called
3. Run in console: `logout()` to manually log out

### Issue: Charts empty
**Cause**: User has no scan history or API not returning data

**Solution**:
1. Scan at least one product first
2. Click "Refresh Data" button on History page
3. Check console for API errors
4. Verify scan was saved to backend

---

## Testing Checklist

### Pre-Login Tests
- [ ] Open app - sidebar shows "Guest User"
- [ ] Try to access History page - redirects to Dashboard
- [ ] Try to access Profile page - redirects to Dashboard
- [ ] Try to access Admin page - redirects to Dashboard

### Post-Login Tests
- [ ] Log in with valid credentials
- [ ] Sidebar shows correct name and avatar
- [ ] Health goals reflect saved preferences
- [ ] Search for "Roasted Almonds"
  - [ ] Product appears on dashboard
  - [ ] Recent Scans sidebar updates
  - [ ] History table shows the scan
  - [ ] Stats update
- [ ] Scan a barcode
  - [ ] Same updates as search
- [ ] Go to History page
  - [ ] See all your scans in table
  - [ ] Weekly trend chart has data
  - [ ] Distribution donut shows colors
  - [ ] Export button is active

### Post-Logout Tests
- [ ] Click "Sign Out"
- [ ] Sidebar shows "Guest User"
- [ ] Dashboard shows empty state
- [ ] All form fields empty
- [ ] History page shows "Sign in" message
- [ ] All checkboxes unchecked
- [ ] Can't access History/Profile/Admin pages

---

## Advanced Debugging

### Check Scan History in Console
```javascript
// Manually fetch and log history
NutriApi.getHistory().then(data => {
  console.log('Full history response:', data);
  console.log('Items count:', data.data?.length);
  console.log('First item:', data.data?.[0]);
}).catch(err => console.error('Error:', err));
```

### Check Profile Data
```javascript
// View your saved profile including health goals
NutriApi.getProfile().then(data => {
  console.log('Profile data:', data);
  console.log('Health goals:', data.data?.healthGoals);
  console.log('Allergies:', data.data?.allergies);
}).catch(err => console.error('Error:', err));
```

### Manually Trigger Refresh
```javascript
// Force refresh all data
refreshHistory();     // Fetch and display history
refreshProfile();     // Fetch and display profile
updateHistoryAnalytics([]); // Reset charts (will refill when history loads)
```

---

## Still Having Issues?

1. **Check Backend Logs**: Look for errors in your backend API server logs
2. **Check Network Tab**: Verify API calls are being made and returning data
3. **Run Diagnostic**: Use `diagnoseApp()` in console for detailed output
4. **Check Token**: Verify token is being saved correctly: `localStorage.getItem('token')`
5. **Clear Cache**: Clear browser cache and localStorage: `localStorage.clear()` then refresh

---

## API Response Format Expected

### History Endpoint Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "scan-id",
      "productName": "Roasted Almonds",
      "brand": "NutHouse",
      "score": 85,
      "colorFlag": "green",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Profile Endpoint Response:
```json
{
  "success": true,
  "data": {
    "userId": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "healthGoals": ["weight_loss", "diabetes_management"],
    "allergies": ["peanuts"],
    "age": 30,
    "gender": "male"
  }
}
```

If your API returns different structure, the frontend code needs adjustment.
