import React,{Component} from 'react'

class FollowProfileButton extends Component {

    render(){
        return(
            <div className='d-inline-flex mb-5 col-12 col-md-6 col-lg-5'>
            {
                !this.props.following?(
                    <button className='btn btn-raised btn-success btn-block offset-lg-2 offset-md-2'>
                        Follow
                    </button>
                ):(
                    <button className='btn btn-raised btn-warning btn-block offset-lg-2 offset-md-2'>
                        Unfollow
                    </button>
                )
            }
            </div>  

        )
    }

}


export default FollowProfileButton