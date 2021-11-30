
const matrice = [[1,2],[3,4]];
const m2 = matrice; // fais reference a l'adresse, ne copie pas !!



//for double pour parcourire
//les deux possib sont justes mais parcours différent
for (let row = 0; row < matrice.length; row++) {
   for (let colonne = 0; colonne < matrice[row].length; colonne++) {
       console.log(matrice[row][colonne])
   }
    
}


//generate a matrice
const rows = 4
const cols = 6
const mat = new Array(rows)

for (let row = 0; row < rows; row++) {
    mat[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
        mat[row][col] = 0;
    }
}
console.log(mat)