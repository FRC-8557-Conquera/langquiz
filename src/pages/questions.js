import GlobalNav from "@app/components/GlobalNav"
import { nextQuestion } from "@app/lib/questions"
import { getRiceCounter, incrementRiceCounter, setAsViewed } from "@app/lib/storage"
import { useEffect, useRef, useState } from "react"
import confetti from "canvas-confetti"
import Footer from "@app/components/Footer"
import config from "@app/lib/config"

const ChoiceButton = (props) => {
    return (<button className={`question-choice ${!props.canSelect ? (props.corrIdx == props.idx ? "correct" : (props.selectedChoice == props.idx ? "incorrect" : "")) : ""}`} onClick={() => props.onClick(props.idx)} disabled={!props.canSelect}>{props.text}</button>)
}

export default function Questions() {
    const [question, setQuestion] = useState(null)
    const collectedRef = useRef()
    useEffect(() => {
        setQuestion(nextQuestion())
    }, [])
    const [riceCounter, setRiceCounter] = useState(null)
    const [globalCounter, setGlobalCounter] = useState(null)
    const [sessionOffset, setSessionOffset] = useState(null)
    const [showCupModal, setShowCupModal] = useState(false)
    useEffect(() => {
        const c = getRiceCounter()
        setRiceCounter(c)
        setSessionOffset(c)
    }, [])

    if(typeof window != "undefined") window.showModal = () => setShowCupModal(true)

    const [selectedChoice, setSelectedChoice] = useState(null)
    const click = idx => {
        setAsViewed(question.questionIdx)
        setSelectedChoice(idx)
        if(idx == question.corrIdx) {
            incrementRiceCounter(1)
            confetti()
            collectedRef.current.animate([
                { transform: `scale(1)` },
                { transform: `scale(1.5)` },
                { transform: `scale(1)` }
            ], {
                duration: 200,
                iterations: 1
            })
            const c = getRiceCounter()
            setRiceCounter(c)
            if(((c-sessionOffset) % config.cupSize) == 0) setShowCupModal(true)
        }
    }


    const canSelect = selectedChoice == null
    return (<>
        <GlobalNav />
        <div className="footer-wrap" style={{
            overflow: showCupModal ? "hidden" : "",
            maxHeight: showCupModal ? "100vh" : ""
        }}>
            <div className="question-page-wrap">
                <div className="question-card-container">
                    {question ? (<>
                        <div className="question-card">
                            <h1>{question.text}</h1>
                            <div className="question-choices">
                                <ChoiceButton selectedChoice={selectedChoice} corrIdx={question.corrIdx} idx={0} canSelect={canSelect} text={question.choices[0]} onClick={click} />
                                <ChoiceButton selectedChoice={selectedChoice} corrIdx={question.corrIdx} idx={1} canSelect={canSelect} text={question.choices[1]} onClick={click} />
                                <ChoiceButton selectedChoice={selectedChoice} corrIdx={question.corrIdx} idx={2} canSelect={canSelect} text={question.choices[2]} onClick={click} />
                                <ChoiceButton selectedChoice={selectedChoice} corrIdx={question.corrIdx} idx={3} canSelect={canSelect} text={question.choices[3]} onClick={click} />
                            </div>
                            <div className="next-btn-wrap">
                                <button style={{
                                    visibility: (!canSelect && !showCupModal) ? "" : "hidden"
                                }} onClick={() => {
                                    setQuestion(nextQuestion())
                                    setSelectedChoice(null)
                                }} className="next-btn">İleri</button>
                            </div>
                        </div>
                    </>) : null}
                </div>
                <div className="rice-sidebar">
                    <div className="rice-sidebar-counter">
                        <span className="rice-sidebar-collected" ref={collectedRef}>{riceCounter ?? 0}</span>
                        doğru soru cevapladınız
                    </div>
                    {/*
                    <div className="rice-sidebar-counter">
                        <span className="rice-sidebar-collected" ref={collectedRef}>{globalCounter ?? 0}</span>
                        toplam toplanan mama
                    </div>
                    */}
                </div>
            </div>
            <Footer />
        </div>
    </>)
}