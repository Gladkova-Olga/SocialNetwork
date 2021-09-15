import profileReducer, {addPostActionCreator, deletePost, InitialStateType} from "./profileReducer";

let state: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi! How are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 15},
    ],
    newPostText: '',
    profile: null,
    status: ""
}

it("length of post should be incremented", () => {
    //test data
    let action = addPostActionCreator("New post");
    //action
    let newState = profileReducer(state, action);
    //expectation
  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].message).toBe("New post");

})

it("message of new post should be correct", () => {
    //test data
    let action = addPostActionCreator("New post");
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.posts[2].message).toBe("New post");

})

it("after deleting length of post should be decrement", () => {
    //test data
    let action = deletePost(1)
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.posts.length).toBe(1);
})

it("after deleting length of post shouldn't be decrement if id incorrect", () => {
    //test data
    let action = deletePost(555)
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.posts.length).toBe(2);
})