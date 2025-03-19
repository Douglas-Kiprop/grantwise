// ... existing code ...

const userPreferenceRoutes = require('./routes/userPreferenceRoutes');

// ... existing code ...

// Routes
app.use('/api/grants', grantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/preferences', userPreferenceRoutes);

// ... existing code ...