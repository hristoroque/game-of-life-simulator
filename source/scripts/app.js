main();

function main(){
    const canvas = document.querySelector('#grid')
    const ctx = canvas.getContext('2d')

    drawGrid({
        width: canvas.width,
        height: canvas.height,
        rows: 20,
        cols: 20
    }, ctx)
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