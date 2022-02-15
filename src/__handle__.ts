import ArrayUI from './ArrayUI';
import __random__ from './__random__';

export default function __handle__(array: ArrayUI) {
    const tools = document.getElementById('tools')

    const random = tools.querySelector('#random')
    const insertion = tools.querySelector('#insertion')
    const bubble = tools.querySelector('#bubble')
    const selection = tools.querySelector('#selection')
    const speed = tools.querySelector('#speed')
    const audio = tools.querySelector('#audio') as HTMLElement

    if (JSON.parse(localStorage.getItem('off_audio'))) {
        array.toggleMute()
        audio.click()
    }

    random.addEventListener('click', () => array.random(__random__()))
    insertion.addEventListener('click', () => array.insertionSort())
    bubble.addEventListener('click', () => array.bubbleSort())
    selection.addEventListener('click', () => array.selectionSort())
    speed.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement
        array.options.speed = parseInt(target.value)
        document.getElementById('speedNumber').innerText = target.value
    })
    audio.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement
        localStorage.setItem('off_audio', JSON.stringify(!target.checked))
        console.log(target.checked)
        array.toggleMute()
    })

}