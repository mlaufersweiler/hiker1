import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Clothing from './resources/Clothing';
import Navigation from './resources/Navigation';
import ForDesignatedContacts from './resources/ForDesignatedContacts'
import {connect} from 'react-redux';
import {Menu, Button} from './StyledResources';


class HikerResources extends Component {

    render() {
       
        return (
            <div>
                <Menu>
                <Link to='/resources/fordesignatedcontacts'><Button>Designated <br/>Contacts</Button></Link>
                
                <Link to='/resources/navigation'><Button>Navigation</Button></Link>

                <Link to='/resources/clothing'><Button>Clothing</Button></Link>
               

               
                </Menu>
                
                <Switch>
                    <Route path='/resources/fordesignatedcontacts' component={ForDesignatedContacts} />
                    <Route path='/resources/navigation' component={Navigation} />
                    <Route path='/resources/clothing' component={Clothing} />                   
                </Switch>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const {user} = state
    return {
        user
    }
}

export default connect(mapStateToProps, {})(HikerResources);
