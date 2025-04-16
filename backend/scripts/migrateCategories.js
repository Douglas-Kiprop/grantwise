const mongoose = require('mongoose');
// Adjust the path if your Grant model is located elsewhere relative to the scripts folder
const Grant = require('../src/models/Grant');

// --- Configuration ---
// Using the connection string you provided
const MONGO_URI = 'mongodb+srv://808dawg:yxSiefIdmoNQoLCK@grantwise.44gsq.mongodb.net/grantwise?retryWrites=true&w=majority';
const CATEGORY_SEPARATOR = '/'; // Define the separator used in your strings
// --- End Configuration ---

const migrateCategories = async () => {
  let connection;
  try {
    console.log('Connecting to MongoDB...');
    // Use mongoose.createConnection for better isolation if needed, but connect works fine for scripts
    connection = await mongoose.connect(MONGO_URI, {
      // Mongoose 6+ doesn't require these, but keeping them doesn't hurt
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected.');

    // Get the raw collection object
    const grantsCollection = mongoose.connection.collection('grants'); // Assuming your collection name is 'grants' (pluralized model name)

    console.log('Finding grants with string categories...');
    // Find grants using the Mongoose model (reading is fine)
    const grantsToMigrate = await Grant.find({ category: { $type: 'string' } });

    if (grantsToMigrate.length === 0) {
      console.log('No grants found with string categories. Migration might already be complete or no string categories exist.');
      return;
    }

    console.log(`Found ${grantsToMigrate.length} grants to migrate.`);

    let updatedCount = 0;
    let skippedCount = 0;
    const promises = grantsToMigrate.map(async (grant) => {
      try {
        if (typeof grant.category === 'string' && grant.category.trim() !== '') {
          const newCategoryArray = grant.category.split(CATEGORY_SEPARATOR).map(cat => cat.trim()).filter(cat => cat);

          if (newCategoryArray.length > 0) {
             // --- USE RAW COLLECTION UPDATE ---
             // Use the raw driver's updateOne to bypass Mongoose schema casting on update
             await grantsCollection.updateOne(
               { _id: grant._id }, // Filter by document ID
               { $set: { category: newCategoryArray } } // Set the category to the array
             );
             // --- END RAW COLLECTION UPDATE ---
             updatedCount++;
          } else {
             console.warn(`Skipping grant ${grant._id}: Category string "${grant.category}" resulted in an empty array after splitting.`);
             skippedCount++;
          }
        } else {
          console.warn(`Skipping grant ${grant._id}: category is not a processable string (Type: ${typeof grant.category}, Value: "${grant.category}")`);
          skippedCount++;
        }
      } catch (updateError) {
        console.error(`Failed to update grant ${grant._id}:`, updateError);
        skippedCount++;
      }
    });

    await Promise.all(promises);

    console.log(`Successfully updated ${updatedCount} grants.`);
    if (skippedCount > 0) {
        console.log(`Skipped ${skippedCount} grants due to formatting issues or errors.`);
    }

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (mongoose.connection.readyState === 1) { // Check if connection is open before disconnecting
        await mongoose.disconnect();
        console.log('MongoDB Disconnected.');
    }
    // process.exit(0); // Exit the script - uncomment if running standalone and want it to terminate
  }
};

// Run the migration
migrateCategories();

// Exporting in case you want to require it elsewhere, though typically run directly
module.exports = migrateCategories;