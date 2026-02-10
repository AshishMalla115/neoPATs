let questions = JSON.parse(localStorage.getItem("questions")) || [
  {
    q: "HTML stands for?",
    options: ["Hyper Text Markup Language", "High Text ML", "Hyperlink Text", "None"],
    ans: 0
  }
];

let index = 0;
let score = 0;
let time = 60;

// AUTH
function signup() {
  localStorage.setItem("user", newUser.value);
  localStorage.setItem("pass", newPass.value);
  alert("Account Created");
  location.href = "index.html";
}

function login() {
  if (username.value === localStorage.getItem("user") &&
      password.value === localStorage.getItem("pass")) {
    location.href = "dashboard.html";
  } else {
    alert("Invalid Login");
  }
}

// NAV
function startExam() {
  location.href = "exam.html";
}

function openAdmin() {
  location.href = "admin.html";
}

// EXAM
if (location.pathname.includes("exam")) {
  showQuestion();
  setInterval(() => {
    time--;
    timer.innerText = "Time: " + time;
    if (time === 0) submitExam();
  }, 1000);
}

function showQuestion() {
  let q = questions[index];
  question.innerText = q.q;
  options.innerHTML = "";
  q.options.forEach((opt, i) => {
    options.innerHTML +=
      `<input type="radio" name="opt" value="${i}">${opt}<br>`;
  });
}

function nextQuestion() {
  let selected = document.querySelector('input[name="opt"]:checked');
  if (selected && Number(selected.value) === questions[index].ans) {
    score++;
  }
  index++;
  index < questions.length ? showQuestion() : submitExam();
}

function submitExam() {
  localStorage.setItem("score", score);
  location.href = "result.html";
}

// ADMIN
function addQuestion() {
  questions.push({
    q: q.value,
    options: [a.value, b.value, c.value, d.value],
    ans: Number(ans.value)
  });
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Question Added");
}
