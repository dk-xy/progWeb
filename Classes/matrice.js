

export default function generate(cols, rows, defaultVal = 0) {
    const mat = new Array(cols);
    for (let col = 0; col < cols; col++) {
        mat[col] = new Array(rows);
        for (let row = 0; row < rows; row++) {
            mat[col][row] = defaultVal;
        }
    }
    return mat;
}