/* ===========================================
   2KC CONNECT V3
   script.js
=========================================== */

// =====================
// Loading Screen
// =====================

window.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 400);

});

// =====================
// Counter Animation
// =====================

function counter(id, target, speed = 20){

    let number = 0;

    const element = document.getElementById(id);

    const timer = setInterval(()=>{

        number++;

        element.innerText = number;

        if(number >= target){

            clearInterval(timer);

        }

    },speed);

}

counter("members",126);

counter("classes",12);

counter("events",28);

counter("documents",352);

// =====================
// Back To Top
// =====================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backTop.style.display="block";

    }else{

        backTop.style.display="none";

    }

});

backTop.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// =====================
// Dark Mode
// =====================

const themeBtn=document.getElementById("themeBtn");

let dark=true;

themeBtn.addEventListener("click",()=>{

    if(dark){

        document.body.style.background="#F8FAFC";

        document.body.style.color="#111827";

        dark=false;

    }else{

        document.body.style.background="#020617";

        document.body.style.color="#F8FAFC";

        dark=true;

    }

});
 ===========================================
   SCROLL REVEAL
=========================================== */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(60px)";

    section.style.transition="0.8s";

    observer.observe(section);

});

/* ===========================================
   BUTTON RIPPLE EFFECT
=========================================== */

const buttons=document.querySelectorAll(".btn,.btn2,.discord-btn");

buttons.forEach(button=>{

button.addEventListener("click",(e)=>{

const circle=document.createElement("span");

const size=Math.max(button.clientWidth,button.clientHeight);

circle.style.width=size+"px";

circle.style.height=size+"px";

circle.style.left=e.offsetX-size/2+"px";

circle.style.top=e.offsetY-size/2+"px";

circle.style.position="absolute";

circle.style.borderRadius="50%";

circle.style.background="rgba(255,255,255,.45)";

circle.style.transform="scale(0)";

circle.style.animation="ripple .6s linear";

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

/* ===========================================
   PARALLAX HERO
=========================================== */

window.addEventListener("mousemove",(e)=>{

const hero=document.querySelector(".hero-right img");

if(!hero)return;

const x=(window.innerWidth/2-e.pageX)/35;

const y=(window.innerHeight/2-e.pageY)/35;

hero.style.transform=`translate(${x}px,${y}px)`;

});

/* ===========================================
   ACTIVE NAVIGATION
=========================================== */

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

document.querySelectorAll("section").forEach(section=>{

const top=section.offsetTop-120;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")=="#"+current){

link.classList.add("active");

}

});

});

/* ===========================================
   RANDOM GREETING
=========================================== */

const greetings=[

"👋 Chào mừng đến với 2KC!",

"📚 Chúc bạn học thật tốt!",

"🚀 Hôm nay bạn sẽ chinh phục mục tiêu nào?",

"⭐ Cùng nhau cố gắng nhé!",

"🎉 Chúc bạn một ngày học tập hiệu quả!"

];

console.log(

greetings[Math.floor(Math.random()*greetings.length)]

);

/* ===========================================
   CURRENT YEAR
=========================================== */

const footer=document.querySelector(".footer-bottom");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} 2KC Connect | Made with ❤️`;

/* ===============================
   Đọc dữ liệu học sinh từ JSON
=============================== */

async function loadStudents() {

    const response = await fetch("data/students.json");

    const students = await response.json();

    const searchBtn = document.getElementById("searchBtn");

    const searchInput = document.getElementById("searchInput");

    const resultBox = document.getElementById("resultBox");

    searchBtn.onclick = () => {

        const keyword = searchInput.value.trim().toLowerCase();

        const student = students.find(s =>
            s.name.toLowerCase() === keyword ||
            s.id.toLowerCase() === keyword
        );

        if (!student) {

            resultBox.innerHTML = `
                <h3>❌ Không tìm thấy học sinh.</h3>
            `;

            return;
        }

        resultBox.innerHTML = `
            <h2>${student.name}</h2>
            <p><b>Mã:</b> ${student.id}</p>
            <p><b>Lớp:</b> ${student.class}</p>
            <hr>
            <p>📘 Toán: ${student.math}</p>
            <p>📕 Văn: ${student.literature}</p>
            <p>📗 Anh: ${student.english}</p>
            <hr>
            <h3>⭐ ${student.rank}</h3>
        `;
    };

}

loadStudents();/* ===============================
   Load Ranking
=============================== */

async function loadRanking(){

    const response = await fetch("data/ranking.json");

    const ranking = await response.json();

    const cards = document.querySelectorAll(".rank-card");

    ranking.forEach((player,index)=>{

        if(cards[index]){

            cards[index].querySelector("h3").textContent = player.name;

            cards[index].querySelector("p").textContent =
                player.xp + " XP";

        }

    });

}

loadRanking();
/* ===============================
   Load Notices
=============================== */

async function loadNotices(){

    const response = await fetch("data/notices.json");

    const notices = await response.json();

    const noticeBox = document.querySelector(".notice-box");

    noticeBox.innerHTML = "";

    notices.forEach(item=>{

        noticeBox.innerHTML += `
            <div class="notice-item">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;

    });

}

loadNotices();
/* ===============================
   Admin Login
=============================== */

const loginBtn=document.getElementById("loginBtn");

if(loginBtn){

loginBtn.onclick=()=>{

const password=document.getElementById("adminPassword").value;

const status=document.getElementById("loginStatus");

if(password==="2KC2026"){

status.innerHTML="✅ Đăng nhập thành công";

status.style.color="lime";

}else{

status.innerHTML="❌ Sai mật khẩu";

status.style.color="red";

}

}

}
/* =====================================
   Dashboard Statistics
===================================== */

async function loadDashboard(){

    const students =
        await (await fetch("../data/students.json")).json();

    const notices =
        await (await fetch("../data/notices.json")).json();

    const ranking =
        await (await fetch("../data/ranking.json")).json();

    if(document.getElementById("studentCount")){

        document.getElementById("studentCount").innerText =
            students.length;

        document.getElementById("noticeCount").innerText =
            notices.length;

        document.getElementById("rankingCount").innerText =
            ranking.length;

    }

}

loadDashboard();
