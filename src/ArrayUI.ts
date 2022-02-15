import Position from './Position'
import __random__ from './__random__';

type ArrayUIElement = {
    key: number
    position: Position
    step: number
}

type ArrayUIOptions = {
    dx?: number
    dy?: number
    speed?: number
    width?: number
}

type SwapType = {
    from: number
    to: number
}

class ArrayUI {
    elements: ArrayUIElement[]
    length: number
    options: ArrayUIOptions
    private index1: number
    private index2: number
    private indexMin: number
    private context: CanvasRenderingContext2D
    private swapping: SwapType

    constructor(context: CanvasRenderingContext2D, options: ArrayUIOptions) {
        this.elements = []
        this.length = 0
        this.context = context
        this.swapping = null
        this.options = options
        options.speed = options.speed || 60
        options.width = options.width || 50

        this.index1 = -1
        this.index2 = -1
        this.indexMin = -1
        window.requestAnimationFrame(() => this.render())
    }
    addElement(key: number) {
        const position = new Position(this.length * this.options.width, 0)
        this.elements.push({
            key,
            position,
            step: 0,
        })
        this.length = this.elements.length
    }
    removeElementByKey(key: number) {
        this.elements = this.elements.filter(element => element.key !== key)
        this.length = this.elements.length
    }
    removeAllElements() {
        this.elements = []
        this.length = 0
        this.swapping = null
        this.index1 = -1
        this.index2 = -1
        this.indexMin = -1
    }
    removeElementByIndex(index: number) {
        this.elements = this.elements.filter((_, i) => i !== index)
        this.length = this.elements.length
    }
    resetPosition() {
        this.elements = this.elements.map((element, index) => ({
            ...element,
            position: new Position(index * this.options.width, 0),
        }))
    }
    random(elements: number) {
        this.removeAllElements()
        for (; elements >= 0; elements--)
            this.addElement(Math.floor(Math.random() * 100))
    }

    getMaxAllElements() {
        if (!this.length)
            return 0
        return this.elements.reduce((prev, current) => {
            if (prev > current.key)
                return prev
            return current.key
        }, this.elements[0].key)
    }

    swap(from: number, to: number) {
        if (this.swapping)
            return
        if (from < 0 || from >= this.length)
            return
        if (to < 0 || to >= this.length)
            return
        this.swapping = { from, to }
    }

    // ___UIS___METHODS___
    // Draws Methods
    draws() {
        this.clearContext()
        this.drawElements()
        this.drawActives()
    }

    drawElements() {
        this.elements.forEach(element => this.drawElement(element))
    }

    drawElement(element: ArrayUIElement) {
        this.context.fillStyle = '#6dbaff'
        this.drawBaseElement(element)
        this.context.fillStyle = '#000'

        this.context.font = '10px Arial'
        this.context.textAlign = 'center'
        this.context.fillText(
            element.key.toString(),
            element.position.x + this.options.width / 2 + this.options.dx,
            element.position.y + 30 + this.options.dy + this.getMaxAllElements() * 5,
            50
        );
    }

    drawActives() {
        this.drawActive1()
        this.drawActive2()
        this.drawMax()
    }
    drawMax() {
        const element = this.elements[this.indexMin]
        if (!element)
            return
        this.context.fillStyle = '#ffd041'
        this.drawBaseElement(element)
    }

    drawActive1() {
        const element = this.elements[this.index2]
        if (!element)
            return
        this.context.fillStyle = '#295293'
        this.drawBaseElement(element)
    }

    drawActive2() {
        const element = this.elements[this.index1]
        if (!element)
            return
        this.context.fillStyle = '#ff3d3d'
        this.drawBaseElement(element)
    }

    drawBaseElement(element: ArrayUIElement) {
        this.context.beginPath()
        this.context.strokeStyle = 'blue'
        this.context.rect(
            element.position.x + this.options.dx,
            element.position.y + this.options.dy - (element.step - this.getMaxAllElements()) * 5,
            this.options.width,
            5 * element.step
        )
        if (element.step < element.key)
            element.step += __random__() / 20
        this.context.stroke()
        this.context.fill()
    }

    clearContext() {
        this.context.clearRect(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        )
    }

    // Update methods
    update() {
        this.updateElements()
    }

    updateElements() {
        this.updateSwap()
    }

