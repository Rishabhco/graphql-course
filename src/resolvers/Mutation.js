import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if (emailTaken) {
      throw new Error("Email Taken !!!");
    }
    const user = {
      id: uuidv4(),
      ...args.data,
    };
    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("User not found!!!");
    }
    const deletedUser = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comment = db.comment.filter((commt) => commt.postedOn !== post.id);
      }

      return !match;
    });

    db.comment = db.comment.filter((commt) => commt.postedOn !== args.id);

    return deletedUser[0];
  },

  updateUser(parent, args, { db }, info) {
    const user = db.users.find((user) => user.id === args.id);
    if (!user) {
      throw new Error("User not found!!!");
    }

    if (typeof args.data.email === "string") {
      const emailTaken = db.users.some(
        (user) => user.email === args.data.email
      );
      if (emailTaken) {
        throw new Error("Email already Taken !!!");
      }
      user.email = args.data.email;
    }

    if (typeof args.data.name === "string") {
      user.name = args.data.name;
    }

    if (typeof age !== "undefined") {
      user.age = args.data.age;
    }

    return user;
  },

  createPost(parent, args, { db, pubsub }, info) {
    const usersExist = db.users.some((user) => user.id === args.data.author);

    if (!usersExist) {
      throw new Error("User Does Not Exists !!!");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    if (args.data.published === true) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post;
  },

  updatePost(parent, args, { db, pubsub }, info) {
    const post = db.post.find((post) => post.id === args.id);
    const originalPost = { ...post }

    if (!post) {
      throw new Error("Post does not exist !!!");
    }

    if (typeof args.data.title === 'string') {
      post.title = args.data.title;
    }

    if (typeof args.data.body === 'string') {
      post.body = args.data.body;

    }
    if (typeof args.data.published === 'boolean') {
      post.body = args.data.published;

      if (originalPost.published && !args.data.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: post
          }
        })
      } else if (!originalPost.published && args.data.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
    } else if (originalPost.published && args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    return post
  },

  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error("Post not found!!!");
    }
    const [deletedPost] = db.posts.splice(postIndex, 1);

    db.comment = db.comment.filter((commt) => {
      const match = commt.postedOn === args.id;

      return !match;
    });

    if (deletedPost.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPost
        }
      })
    }

    return deletedPost;
  },

  createComment(parent, args, { db, pubsub }, info) {
    const usersExist = db.users.some((user) => user.id === args.data.author);
    if (!usersExist) {
      throw new Error("User Does Not Exists !!!");
    }
    const postsExist = db.posts.some((post) => post.id === args.data.postedOn && post.published);
    if (!postsExist) {
      throw new Error("Posts Does Not Exists Or it is not published !!!");
    }
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comment.push(comment);

    pubsub.publish(`comment ${args.data.postedOn}`, { 
      comment:{
        mutation:'CREATED',
        data:comment
      } 
    })

    return comment;
  },

  updateComment(parent, args, { db,pubsub }, info) {
    const comment = db.post.find((commt) => commt.id === args.id);
    if (!comment) {
      throw new Error("Comment does not exist !!!");
    }
    if (typeof args.data.text === 'string') {
      post.text = args.data.text;
    }

    pubsub.publish(`comment ${comment.postedOn}`, { 
      comment:{
        mutation:'UPDATED',
        data:comment
      } 
    })

    return comment
  },

  deleteComment(parent, args, { db,pubsub}, info) {
    const commentIndex = db.comment.findIndex((commt) => commt.id === args.id);

    if (commentIndex === -1) {
      throw new Error("Comment not found!!!");
    }
    const [deletedComment] = db.comment.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment.postedOn}`, { 
      comment:{
        mutation:'DELETED',
        data:deletedComment
      } 
    })

    return deletedComment;
  },
};

export { Mutation as default };
