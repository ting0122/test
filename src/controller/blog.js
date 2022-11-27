const { exec } = require("../db/pgsql")

const getList = (author, keyword)=>{

    let sql = `SELECT * FROM blogs WHERE 1=1 `
    if(author){
        sql+= `and author='${author}' `
    }
    if(keyword){
        sql+=`and keyword='${keyword}'`
    }
    sql+=`order by createtime desc;`
    return exec(sql)
}

const getDetail = (id)=>{
    return {
        id: 1,
        title: 'title1',
        content: 'content1',
        creatTime: 20201120,
        author: 'author1'
    }
}

const newBlog = (blogdata = {})=>{
    return{
        id : 3
    }
}

const updateBlog = (id, blogdata={})=>{
    return true
}

const delBlog = (id)=>{
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}