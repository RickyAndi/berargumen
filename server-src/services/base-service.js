const { async, await } = require('asyncawait');

module.exports = (Model) => {
  
  const create = async((data) => {
    const modelToBeCreated = new Model(data);
    return await(modelToBeCreated.save());
  });

  const findOne = async(({query, select}) => {
    return await(Model.findOne(query, select));
  });

  const findById = async(({id, select}) => {
    return await(findOne({ _id : id}, select));
  });

  const edit = async((data) => {
    
  });

  const findOneAndUpdate = async(({query, modification}) => {
    return await(Model.findOneAndUpdate(query, modification));
  });

  return {
    create : create,
    findOne : findOne,
    findById : findById,
    findOneAndUpdate : findOneAndUpdate
  }
};