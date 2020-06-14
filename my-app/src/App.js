
import React from 'react';
import { FetchApi } from './classes/FetchApi'
import { Post } from './components/Post/Post';
import { Form } from "./components/Form"
import { Filter } from "./components/Filter"


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      isSingle: false,
      currentPage: 'home.html',
      index: null,
      showForm: false,
      currentFilter: ''
    }
    this.fetchApi = new FetchApi('http://localhost:3000');
  }

  componentDidMount() {

    this.fetchApi.getPosts()
      .then((posts) => {
        this.setState(
          {
            posts: posts
          })
        console.log(posts);
      })


  }

  handleDeleteButton = (id) => {


    this.deletePost(this.state.selectedPost.id)

    this.setState({
      currentPage: 'home.html'

    })

  }

  deletePost = (id) => {
    this.fetchApi.deletePostById(id)
      .then((result) => {
        this.setState((prevState) => {
          const posts = prevState.posts
          var index = posts.findIndex((post) => post.id === id);
          if (index >= 0) {
            posts.splice(index, 1);
          }
          return {
            ...prevState,
            posts: [...posts]
          }
        })
      })
  }


  handleViewButton = (post) => {
    console.log('view post', post);
    this.setState({
      selectedPost: post,
      currentPage: 'view-post.html'
    })
  }
  handleEditButton = (postToUpdate) => {
    this.setState({
      currentPage: 'edit-post.html',
      selectedPost: postToUpdate
    });
  }
  handleAddButton = (title, text) => {
    this.fetchApi.createNewPost(title, text).then((response) => {
      this.setState((prevState) => {
        const newPostList = [...(prevState.posts)]
        newPostList.push(response)
        return {
        ...prevState,
        posts: newPostList
      }})
    })
  }
  saveChanges = () => {
    const { id, title, text } = this.state.selectedPost;
    this.fetchApi.editPost(id, title, text).then((response) => {
      this.setState(prevState => {
        const postList = [...(prevState.posts)]
        console.log(postList)    //lista de posturi ramasa   
        const postIndex = postList.findIndex((post) => post.id === id);
        if (postIndex >= 0) {
          const post = postList[postIndex];
          postList.splice(postIndex, 1, {
            ...post,
            id,
            title,
            text

          });
        }
        return {
          currentPage: 'home.html',
          posts: postList
        }

      })
    })
  }

  updateTitleValue = (newValue) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedPost: {
          ...(prevState.selectedPost),
          title: newValue
        }
      }
    });
  }

  updateTextValue = (newValue) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedPost: {
          ...(prevState.selectedPost),
          text: newValue
        }
      }
    });
  }
  submitNewPost = () => {
    const { newPostTitle, newPostText } = this.state;
    this.fetchApi.createNewPost(newPostTitle, newPostText)
      .then((response) => {
        this.setState((prevState) => {
          const postList = [...(prevState.posts)];
          postList.push(response);
          return {
            postList,
            newPostTitle: '',
            newPostText: ''
          }
        })
      });
  }
  filterTitle = (event) => {
    console.log('hey', event.target.value)
    this.setState({
      currentFilter: event.target.value
    })
  }

  renderView() {
    switch (this.state.currentPage) {
      default:
      case 'home.html': {
        const posts = this.state.posts
        const postCmps = posts.filter((post) => {
          const {currentFilter} = this.state;
          return currentFilter === '' || post.title.toLowerCase().includes(currentFilter.toLowerCase())
        }).map(post => {
          return (


            <Post
              key={post.id}
              post={post}
              onViewButtonClick={this.handleViewButton}
            ></Post>


          )
        })
        return postCmps;
      }
      case 'view-post.html': {
        return (

          <Post
            style={{ backgroundColor: 'red' }}
            post={this.state.selectedPost}
            onDeleteButtonClick={this.handleDeleteButton}
            onEditButtonClick={this.handleEditButton}
            isSingle={true}
          ></Post>

        )
      }
      case 'edit-post.html': {
        return (
          <div>
            <label>Edit Title</label>
            <input
              type="text"
              name="title"
              value={this.state.selectedPost.title}
              onChange={(data => { this.updateTitleValue(data.target.value) })} />
            <label>Edit text</label>
            <input
              type="text"
              name="text"
              value={this.state.selectedPost.text}
              onChange={(data => { this.updateTextValue(data.target.value) })} />
            <button onClick={this.saveChanges}>Save Changes</button>
          </div>

        )
      }
    }
  }



  render() {
    return (

      <div>
        <Form
          onAddButtonClick={this.handleAddButton}
        >
        </Form>
        <div>
          <Filter filterTitle={this.filterTitle}></Filter>
        </div>
        <div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

export default App;
