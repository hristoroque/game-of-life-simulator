import Grid from './Grid.js'

main()

function main(){
    const canvas = document.querySelector('#grid')
    const ctx = canvas.getContext('2d')
    canvas.requestFullscreen();

    const grid = new Grid(20,20)

    drawGrid({
        width: canvas.width,
        height: canvas.height,
        rows: 20,
        cols: 20
    }, ctx)

    let x = -1
    let y = -1

    let isPaused = true
    let scale = 1
    let deltaScale = 1

    canvas.addEventListener('mousedown',()=>{
        isPaused = false
    })

    canvas.addEventListener('touchstart',()=>{
        isPaused = false
    })

    canvas.addEventListener('touchend',()=>{
        isPaused = true
    })

    canvas.addEventListener('wheel',(e)=>{
        scale += event.deltaY * -0.01;
    })

    canvas.addEventListener('mouseup',()=>{
        isPaused = true
    })

    canvas.addEventListener('mousemove',(e)=>{
        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    })

    canvas.addEventListener('touchmove',e=>{
        const rect = canvas.getBoundingClientRect()

        for(let touch of e.changedTouches){
            x = touch.clientX - rect.left
            y = touch.clientY - rect.top
        }
    })

    const loop = ()=>{
        window.requestAnimationFrame(loop)

        /*if(scale !== deltaScale){
            scaleFunc(ctx, scale)
            deltaScale = scale
        }*/

        ctx.clearRect(0,0,canvas.width, canvas.height)

        if(!isPaused){
            drawCell(canvas, 20, 20, ctx, x, y)
        }

        drawGrid({
            width: canvas.width,
            height: canvas.height,
            rows: 20,
            cols: 20
        }, ctx)
    }

    window.requestAnimationFrame(loop)
}

function drawCell(canvas, rows, cols, ctx, x, y){
    const cellWidth = canvas.width / cols
    const cellHeight = canvas.height / rows

    ctx.fillRect(x - x%cellWidth, y - y%cellHeight, cellWidth, cellHeight)
}

function drawGrid({width, height, rows, cols}, ctx){
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    for(let x = 0; x < width; x++){
        ctx.beginPath()
        ctx.moveTo(x * cellWidth, 0)
        ctx.lineTo(x * cellWidth, height)
        ctx.stroke()
    }
    for(let y = 0; y < height; y++){
        ctx.beginPath()
        ctx.moveTo(0, y * cellHeight)
        ctx.lineTo(width, y * cellHeight)
        ctx.stroke()
    }
}

function scaleFunc(ctx, factor){
    ctx.transform(factor,0,0,factor,0,0)
}