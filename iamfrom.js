const elts = {
text1: document.getElementById("text1"),
text2: document.getElementById("text2"),
image1: document.getElementById("image1"),
image2: document.getElementById("image2"),
};

const texts = [
"I am from California",
"I am from a cool winter day",
"I am from the TV where we would watch Dora",
"I am from the park next door, where we would go and play",
"I am from the pressure cooker",
"I am from stress",
"I am from a place where you can’t be an onlooker",
"I am from a place where you cannot transgress",
"I am from the plane",
"I am from a constant move of travel",
"I am from a place where you never use the train",
"I am from a place where no one has held the gavel",
"I am from a place where my sister hugs a tree",
"I am from a place where my family has high expectations ",
"I am from a place where I will no longer be",
"I am from a place where I will never receive congratulations",
];

const images = [
"https://drupal-prod.visitcalifornia.com/sites/default/files/styles/fluid_1920/public/2025-01/VC_San-Francisco-Bay-Area-Region_gty-1348089637-RF_1280x640.jpg.webp?itok=gnJSI8kT",
"https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg",
"https://i.ytimg.com/vi/cGz6TysZd88/maxresdefault.jpg",
"https://teamtapper.com/wp-content/uploads/2022/11/Victoria-Park-Burlingame-Sign.jpg",
"https://www.ikea.com/us/en/images/products/ikea-365-pressure-cooker-stainless-steel__0812235_pe771975_s5.jpg",
"https://orsys-lemag.com/wp-content/uploads/2021/11/AdobeStock_95012321-Gestion-du-stress.jpg",
"https://lh5.googleusercontent.com/Y3lNQ_zfV_Y2n7fN-3dJxNgobT1EnXxRTLPwghEPh7DJ3ZoN18Qd6rIAyPBcijuZQ00xAzCyBwoJqu9tqFQJiCXnNp2JQEPhS-KeID_B5unmtpDifXR_ijvpwND-BxmZItidFn-XusQM59kkQTpmL2jaq2ktxkVdiN3Ki4sF_GxPX88dlDF0Z_xw5Q",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYZqxlZuuRozwf1wVHM8BIDxW22p0mPJ5GEuKcj068UqEqA2Z:https://lifeovercoffee.com/wp-content/uploads/2024/08/05-When-We-Transgress.001.jpeg&s",
"https://www.boeing.com/content/dam/boeing/boeingdotcom/commercial/787/assets/images/marquee-2019.jpg",
"https://static.independent.co.uk/2022/12/06/15/newFile-5.jpg",
"https://static.vecteezy.com/system/resources/previews/009/518/092/non_2x/no-train-black-silhouette-ban-icon-railway-transport-forbidden-pictogram-railroad-red-stop-circle-symbol-rail-road-station-restricted-sign-alert-train-prohibited-isolated-illustration-vector.jpg",
"https://m.media-amazon.com/images/I/51DvmgqHb9L.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRicJdpsPi65PZKIFf0ZZOIFUwxWamaBKMNpOASK8o5-jUtJAM:https://www.luminous-spaces.com/wp-content/uploads/2013/05/TreeHugger-SML1.jpg&s",
"https://miro.medium.com/v2/resize:fit:1400/1*lYzDW-QPGdBMFbn_5FrboA.png",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrqGOIbqHBUd5Hev0QBdzDG5pV3HAOn5-GRDGdHpMbP8bVQZw:https://media.npr.org/assets/img/2019/02/22/mfabrizio_ruralcollege_custom-6ea532f6c9d188c3839699fcdf45044f1e4a4a26.jpg%3Fs%3D1100%26c%3D50%26f%3Djpeg&s",
"https://i0.wp.com/401kspecialistmag.com/wp-content/uploads/2019/03/Ignored-1.jpg?resize=800%2C500&ssl=1"
];

const morphTime = 1;
const cooldownTime = 3;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];
elts.image1.src = images[textIndex % images.length];
elts.image2.src = images[(textIndex + 1) % images.length];

function doMorph() {
morph -= cooldown;
cooldown = 0;

let fraction = morph / morphTime;

if (fraction > 1) {
cooldown = cooldownTime;
fraction = 1;
}

setMorph(fraction);
}

function setMorph(fraction) {
// Image transitions (you can add more effects like opacity, blur, etc.)
elts.image2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
elts.image1.style.opacity = `${Math.pow(1 - fraction, 0.4) * 100}%`;

// Text transitions
elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

fraction = 1 - fraction;
elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

elts.image1.src = images[textIndex % images.length];
elts.image2.src = images[(textIndex + 1) % images.length];
}

function doCooldown() {
morph = 0;

elts.text2.style.filter = "";
elts.text2.style.opacity = "100%";
elts.text2.style.color = "white";

elts.text1.style.filter = "";
elts.text1.style.opacity = "0%";
elts.text1.style.color = "white";

elts.image2.style.opacity = "100%";
elts.image1.style.opacity = "0%";
}

function animate() {
requestAnimationFrame(animate);

let newTime = new Date();
let shouldIncrementIndex = cooldown > 0;
let dt = (newTime - time) / 1000;
time = newTime;

cooldown -= dt;

if (cooldown <= 0) {
if (shouldIncrementIndex) {
textIndex++;
}

doMorph();
} else {
doCooldown();
}
}

animate();