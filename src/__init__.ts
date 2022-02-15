import ArrayUI from "./ArrayUI";
import './index.scss'
import __random__ from './__random__';

export default function __init__() {
    const canvas: HTMLCanvasElement = document.querySelector('canvas#canvas')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const context: CanvasRenderingContext2D = canvas.getContext('2d')
    const array = new ArrayUI(context, {
        dx: 60,
        dy: 60,
        speed: 240,
        width: 30,
    })

    array.random(__random__())
    return array
}