    updateSwap() {
        if (!this.swapping)
            return
        const min = Math.min(this.swapping.from, this.swapping.to)
        const max = Math.max(this.swapping.from, this.swapping.to)

        if (
            this.elements[min].position.x >= max * this.options.width &&
            this.elements[min].position.y === 0
        ) {
            this.swapping = null
            const temp = this.elements[min]
            this.elements[min] = this.elements[max]
            this.elements[max] = temp
            this.indexMin = -1
            return
        }

        if (this.elements[min].position.x >= max * this.options.width) {
            this.elements[min].position.y += 5
            this.elements[max].position.y -= 5
            return
        }
        if (this.elements[min].position.y <= -50) {
            this.elements[min].position.x += 5
            this.elements[max].position.x -= 5
            return
        }

        this.elements[min].position.y -= 5
        this.elements[max].position.y += 5
    }

    // Sorting
    bubbleSort(): void {
        if (this.index1 !== -1 && this.index2 !== -1)
            return
        this.index1 = this.length - 1
        this.index2 = 0
        this.indexMin = -1
        this.__bubbleSort()
    }
    selectionSort(): void {
        if (this.index1 !== -1 && this.index2 !== -1)
            return
        this.index1 = 0
        this.index2 = 0
        this.indexMin = this.index1
        this.__selectionSort()
    }
    insertionSort(): void {
        if (this.index1 !== -1 && this.index2 !== -1)
            return
        this.index1 = 0
        this.index2 = 1
        this.indexMin = -1
        this.__insertionSort()
    }

    // __Sorting

    private __bubbleSort(): void {
        if (this.index1 === 0 && this.index2 === this.length - 1) {
            this.index1 = -1
            this.index2 = -1
            this.indexMin = -1
            return
        }

        if (this.swapping) {
            setTimeout(() => this.__bubbleSort(), 20000 / this.options.speed)
            return
        }

        if (this.index2 !== -1)
            if (this.elements[this.index2]?.key > this.elements[this.index2 + 1]?.key) {
                this.swap(this.index2, this.index2 + 1)
                this.indexMin = this.index2 + 1
            }

        if (this.swapping) {
            setTimeout(() => this.__bubbleSort(), 20000 / this.options.speed)
            return
        }

        if (this.index2 === this.index1 - 1) {
            this.index1--
            this.index2 = -1
        }

        if (this.index2 < this.index1 - 1) {
            this.index2++
        }

        setTimeout(() => this.__bubbleSort(), 20000 / this.options.speed)
    }

    private __selectionSort(): void {
        if (this.index1 === this.length - 1 && this.index2 === this.length - 1) {
            this.index1 = -1
            this.index2 = -1
            this.indexMin = -1
            return
        }

        if (this.swapping) {
            setTimeout(() => this.__selectionSort(), 20000 / this.options.speed)
            return
        }

        if (this.index2 === this.length - 1 && this.indexMin === -1) {
            this.index1++
            this.index2 = this.index1
            this.indexMin = this.index1
        }

        if (this.index2 === this.length - 1 && this.indexMin !== -1 && !this.swapping) {
            this.swap(this.indexMin, this.index1)
            setTimeout(() => this.__selectionSort(), 20000 / this.options.speed)
            return
        }

        if (this.swapping) {
            setTimeout(() => this.__selectionSort(), 20000 / this.options.speed)
            return
        }

        if (this.index2 !== this.length - 1)
            this.index2++

        if (this.indexMin !== -1)
            if (this.elements[this.index2].key <
                this.elements[this.indexMin].key)
                this.indexMin = this.index2
        setTimeout(() => this.__selectionSort(), 20000 / this.options.speed)
    }

    private __insertionSort(): void {
        if (this.index1 === this.length) {
            this.index1 = -1
            this.index2 = -1
            this.indexMin = -1
            return
        }

        if (this.index2 === 0) {
            this.index1++
            this.index2 = this.index1
        }

        if (this.elements[this.index2]?.key < this.elements[this.index2 - 1]?.key) {
            this.indexMin = this.index2 - 1
            this.swap(this.index2, this.index2 - 1)
        }
        if (this.swapping) {
            setTimeout(() => this.__insertionSort(), 20000 / this.options.speed)
            return
        }

        this.index2--

        if (this.elements[this.index2]?.key >= this.elements[this.index2 - 1]?.key) {
            this.index1++
            this.index2 = this.index1
        }

        setTimeout(() => this.__insertionSort(), 20000 / this.options.speed)
    }

    render(): void {
        this.update()
        this.draws()

        window.requestAnimationFrame(() => this.render())
    }
}

export default ArrayUI