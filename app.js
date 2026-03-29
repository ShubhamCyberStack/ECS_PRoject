const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const cars = [
    { id: 1, name: "Tesla", model: "Model S Plaid", version: "2024", colors: ["Red Multi-Coat", "Solid Black", "Pearl White"], specs: "Tri-motor AWD, 1020 hp", topSpeed: "200 mph", tires: "21\" Arachnid Wheels", body: "Sedan", price: "$89,990", unitsSold: "50,000+", safetyRating: "5-Star (NHTSA)", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Ford", model: "Mustang GT", version: "Fastback Premium", colors: ["Grabber Blue", "Race Red"], specs: "5.0L V8, 480 hp", topSpeed: "155 mph", tires: "19\" Ebony Black-painted", body: "Coupe", price: "$43,000", unitsSold: "120,000", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1584345604480-8347bb9c3913?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Toyota", model: "Supra MK5", version: "GR 3.0 Premium", colors: ["Renaissance Red 2.0", "Stratosphere"], specs: "3.0L Inline-6, 382 hp", topSpeed: "155 mph", tires: "19\" Forged Aluminum", body: "Sports", price: "$56,750", unitsSold: "25,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Lamborghini", model: "Huracán", version: "EVO RWD", colors: ["Verde Selvans", "Arancio Borealis"], specs: "5.2L V10, 602 hp", topSpeed: "202 mph", tires: "20\" Aesir", body: "Supercar", price: "$210,000", unitsSold: "15,000", safetyRating: "Not Rated", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Porsche", model: "911 Carrera", version: "992 S", colors: ["Guards Red", "Shark Blue"], specs: "3.0L Flat-6 Twin-Turbo, 443 hp", topSpeed: "191 mph", tires: "20/21\" RS Spyder", body: "Coupe", price: "$123,000", unitsSold: "40,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Audi", model: "R8 V10", version: "Performance Quattro", colors: ["Suzuka Grey", "Mythos Black"], specs: "5.2L V10, 602 hp", topSpeed: "205 mph", tires: "20\" 5-V-Spoke Evo", body: "Coupe", price: "$158,600", unitsSold: "8,000", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1603553323145-66fd61606b2c?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "BMW", model: "M4", version: "Competition xDrive", colors: ["Isle of Man Green", "Sao Paulo Yellow"], specs: "3.0L M TwinPower Turbo, 503 hp", topSpeed: "180 mph", tires: "19/20\" M Double-spoke", body: "Coupe", price: "$82,000", unitsSold: "35,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Mercedes-AMG", model: "GT", version: "63 S E Performance", colors: ["Spectral Blue Magno", "Obsidian Black"], specs: "4.0L V8 biturbo Hybrid, 831 hp", topSpeed: "196 mph", tires: "21\" AMG Forged", body: "4-Door Coupe", price: "$170,000", unitsSold: "12,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Chevrolet", model: "Corvette Z06", version: "3LZ", colors: ["Accelerate Yellow", "Torch Red"], specs: "5.5L V8 LT6, 670 hp", topSpeed: "189 mph", tires: "20/21\" Spider Design", body: "Coupe", price: "$105,000", unitsSold: "30,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80" },
    { id: 10, name: "Nissan", model: "GT-R", version: "NISMO", colors: ["Stealth Gray", "Ultimate Silver"], specs: "3.8L V6 Twin-Turbo, 600 hp", topSpeed: "205 mph", tires: "20\" RAYS Forged", body: "Coupe", price: "$210,000", unitsSold: "1,200", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=500&q=80" },
    { id: 11, name: "Ferrari", model: "F8 Tributo", version: "V8 Turbo", colors: ["Rosso Corsa", "Giallo Modena"], specs: "3.9L V8 Turbo, 710 hp", topSpeed: "211 mph", tires: "20\" Diamond Polished", body: "Supercar", price: "$280,000", unitsSold: "6,000", safetyRating: "Not Rated", img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=500&q=80" },
    { id: 12, name: "McLaren", model: "720S", version: "Performance", colors: ["Papaya Spark", "Belize Blue"], specs: "4.0L V8 Twin-Turbo, 710 hp", topSpeed: "212 mph", tires: "19/20\" 10-Spoke Lightweight", body: "Supercar", price: "$300,000", unitsSold: "5,500", safetyRating: "Not Rated", img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=500&q=80" },
    { id: 13, name: "Aston Martin", model: "DBS", version: "770 Ultimate", colors: ["British Racing Green", "Xenon Grey"], specs: "5.2L V12 Twin-Turbo, 759 hp", topSpeed: "211 mph", tires: "21\" Ultimate Forged", body: "Coupe", price: "$387,000", unitsSold: "499", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1600706432502-77a0e2e327fc?auto=format&fit=crop&w=500&q=80" },
    { id: 14, name: "Bugatti", model: "Chiron", version: "Pur Sport", colors: ["Blue Carbon", "French Racing Blue"], specs: "8.0L W16 Quad-Turbo, 1500 hp", topSpeed: "217 mph (Limited)", tires: "Michelin Pilot Sport Cup 2 R", body: "Hypercar", price: "$3,600,000", unitsSold: "500", safetyRating: "Not Rated", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80" },
    { id: 15, name: "Rolls-Royce", model: "Phantom", version: "Series II", colors: ["Arctic White", "Black Diamond"], specs: "6.75L V12 Twin-Turbo, 563 hp", topSpeed: "155 mph", tires: "22\" Fully Polished", body: "Luxury Sedan", price: "$460,000", unitsSold: "3,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1631214503951-375100d24275?auto=format&fit=crop&w=500&q=80" },
    { id: 16, name: "Bentley", model: "Continental GT", version: "Speed", colors: ["Candy Red", "Verdant"], specs: "6.0L W12 TSI, 650 hp", topSpeed: "208 mph", tires: "22\" Speed Wheel", body: "Grand Tourer", price: "$290,000", unitsSold: "15,000", safetyRating: "5-Star", img: "https://th.bing.com/th/id/OIP.zNl1Sr1Zh7xWgJ2zyGHjUAHaE8?w=247&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 17, name: "Dodge", model: "Challenger", version: "SRT Hellcat Redeye", colors: ["Plum Crazy", "Destroyer Grey"], specs: "6.2L Supercharged V8, 797 hp", topSpeed: "203 mph", tires: "20\" Lightweight Carbon", body: "Muscle Car", price: "$85,000", unitsSold: "60,000", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&w=500&q=80" },
    { id: 18, name: "Jeep", model: "Wrangler", version: "Rubicon 392", colors: ["Sarge Green", "Firecracker Red"], specs: "6.4L V8 SRT HEMI, 470 hp", topSpeed: "99 mph", tires: "35\" BFGoodrich KO2", body: "SUV", price: "$87,500", unitsSold: "200,000", safetyRating: "3-Star", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80" },
    { id: 19, name: "Land Rover", model: "Defender", version: "110 V8", colors: ["Carpathian Grey", "Santorini Black"], specs: "5.0L Supercharged V8, 518 hp", topSpeed: "149 mph", tires: "22\" 5-Spoke Satin", body: "Off-Road SUV", price: "$111,000", unitsSold: "80,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1614200187524-dc4b8fa2393a?auto=format&fit=crop&w=500&q=80" },
    { id: 20, name: "Tesla", model: "Cybertruck", version: "Cyberbeast", colors: ["Stainless Steel"], specs: "Tri-motor AWD, 845 hp", topSpeed: "130 mph", tires: "35\" All-Terrain", body: "Pickup Truck", price: "$99,990", unitsSold: "10,000", safetyRating: "Pending", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80" },
    { id: 21, name: "Rivian", model: "R1T", version: "Quad-Motor AWD", colors: ["Rivian Blue", "Canyon Red"], specs: "835 hp, 0-60 in 3.0s", topSpeed: "110 mph", tires: "20\" All-Terrain", body: "Pickup Truck", price: "$87,000", unitsSold: "40,000", safetyRating: "5-Star", img: "https://th.bing.com/th/id/OIP.pN7O56bscUMZOa8q4PQu8gHaE8?w=284&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 22, name: "Lucid", model: "Air", version: "Sapphire", colors: ["Sapphire Blue"], specs: "Three Motors, 1,234 hp", topSpeed: "205 mph", tires: "Aero Sapphire", body: "Luxury Sedan", price: "$249,000", unitsSold: "5,000", safetyRating: "5-Star", img: "https://tse2.mm.bing.net/th/id/OIP.EfqPCeEBoAg77jd_ep1xPAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 23, name: "Honda", model: "Civic Type R", version: "FL5", colors: ["Championship White", "Rallye Red"], specs: "2.0L Turbo Inline-4, 315 hp", topSpeed: "169 mph", tires: "19\" Matte Black", body: "Hatchback", price: "$44,795", unitsSold: "20,000", safetyRating: "5-Star", img: "https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?auto=format&fit=crop&w=500&q=80" },
    { id: 24, name: "Volkswagen", model: "Golf R", version: "20th Anniversary", colors: ["Lapiz Blue Metallic", "White"], specs: "2.0L Turbo, 315 hp", topSpeed: "155 mph", tires: "19\" Estoril", body: "Hatchback", price: "$45,000", unitsSold: "15,000", safetyRating: "5-Star", img: "https://tse2.mm.bing.net/th/id/OIP.jp-gnIReuG72bi_j6WvgfQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 25, name: "Mazda", model: "MX-5 Miata", version: "Club", colors: ["Soul Red Crystal", "Deep Crystal Blue"], specs: "2.0L Inline-4, 181 hp", topSpeed: "143 mph", tires: "17\" BBS Wheels", body: "Roadster", price: "$32,000", unitsSold: "30,000", safetyRating: "4-Star", img: "https://images.unsplash.com/photo-1552642832-7236a89efb32?auto=format&fit=crop&w=500&q=80" }
];

app.get('/', (req, res) => {
    res.render('index', { cars });
});

app.get('/car/:id', (req, res) => {
    const car = cars.find(c => c.id == req.params.id);
    if (car) {
        res.render('details', { car });
    } else {
        res.redirect('/');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Car Showroom app running at http://0.0.0.0:${port}`);
});

