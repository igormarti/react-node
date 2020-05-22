import React, { Component } from 'react'

class Comment extends Component {

    render() {
        return (
            <div className="mt-3 mb-5">
               
                <form>
                    <div className="row">
                        <div className="col-md-8 col-lg-8 col-12 offset-md-2 offset-lg-2">
                          <input type="text" className="form-control" placeholder="Leave a comment"  />  
                        </div>  
                    </div>    
                </form>
              
            </div>
        )
    }

}

export default Comment