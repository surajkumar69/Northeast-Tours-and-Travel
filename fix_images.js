const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf-8');
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1616012480717-fd9867059ca0[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/4/47/Rhino_in_Kaziranga.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1596788067883-9114f17f4611[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephant_safari_in_Kaziranga.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1587399881881-8b0653d4c3f5[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/3/37/Tiger_in_Kaziranga_National_Park.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1611082260714-f06b47c0b0ee[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/7/7b/Kaziranga_National_Park_Landscape.jpg'");

// Arunachal Fallbacks
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1530789253388[^']*'/g, "'/images/arunachal_monastery_1789460394921.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1614088629555[^']*'/g, "'/images/arunachal_sela_pass_1789460408512.jpg'");
mockData = mockData.replace(/'https:\/\/images\.unsplash\.com\/photo-1626021235332[^']*'/g, "'https://upload.wikimedia.org/wikipedia/commons/4/4f/Tawang_Monastery%2C_Arunachal_Pradesh.jpg'");

fs.writeFileSync('src/data/mockData.ts', mockData);

let libData = fs.readFileSync('src/lib/data.ts', 'utf-8');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1616012480717[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/4/47/Rhino_in_Kaziranga.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1596788067883[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephant_safari_in_Kaziranga.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1587399881881[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/3/37/Tiger_in_Kaziranga_National_Park.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1611082260714[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/7/7b/Kaziranga_National_Park_Landscape.jpg"');

libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1580216668742[^"]*"/g, '"/images/arunachal_monastery_1789460394921.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1614088924618[^"]*"/g, '"/images/arunachal_sela_pass_1789460408512.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1614088629555[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/4/4f/Tawang_Monastery%2C_Arunachal_Pradesh.jpg"');
libData = libData.replace(/"https:\/\/images\.unsplash\.com\/photo-1626021235332[^"]*"/g, '"https://upload.wikimedia.org/wikipedia/commons/5/5f/Sela_Pass_Arunachal_Pradesh.jpg"');

fs.writeFileSync('src/lib/data.ts', libData);
