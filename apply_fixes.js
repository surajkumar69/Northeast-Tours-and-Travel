const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf-8');
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1596788067883[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/c/c1/Indian_rhino_pair_in_Kaziranga_National_Park.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1587399881881[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/b/b4/Rhino_at_Kaziranga_National_Park.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1611082260714[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/f/f9/Rhinos_in_Kaziranga_National_Park.jpg'");

// Replace Arunachal Unsplash fallbacks in mockData
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1614088629555[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/b/b3/Tawang_Monastery%2C_Arunachal_Pradesh.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1626021235332[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tawang_Monastery_view.jpg'");

fs.writeFileSync('src/data/mockData.ts', mockData);


let libData = fs.readFileSync('src/lib/data.ts', 'utf-8');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1596788067883[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/c/c1/Indian_rhino_pair_in_Kaziranga_National_Park.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1587399881881[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/b/b4/Rhino_at_Kaziranga_National_Park.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1611082260714[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/f/f9/Rhinos_in_Kaziranga_National_Park.jpg"');

// Replace Arunachal Unsplash fallbacks in data.ts
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1614088629555[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/b/b3/Tawang_Monastery%2C_Arunachal_Pradesh.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1626021235332[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/3/3e/Tawang_Monastery_view.jpg"');

fs.writeFileSync('src/lib/data.ts', libData);
