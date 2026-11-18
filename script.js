// ====== EDIT THESE ======
const WHATSAPP = "910000000000";   // country code + number, no + or spaces
const CURRENCY = "₹";
const CLASSES = {
  Mon: [["6:00 am","Strength","Coach Arjun"],["7:30 am","Yoga","Coach Meera"],["6:30 pm","HIIT","Coach Arjun"]],
  Tue: [["6:00 am","Spin","Coach Neha"],["6:30 pm","Zumba","Coach Neha"],["8:00 pm","Strength","Coach Raj"]],
  Wed: [["6:00 am","HIIT","Coach Raj"],["7:30 am","Yoga","Coach Meera"],["6:30 pm","Boxing fit","Coach Arjun"]],
  Thu: [["6:00 am","Strength","Coach Arjun"],["6:30 pm","Spin","Coach Neha"]],
  Fri: [["6:00 am","HIIT","Coach Raj"],["6:30 pm","Zumba","Coach Neha"],["8:00 pm","Yoga","Coach Meera"]],
  Sat: [["8:00 am","Boot camp","Coach Arjun"],["9:30 am","Yoga","Coach Meera"]],
  Sun: [["8:00 am","Stretch and mobility","Coach Meera"]]
};
// Monthly price per plan. Yearly = 10 months.
const PLANS = [
  {name:"Basic", price:1500, best:false, perks:["Gym floor access","Locker room","Free fitness check"]},
  {name:"Plus", price:2500, best:true, perks:["Everything in Basic","Unlimited group classes","1 coaching session a month"]},
  {name:"Pro", price:4500, best:false, perks:["Everything in Plus","4 personal training sessions","Diet plan"]}
];
// ========================

const money = n => CURRENCY + n.toLocaleString("en-IN");

// Timetable
const dayBox = document.getElementById("days"), slots = document.getElementById("slots");
function showDay(d) {
  dayBox.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.textContent === d));
  slots.innerHTML = "";
  CLASSES[d].forEach(([time, name, coach]) => {
    const li = document.createElement("li");
    li.innerHTML = '<span class="t"></span><b></b><span class="c"></span>';
    li.children[0].textContent = time;
    li.children[1].textContent = name;
    li.children[2].textContent = coach;
    slots.appendChild(li);
  });
}
Object.keys(CLASSES).forEach(d => {
  const b = document.createElement("button");
  b.type = "button"; b.textContent = d;
  b.addEventListener("click", () => showDay(d));
  dayBox.appendChild(b);
});
const todayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
showDay(todayName);

// Plans
let yearly = false;
const planBox = document.getElementById("plan-list");
function wa(text) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text); }
function drawPlans() {
  planBox.innerHTML = "";
  PLANS.forEach(p => {
    const el = document.createElement("div");
    el.className = "plan" + (p.best ? " best" : "");
    const price = yearly ? p.price * 10 : p.price;
    const h = document.createElement("h3"); h.textContent = p.name;
    const pr = document.createElement("div"); pr.className = "price";
    pr.textContent = money(price);
    const sm = document.createElement("small"); sm.textContent = yearly ? " / year" : " / month";
    pr.appendChild(sm);
    const ul = document.createElement("ul");
    p.perks.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    const a = document.createElement("a");
    a.className = "btn" + (p.best ? " primary" : "");
    a.textContent = "Choose " + p.name;
    a.href = wa("Hi Ironhill, I am interested in the " + p.name + " plan (" + (yearly ? "yearly" : "monthly") + ").");
    a.target = "_blank"; a.rel = "noopener";
    el.append(h, pr, ul, a);
    planBox.appendChild(el);
  });
}
document.querySelectorAll(".toggle button").forEach(b => b.addEventListener("click", () => {
  yearly = b.dataset.p === "y";
  document.querySelectorAll(".toggle button").forEach(x => x.setAttribute("aria-pressed", x === b));
  drawPlans();
}));
drawPlans();

// BMI
document.getElementById("bmi-form").addEventListener("submit", e => {
  e.preventDefault();
  const h = +document.getElementById("h").value / 100, w = +document.getElementById("w").value;
  const bmi = w / (h * h);
  const label = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy range" : bmi < 30 ? "Overweight" : "Obese range";
  document.getElementById("bmi-out").textContent = "BMI " + bmi.toFixed(1) + ": " + label;
});

// Join form -> WhatsApp
const form = document.getElementById("lead"), msg = document.getElementById("lead-msg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(form);
  if (!d.get("name").trim()) { msg.textContent = "Please add your name."; return; }
  msg.textContent = "Opening WhatsApp…";
  window.open(wa("Hi Ironhill, I am " + d.get("name") + ". I would like a free trial. My goal: " + d.get("goal") + "."), "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
