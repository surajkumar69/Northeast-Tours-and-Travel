const fs = require('fs');

let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1627894483216-2138af692e32\?q=80&w=2574&auto=format&fit=crop'/g, "'/images/meghalaya_root_bridge_1789460307682.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1634840884196-857a2cbccce2\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_waterfall_1789460321208.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1597818456686-2a3b04c10c12\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_dawki_river_1789460337488.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1636195289944-59e66d4f9b8f\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_hills_1789460353512.jpg'");

content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1596788068872-3c8712a20fc1\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_tea_estate_1789460102115.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1579738221528-76136e053a47\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_majuli_river_1789460244378.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1589307371560-64215fb38e9c\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_temple_1789460276376.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1593026367469-63ff0f55fbcc\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_culture_1789460260883.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1627894483216-2138af692e32\?q=80&w=2574&auto=format&fit=crop'/g, "'/images/assam_village_1789460292079.jpg'"); // some reuse

content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1580216668742-8c909e4bd331\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/arunachal_monastery_1789460394921.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1614088924618-842278cb7785\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/arunachal_sela_pass_1789460408512.jpg'");

fs.writeFileSync('src/data/mockData.ts', content);

let content2 = fs.readFileSync('src/lib/data.ts', 'utf-8');
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1627894483216-2138af692e32\?q=80&w=2574&auto=format&fit=crop'/g, "'/images/meghalaya_root_bridge_1789460307682.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1634840884196-857a2cbccce2\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_waterfall_1789460321208.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1597818456686-2a3b04c10c12\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_dawki_river_1789460337488.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1636195289944-59e66d4f9b8f\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/meghalaya_hills_1789460353512.jpg'");

content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1596788068872-3c8712a20fc1\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_tea_estate_1789460102115.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1579738221528-76136e053a47\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_majuli_river_1789460244378.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1589307371560-64215fb38e9c\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_temple_1789460276376.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1593026367469-63ff0f55fbcc\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/assam_culture_1789460260883.jpg'");

content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1580216668742-8c909e4bd331\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/arunachal_monastery_1789460394921.jpg'");
content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1614088924618-842278cb7785\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/arunachal_sela_pass_1789460408512.jpg'");

content2 = content2.replace(/'https:\/\/images\.unsplash\.com\/photo-1552519507-da3b142c6e3d\?q=80&w=2670&auto=format&fit=crop'/g, "'/images/swift_dzire_main.jpg'");

fs.writeFileSync('src/lib/data.ts', content2);
