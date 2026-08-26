import 'dotenv/config';
import prisma from './lib/prisma';
import crypto from 'crypto';

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users);

  const tokens = await prisma.inviteToken.findMany();
  console.log('Tokens in DB:', tokens);

  // Recreate token if needed
  const email = 'eshaanag@tmh.com';
  const role = 'ADMIN';

  // Check if user already exists
  if (!users.some(u => u.email === email)) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.inviteToken.create({
      data: {
        email,
        role,
        token,
        expiresAt,
      },
    });

    console.log(`\n\n✅ NEW Invite link for Admin:\nhttp://localhost:3000/register?token=${token}\n\n`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
