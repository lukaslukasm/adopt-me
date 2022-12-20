import { useState, useEffect } from 'react'
import gsap from 'gsap'

function MyComponent() {

  // const [nOfCards, setNOfCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [nOfCards, setNOfCards] = useState(9)

  useEffect(() => {
    gsap.to('.in', { scale: 1.3, opacity: 1, ease: 'power3.Out', duration: 0.2 })
  }, [nOfCards])

  const clickHandler = () => {
    document.getElementById(`${3}`).classList.add('out')
    document.getElementById(`${nOfCards - 1}`).classList.remove('in')
    gsap.fromTo('.out', { scale: 1 }, { scale: 0.7, opacity: 0, duration: 0.1, ease: 'power3.Out', onComplete: () => setNOfCards(prev => prev - 1) })
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '20px', padding: '20px' }}>
        <button onClick={() => setNOfCards(prev => prev + 1)}>
          +
        </button>
        <button onClick={clickHandler} disabled={!nOfCards > 0} >
          –
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '50px', padding: '20px', height: 'auto' }}>
        {[...Array(nOfCards).keys()].map((i) => <div key={i} id={i} className="card in" />)}
      </div>
    </>
  )
}
export default MyComponent