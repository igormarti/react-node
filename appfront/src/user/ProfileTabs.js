import React, { Component } from 'react'

class ProfileTabs extends Component {

  render() {

    const {followers,following} = this.props

    return (
      <div>
          <div>
            Followers  
            {JSON.stringify(followers)}
          </div>
          <div>
            Following  
            {JSON.stringify(following)}
          </div>
      </div>
    )
  }

}

export default ProfileTabs
