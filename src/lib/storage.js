import config from "./config"

const CTRKEY = "ricectr"
const VIEWKEY = "viewed"

export function getRiceCounter() {
    if(typeof localStorage == "undefined") return 0
    return parseInt(localStorage.getItem(CTRKEY)) || 0
}

export function incrementRiceCounter(n) {
    if(typeof localStorage == "undefined") return 0
    localStorage.setItem(CTRKEY, getRiceCounter()+n*config.increment)
}

export function getViewed() {
    return JSON.parse(localStorage.getItem(VIEWKEY) ?? "[]")
}

export function clearViewed() {
    localStorage.removeItem(VIEWKEY)
}

export function setAsViewed(questionIdx) {
    const v = getViewed()
    if(v.includes(questionIdx)) return
    localStorage.setItem(VIEWKEY, JSON.stringify([questionIdx, ...v]))
}