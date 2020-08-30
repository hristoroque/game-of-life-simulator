class Grid{
    constructor(cols, rows){
        this.cols = cols
        this.rows = rows
        this.array2d = Array(rows*cols).fill(0)
    }

    at(x, y){
        return this.array2d[x*this.rows + y]
    }

    copy(){
        let grid = new Grid(this.cols, this.rows)
        grid.array2d = [...this.array2d]
        return grid
    }
}

export default Grid