const Posts={
    author(parent,args,{db},info){
        return db.users.find((user)=>{
            return user.id===parent.author
        })
    },
    comments(parent,args,{db},info){
        return db.comment.filter((comment)=>{
            return comment.postedOn===parent.id
        })
    }
 }

export {Posts as default}