// Scalar types --> String,int,float,boolean,ID  
//non scalar types --> Object,arrays

//Smaple data
const users=[{
    "id":"1",
    "name":"Rishabh Agrawal",
    "email":"r@gmail.com",
    "age":20
},{
    "id":"2",
    "name":"Pranav Undre",
    "email":"p@gmail.com",
    "age":19
},{
    "id":"3",
    "name":"Ramesh",
    "email":"ra@gmail.com",
    "age":21
}]
const posts=[{
    "id":"1",
    "title":"First Post",
    "body":"By Rishabh",
    "published":true,
    "author":"1"
},{
    "id":"2",
    "title":"Second Post",
    "body":"By Rishabh",
    "published":false,
    "author":"1"
},{
    "id":"3",
    "title":"Third Post",
    "body":"By Rishabh",
    "published":true,
    "author":"2"
}]
const comment=[{
    "id":"10",
    "text":"You are beautiful",
    "author":"1",
    "postedOn":"1"
},{
    "id":"20",
    "text":"You are pretty",
    "author":"1",
    "postedOn":"1"
},{
    "id":"30",
    "text":"You are gorgeous",
    "author":"2",
    "postedOn":"2"
},{
    "id":"40",
    "text":"You are amazing",
    "author":"3",
    "postedOn":"3"
}]

const db={
    users,
    posts,
    comment
}

export {db as default}