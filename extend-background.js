let Jimp = require('jimp')

//image and metadata
let nft = `images/nft.png` 
let nft_metadata = {"name":"DeGod #10000"}

//process, enlarge NFT and add text
Jimp.read(nft,(err, nft) => {
  if (err) throw err;
  let background = new Jimp(1920,1080,nft.getPixelColor(10,10),(err, image)=>{
    if (err) throw err
  })
  new Jimp(nft,function(err,nft){
    new Jimp(background,function(err, background){
        var nft_bitmap = nft.bitmap
        var background_bitmap = background.bitmap
        var x = (background_bitmap.width - nft_bitmap.width  )/2
        var y = (background_bitmap.height - nft_bitmap.height )/2
        let x_m = 1600
        let y_m = 10 
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
          .then(font => {
          background.print(font, x_m, y_m, nft_metadata.name)
          background.composite(nft,x,y)
          background.write(`output/final_comp.png`, function(){
            console.log("walpaper done!")
          })
          
        })
    }) 
  })
});
