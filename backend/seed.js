import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ParkingSpot from './models/ParkingSpot.js';
import BookingHistory from './models/BookingHistory.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        console.log('📦 Connected to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parkeasy');

        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await ParkingSpot.deleteMany({});
        await BookingHistory.deleteMany({});

        console.log('👑 Creating Admin User...');
        const adminUser = new User({
            name: 'Abhay Kumar Singh',
            email: 'admin@parkeasy.in',
            password: 'admin@1234', // Will be hashed by pre-save hook
            role: 'admin',
            userId: '00001'
        });
        await adminUser.save();
        console.log('   ✅ Admin created: admin@parkeasy.in / admin@1234');

        // Create sample parking spots
        console.log('🚗 Creating Parking Spots...');
        const sampleSpots = [
            { name: 'Spot A101', spotNumber: 'A101', location: 'Level 1, Section A', pricePerHour: 50, vehicleType: 'Car', totalSpots: 10, availableSpots: 10, isAvailable: true },
            { name: 'Spot A102', spotNumber: 'A102', location: 'Level 1, Section A', pricePerHour: 50, vehicleType: 'Car', totalSpots: 10, availableSpots: 10, isAvailable: true },
            { name: 'Spot B201', spotNumber: 'B201', location: 'Level 2, Section B', pricePerHour: 40, vehicleType: 'Bike', totalSpots: 20, availableSpots: 20, isAvailable: true },
            { name: 'Spot B202', spotNumber: 'B202', location: 'Level 2, Section B', pricePerHour: 40, vehicleType: 'Bike', totalSpots: 20, availableSpots: 20, isAvailable: true },
            { name: 'Spot C301', spotNumber: 'C301', location: 'Level 3, Section C', pricePerHour: 80, vehicleType: 'Truck', totalSpots: 5, availableSpots: 5, isAvailable: true },
            { name: 'Spot C302', spotNumber: 'C302', location: 'Level 3, Section C', pricePerHour: 80, vehicleType: 'Truck', totalSpots: 5, availableSpots: 5, isAvailable: true },
            { name: 'Spot D401', spotNumber: 'D401', location: 'Level 4, Section D', pricePerHour: 60, vehicleType: 'Car', totalSpots: 15, availableSpots: 15, isAvailable: true },
            { name: 'Spot D402', spotNumber: 'D402', location: 'Level 4, Section D', pricePerHour: 60, vehicleType: 'Car', totalSpots: 15, availableSpots: 15, isAvailable: true },
        ];

        await ParkingSpot.insertMany(sampleSpots);
        console.log('   ✅ Sample spots created');

        console.log('✨ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
