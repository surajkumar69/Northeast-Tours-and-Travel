const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf-8');
mockData = mockData.replace(/'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/4\/47\/Rhino_in_Kaziranga\.jpg'/g, "'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=2670&auto=format&fit=crop'");
mockData = mockData.replace(/'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/e\/e8\/Elephant_safari_in_Kaziranga\.jpg'/g, "'https://images.unsplash.com/photo-1596788067883-9114f17f4611?q=80&w=2670&auto=format&fit=crop'");
mockData = mockData.replace(/'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/3\/37\/Tiger_in_Kaziranga_National_Park\.jpg'/g, "'https://images.unsplash.com/photo-1587399881881-8b0653d4c3f5?q=80&w=2670&auto=format&fit=crop'");
mockData = mockData.replace(/'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/7\/7b\/Kaziranga_National_Park_Landscape\.jpg'/g, "'https://images.unsplash.com/photo-1611082260714-f06b47c0b0ee?q=80&w=2670&auto=format&fit=crop'");
mockData = mockData.replace(/'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/4\/4f\/Tawang_Monastery%2C_Arunachal_Pradesh\.jpg'/g, "'https://images.unsplash.com/photo-1626021235332-9c16922d56d1?q=80&w=2670&auto=format&fit=crop'");

fs.writeFileSync('src/data/mockData.ts', mockData);

let libData = fs.readFileSync('src/lib/data.ts', 'utf-8');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/4\/47\/Rhino_in_Kaziranga\.jpg"/g, '"https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=2670&auto=format&fit=crop"');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/e\/e8\/Elephant_safari_in_Kaziranga\.jpg"/g, '"https://images.unsplash.com/photo-1596788067883-9114f17f4611?q=80&w=2670&auto=format&fit=crop"');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/3\/37\/Tiger_in_Kaziranga_National_Park\.jpg"/g, '"https://images.unsplash.com/photo-1587399881881-8b0653d4c3f5?q=80&w=2670&auto=format&fit=crop"');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/7\/7b\/Kaziranga_National_Park_Landscape\.jpg"/g, '"https://images.unsplash.com/photo-1611082260714-f06b47c0b0ee?q=80&w=2670&auto=format&fit=crop"');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/4\/4f\/Tawang_Monastery%2C_Arunachal_Pradesh\.jpg"/g, '"https://images.unsplash.com/photo-1614088629555-46ff87e91458?q=80&w=2670&auto=format&fit=crop"');
libData = libData.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/5\/5f\/Sela_Pass_Arunachal_Pradesh\.jpg"/g, '"https://images.unsplash.com/photo-1626021235332-9c16922d56d1?q=80&w=2670&auto=format&fit=crop"');

fs.writeFileSync('src/lib/data.ts', libData);
