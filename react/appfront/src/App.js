import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

    constructor(props){
        super(props)
        this.state = {users:[],loading:true,error:{err:false,msg:''}}
    }

    componentWillMount(){
        this.getUsers()
    }

    getUsers(){

      axios('https://api.randomuser.me/?nat=BR&results=5').then((res)=>{
          this.setState({loading:false})
          this.setState({users:res.data.results})
      }).catch(err=>{
          this.setState({error:{err:true,msg:err}})
      })

    }

    render(){

          return (
            
            <div className="App">
                
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
                        :  'Loading...'
                        )

                    :`error:${this.state.error.msg}`

                    )

                    }  
                    
            </div>

          )

    };

}

export default App;
