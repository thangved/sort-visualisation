const canvas = document.createElement('canvas')
const array = new ArrayUI(canvas.getContext('2d'), {
    dx: 100,
    dy: 400,
})
canvas.width = 900
canvas.height = 900

array.addElement(55)
array.addElement(11)
array.addElement(70)
array.addElement(19)
array.addElement(1)
array.addElement(5)
array.addElement(2)
array.addElement(8)


document.body.append(canvas)