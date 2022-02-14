import Position from './Position'

type ArrayUIElement = {
    key: number
    position: Position
}

type ArrayUIOptions = {
    dx?: number
    dy?: number
}

type SwapType = {
    from: number
    to: number
}

class ArrayUI {
    elements: ArrayUIElement[]
    length: number
    options: ArrayUIOptions
    index1: number
    index2: number
    private context: CanvasRenderingContext2D
    private swapping: SwapType

    constructor(context: CanvasRenderingContext2D, options: ArrayUIOptions) {
        this.elements = []
        this.length = 0
        this.context = context
        this.swapping = null
        this.options = options

        this.index1 = -1
        this.index2 = -1
        this.render()
    }
    addElement(key: number) {
        const position = new Position(this.length * 50, 0)
        this.elements.push({
            key,
            position,
        })
        this.length = this.elements.length
    }
    removeElementByKey(key) {
        this.elements = this.elements.filter(element => element.key !== key)
        this.length = this.elements.length
    }
    removeElementByIndex(index) {
        this.elements = this.elements.filter((_, i) => i !== index)
        this.length = this.elements.length
    }
    resetPosition() {
        this.elements = this.elements.map((element, index) => ({
            ...element,
            position: new Position(index * 50, 0),
        }))
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
        this.context.beginPath()
        this.context.fillStyle = '#6dbaff'
        this.context.rect(
            element.position.x + this.options.dx,
            element.position.y + this.options.dy - element.key * 5,
            50,
            element.key * 5
        )
        this.context.stroke()
        this.context.fill()
        this.context.fillStyle = '#000'

        this.context.font = '20px Arial'
        this.context.textAlign = 'center'
        this.context.fillText(
            element.key.toString(),
            element.position.x + 25 + this.options.dx,
            element.position.y + 30 + this.options.dy,
            50
        );
    }

    drawActives() {
        this.drawActive1()
        this.drawActive2()
    }

    drawActive1() {
        const element = this.elements[this.index2]
        if (!element)
            return
        this.context.strokeStyle = 'blue'
        this.context.lineWidth = 2
        this.context.beginPath()
        this.context.rect(
            element.position.x + this.options.dx,
            element.position.y + this.options.dy - element.key * 5,
            50,
            element.key * 5
        )
        this.context.stroke()

        this.context.font = '20px Arial'
        this.context.textAlign = 'center'
        this.context.fillText(
            element.key.toString(),
            element.position.x + 25 + this.options.dx,
            element.position.y + 30 + this.options.dy,
            50
        );

        this.context.strokeStyle = '#000'
        this.context.lineWidth = 1
    }

    drawActive2() {
        const element = this.elements[this.index1]
        if (!element)
            return
        this.context.strokeStyle = 'red'
        this.context.lineWidth = 2
        this.context.beginPath()
        this.context.rect(
            element.position.x + this.options.dx,
            element.position.y + this.options.dy - element.key * 5,
            50,
            element.key * 5
        )
        this.context.stroke()

        this.context.font = '20px Arial'
        this.context.textAlign = 'center'
        this.context.fillText(
            element.key.toString(),
            element.position.x + 25 + this.options.dx,
            element.position.y + 30 + this.options.dy,
            50
        );

        this.context.strokeStyle = '#000'
        this.context.lineWidth = 1
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
            this.elements[min].position.x === max * 50 &&
            this.elements[min].position.y === 0
        ) {
            this.swapping = null
            const temp = this.elements[min]
            this.elements[min] = this.elements[max]
            this.elements[max] = temp
            return
        }

        if (this.elements[min].position.x === max * 50) {
            this.elements[min].position.y++
            this.elements[max].position.y--
            return
        }
        if (this.elements[min].position.y <= -50) {
            this.elements[min].position.x++
            this.elements[max].position.x--
            return
        }

        this.elements[min].position.y--
        this.elements[max].position.y++
    }

    // Sorting
    bubbleSort() {
        this.index1 = this.length - 1
        this.index2 = 0
        this.__bubbleSort()
    }

    private __bubbleSort() {
        if (this.index1 === 0 && this.index2 === this.length - 1) {
            this.index1 = -1
            this.index2 = -1
            return
        }

        if (this.swapping)
            return setTimeout(() => this.__bubbleSort(), 1000)

        if (this.index2 !== -1)
            if (this.elements[this.index2].key > this.elements[this.index2 + 1].key)
                this.swap(this.index2, this.index2 + 1)

        if (this.swapping)
            return setTimeout(() => this.__bubbleSort(), 1000)

        if (this.index2 === this.index1 - 1) {
            this.index1--
            this.index2 = -1
        }

        if (this.index2 < this.index1 - 1) {
            this.index2++
        }

        setTimeout(() => this.__bubbleSort(), 1000)
    }

    render() {
        this.update()
        this.draws()

        setTimeout(() => this.render(), 1000 / 60)
    }
}

export default ArrayUI