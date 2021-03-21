// export function loadSpriteSheet(name) {
//     return loadJSON(`sprites/${name}.json`)
//     .then(sheetSpec => Promise.all([
//         sheetSpec,
//         loadImage(sheetSpec.imageURL),
//     ]))
//     .then(([sheetSpec, image]) => {
//         const sprites = new SpriteSheet(
//             image,
//             sheetSpec.tileW,
//             sheetSpec.tileH);
//         if (sheetSpec.frames) {
//             sheetSpec.frames.forEach(frameSpec => {
//                 sprites.define(frameSpec.name, ...frameSpec.rect);
//             });
//         }
//         return sprites;
//     })
// }
//# sourceMappingURL=loaders.js.map