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

    componentWillMount(){
        this.getUsers()
    }

    getUsers(){

      axios('https://api.randomuser.me/?nat=BR&results=5').then((res)=>{
          this.setState({loading:false})
          this.setState({users:[...res.data.results,...this.state.users]})
      }).catch(err=>{
          this.setState({error:{err:true,msg:err}})
      })

    }

    loadingUsers(){
      this.getUsers()
    }

    render(){

          return (
            
            <div className="App">
                 <div>
                    <form onSubmit={this.loadingUsers} >
                        <input type="submit" value="Load users" ></input>
                    </form>   
                  </div>
                  {

                    (!this.state.error.err?
                        (!this.state.loading? 
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
                        :  <Loading message="Wait a moment..." />
                        )

                    :`error:${this.state.error.msg}`

                    )

                    }  
                    
            </div>

          )

    };

}

export default App;
