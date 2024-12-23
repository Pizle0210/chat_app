import { config } from "dotenv";
import { connectToDb } from "../lib/connect-to-db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

config();

const seedUsers = [ 
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg"
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg"
  }
];


const hashPasswords = async (users) => {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Correct property
      return { ...user, password: hashedPassword }; // Correct variable naming
    })
  );
};

const seedDatabase = async () => {
  try {
    await connectToDb();

    const usersWithHashedPasswords = await hashPasswords(seedUsers);
    await User.insertMany(usersWithHashedPasswords);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();