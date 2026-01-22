import questionData from "@app/assets/questions.json"
import { clearViewed, getViewed } from "./storage"

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

const indexes = Array(questionData.length).fill(null).map((_,i)=>i)

function getQuestionData(idx) {
    const question = JSON.parse(JSON.stringify(questionData[idx]))
    const correct = question.choices[0]
    shuffle(question.choices)
    const corrIdx = question.choices.indexOf(correct)
    return {
        questionIdx: idx,
        ...question,
        corrIdx
    }
}

export function nextQuestion() {
    const alreadyViewed = getViewed()
    const candidates = indexes.filter(x=>!alreadyViewed.includes(x))
    if(candidates.length == 0) {
        // We have no choice
        // Also clear the viewed array
        clearViewed()
        return getQuestionData(Math.floor(Math.random()*questionData.length))
    }
    return getQuestionData(candidates[Math.floor(Math.random()*candidates.length)])
}