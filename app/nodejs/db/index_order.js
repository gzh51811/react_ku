/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 */
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const database_url = 'mongodb://localhost:27017';
const database_name = 'react';
async function connect() {
    let client = await MongoClient.connect(database_url, { useNewUrlParser: true });
    let db = client.db(database_name);
    return { db, client };
}

exports.insert = async (colName, data) => {
    let { db, client } = await connect();
    // console.log('client',client)
    // console.log('db',db)
    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data);
    client.close();
    return res;
}

exports.delete = async (colName, query) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);
    client.close();
    return res;
}
exports.update = async (colName, que1, que2) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    //var id,up;
    let res = await collection['updateMany'](que1, que2);
    // console.log(query);
    //console.log(que1,que2);
    // {"onumber" : "001"},  
    // { $set: { "cname " : "zcy"} },  
    client.close();
    return res;
}

exports.find = async (colName, query) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    // if(pai){
    //     var res1 = await collection.find(query).sort(pai).toArray();
    // }
    var res = await collection.find(query).toArray();
    client.close();
    // 返回查询结果.toArray()
    return res;
}
exports.find1 = async (colName, query, price) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    var res1 = await collection.find(query).sort({ 'price': -1 }).toArray();
    client.close();
    // 返回查询结果.toArray()
    return res1;
}
exports.find2 = async (colName, query, pai) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    var res1 = await collection.find(query).sort({ 'time': -1 }).toArray();
    client.close();
    // 返回查询结果.toArray()
    return res1;
}
exports.aggregate = async (colName, que3, que4) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    // db.collectionname.aggregate({$match: {"msg.name": "name1"}}, {$project: {_id: 0, timestamp: "$timestamp", msg: {$filter: {input: "$msg", as: "msg", cond: {$eq: ["$$msg.name", "name1"]}}}}})
    // var res = await collection.aggregate('list', { $match: { "items.itemId": itemId } }, { $project: { _id: 0, timestamp: "$timestamp", items: { $filter: { input: "$items", as: "items", cond: { $eq: ["$$items.itemId", itemId] } } } } }).toArray();
    var res = await collection.aggregate(que3, que4).toArray();
    client.close();
    // 返回查询结果.toArray()
    return res;
}
// insert('user',[{name:'xxx',age:20},{name:'xx2',age:18}]);
// delete('user',{age:{$lt:18}});
//更新指定字段
//查找name属性为tiantian的数据，并更新age属性为27
// db.user.updateOne({ods},{$set:{ods:27}})
