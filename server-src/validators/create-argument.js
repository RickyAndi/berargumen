const { async, await } = require('asyncawait');
const util = require('util');

module.exports = async((req, res, next)  => {
  req.checkBody('title', 'Judul harus diisi.').notEmpty();
  req.checkBody('title', 'Jumlah karakter judul argumen antara 5 sampai 280').len(5, 1000);

  req.checkBody('description', 'Deskripsi harus diisi').notEmpty();
  req.checkBody('description', 'Deskripsi harus berisi karakter antara 100 sampai 1000').len(100, 1000);

  req.checkBody('tags', 'Setidaknya harus ada satu buah tags').isArrayAndHaveLength();

  const result = await(req.getValidationResult());
    
  if(!result.isEmpty()) {
    return res
      .status(400)
      .json({
        validationError : true,
        errors : result.mapped()
      });
  }

  return next();
});