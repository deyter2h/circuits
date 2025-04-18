const obj = {
    name: 'World',
    tiles: [],
};


for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
        obj.tiles.push({
            x,
            y,
            name: 'Empty',
            entities: [],
        });
    }
}

console.log(JSON.stringify(obj));