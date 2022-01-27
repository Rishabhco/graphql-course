const Query={
    users(parent,args,{db},info){
        if(!args.query){
            return db.users
        }
        return db.users.filter((user)=>{
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    comments(parent,args,{db},info){
        return comment
    },
    posts(parent,args,{db},info){
        if(!args.query){
            return db.posts
        }
        return db.posts.filter((post)=>{
            const isTitleMatch=post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch=post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    },
    me(){
        return{
            "id":"1234",
            "name":"Rishabh Agrawal",
            "email":"rishabh@gmail.com",
            "age":20
        }
    },
    post(){
        return{
            "id":"1",
            "title":"Book",
            "body":"Hello everyone!!! My fav author is william shakespeare",
            "published":false
        }
    },
    
    greeting(parent,args,{db},info){
        if(args.name &&args.position){
            return `Hello ${args.name}!!! I like your ${args.position} position !!!!!`
        }else{
            return "Hello!!"
        }
    },
    add(parent,args,{db},info){
        return args.number1+ args.number2
    },
    addArrays(parent,args,{db},info){
        if(args.numbers.length==0){
            return 0
        }else{
            return args.numbers.reduce((accumulator,currentValue)=>{
                return accumulator+currentValue
            })
        }
    }
}

export {Query as default}