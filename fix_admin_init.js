const fs = require('fs');
let code = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf8');

const injection = `
    // --- AUTO-BOOTSTRAP ADMIN ---
    // If no admins exist in the database, create a default one to prevent lockout.
    const adminCount = await prisma.adminUser.count();
    if (adminCount === 0) {
      const defaultPasswordHash = await bcrypt.hash('Admin@123', 10);
      await prisma.adminUser.create({
        data: {
          email: 'admin@northeasttours.com',
          passwordHash: defaultPasswordHash,
          name: 'Super Admin',
          role: 'SUPER_ADMIN'
        }
      });
      console.log('Bootstrapped default admin user: admin@northeasttours.com / Admin@123');
    }
    // ----------------------------
`;

code = code.replace('const user = await prisma.adminUser.findUnique({', injection + '\n    const user = await prisma.adminUser.findUnique({');

fs.writeFileSync('src/app/api/auth/login/route.ts', code);
