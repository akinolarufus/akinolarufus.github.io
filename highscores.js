const highScoresLIst = document.getElementById("highscoresList");
const highScores = JSON.parse(localStorage.getItem(highScores));

highScoresLIst.innerHTML = highScores
.map(score => {
    return `<li class="high-score">${score.name}-${score.score}</li>`;
})
.join("");