import React, { Component } from 'react'

class SinglePost extends Component {
  render() {
    return (
      <div className="container col-12" >
          <h2 className="mt-5 mb-5 ml-5" >Single Post</h2>
          {this.props.match.params.postId}
      </div>
    )
  }
}

export default SinglePost
