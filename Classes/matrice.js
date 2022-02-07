export function generate(rows, cols, defaultVal = 0) {
return generateWithFn(rows,cols, ()=>defaultVal)
}

export function generateWithFn(rows, cols, fn = ()=> 0 ) {
    const mat = new Array(rows);
    for (let row = 0; row < rows; row++) {
        mat[row] = new Array(cols);
        for (let col = 0; col < cols; col++) {
            mat[row][col] = fn();
        }
    }
    return mat;
}

export function clone(matrix){
    const clone =  new Array(matrix.length);
    const rows = matrix.length;
    if(rows == 0) return[];
    const cols = matrix[0].length;
    for (let row = 0; row < rows; row++) {
        clone[row] = new Array(matrix[row].length); //nous donne la taille de lignes de la premiere colonne
        for (let col = 0; col < cols; col++) {
            clone[row][col] = matrix[row][col];
        }
    }
    return clone;
}