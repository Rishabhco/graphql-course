const Subscription={
    comment:{
        subscribe(parent,{postedOn},{db,pubsub},info){
            const post =db.posts.find((post) =>post.id===postedOn && post.published)
            if(!post){
                throw new Error("Post Not Found !!!")
            }

            return pubsub.asyncIterator(`comment ${postedOn}`)
        }
    },
    post:{
        subscribe(parent,args,{pubsub},info){
            return pubsub.asyncIterator('post')
        }
    }
}

export {Subscription as default}