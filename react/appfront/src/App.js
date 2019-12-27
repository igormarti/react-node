import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {

    constructor(props){
        super(props)
        this.state = {users:[],loading:true,error:{err:false,msg:''}}
        //bind
        this.loadingUsers = this.loadingUsers.bind(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers(){
      
      axios('https://api.randomuser.me/?nat=BR&results=5').then((res)=>{
          this.setState({loading:false})
          this.setState({users:[...res.data.results,...this.state.users]})
      },err=> this.setState({error:{err:true,msg:err}}))

    }

    loadingUsers(){
      this.getUsers()
    }

    render(){
       
        const eleUser = 
                  ( <div className="App">
                        <div>
                          <input type="button" onClick={this.loadingUsers} value="Load users" ></input>
                        </div>
                        {
                          this.state.users.map((user,index)=>
                            <div key={index} >
                                <h3>{user.name.first}</h3>
                                <p>
                                  {user.email}<br/>
                                  {user.cell}
                                </p>
                                <hr/>
                            </div>
                          )
                        }  
           
                    </div> )

        const eleLoading = <Loading message="Wait a moment..." />
      
        return (
            this.state.loading?eleLoading:eleUser
        )

    };

}

export default App;
