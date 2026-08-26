import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is missing in .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function main() {
  console.log("==================================================");
  console.log("   MOTOR HEAD - ROOT ADMIN BOOTSTRAP UTILITY      ");
  console.log("==================================================\n");

  const email = await question("Enter Admin Email: ");
  if (!email || !email.includes('@')) {
    console.error("Invalid email address.");
    process.exit(1);
  }

  const password = await question("Enter Admin Password (min 12 chars): ");
  if (!password || password.length < 12) {
    console.error("Password must be at least 12 characters long for security.");
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log(`\nUser ${email} already exists. Updating role to ADMIN...`);
    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
    console.log("Role updated successfully!");
  } else {
    console.log(`\nCreating new ROOT ADMIN user for ${email}...`);
    const passwordHash = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'ADMIN',
        isActive: true,
        mustChangePassword: false,
      }
    });
    console.log("Root Admin created successfully!");
  }

  console.log("\nYou can now log in at /login.");
  rl.close();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
