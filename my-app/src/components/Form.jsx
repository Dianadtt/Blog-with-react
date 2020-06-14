import React from "react"

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            postText: ''
        }
    }

    render() {
        return (

            <div>
                <label>New Post Title</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.postTitle}
                    placeholder="Enter title"
                    onChange={(data) => { this.setState({ postTitle: data.target.value }) }}
                />
                <label>New Post Text</label>
                <input
                    type="text"
                    name="text"
                    value={this.state.postText}
                    placeholder="Enter text"
                    onChange={(data) => { this.setState({ postText: data.target.value }) }}
                />
                <button
                    onClick={() => this.props.onAddButtonClick(this.state.postTitle, this.state.postText)}
                >Add New Post
            </button>
            </div>
        )
    }
}