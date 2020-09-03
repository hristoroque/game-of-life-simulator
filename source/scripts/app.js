import Grid from './Grid.js'

main()

function main(){
    const canvas = document.querySelector('#grid')
    const ctx = canvas.getContext('2d')
    const canvasConf = {
        cols: 30,
        rows: 30,
        size: canvas.width,
        cellSize: canvas.width / 30
    }

    const grid = new Grid(canvasConf.rows, canvasConf.cols)

    drawGrid({
        width: canvas.width,
        height: canvas.height,
        rows: 20,
        cols: 20
    }, ctx)

    let x = -1
    let y = -1

    let isRunning = true
    let isDrawing = false
    let scale = 1
    let deltaScale = 1

    canvas.addEventListener('mousedown',()=>{
        isRunning = false
        isDrawing = true
    })

    canvas.addEventListener('mouseup',()=>{
        isRunning = true
        isDrawing = false
    })

    canvas.addEventListener('mousemove', (e)=>{
        const rect = canvas.getBoundingClientRect()
        if(isDrawing){
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
    })

    const loop = ()=>{
        window.requestAnimationFrame(loop)

        ctx.clearRect(0,0,canvas.width, canvas.height)

        if(isDrawing){
            let i = (x - x%canvasConf.cellSize)/canvasConf.cellSize
            let j = (y - y%canvasConf.cellSize)/canvasConf.cellSize

            console.log(`${i} y ${j}`)
            grid.setAt(i,j,1)
        }

        
        drawCells(ctx, grid, canvasConf)
        drawGrid({
            width: canvas.width,
            height: canvas.height,
            rows: 30,
            cols: 30
        }, ctx)
    }

    window.requestAnimationFrame(loop)
}

function drawCells(ctx, grid, canvasConf){
    const size = canvasConf.cellSize

    for(let i = 0; i < grid.rows; i++){
        for(let j = 0; j < grid.cols; j++){
            if(grid.at(i,j) === 1){
                ctx.fillRect(i*size,j*size,size,size)
            }
        }
    }
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