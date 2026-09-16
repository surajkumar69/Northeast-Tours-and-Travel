const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
schema = schema.replace('url      = "file:./dev.db"', 'url      = env("DATABASE_URL")');
fs.writeFileSync('prisma/schema.prisma', schema);
