const canvas = document.createElement('canvas')
const array = new ArrayUI(canvas.getContext('2d'), {
    dx: 100,
    dy: 100,
    speed: 60,
    width: 20
})
canvas.width = 1920
canvas.height = 1080

for (let i = 0; i <= 20; i++)
    array.addElement(Math.floor(Math.random() * 100))



document.body.append(canvas)