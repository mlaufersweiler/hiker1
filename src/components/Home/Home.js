import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { ContentBox, MainHeading, Details, LinkButtons} from './StyledHome';
import {Link} from 'react-router-dom'
class Home extends Component {
 
    render () {
       

        return (
            
            <div>
            <LinkButtons>
              <Link to='/setalert'>Set an Alert</Link>
              <Link to='/checklist'>Trip Checklist</Link>
              <Link to='/resources'>Resources</Link>
          </LinkButtons>
                <ContentBox>
                    <MainHeading>On your next backpacking trip, give yourself some peace of mind.</MainHeading>
                    <Details><b>Hiker</b> is a trip-planning tool to help you stay safe in the backcountry. Run through a trip checklist, browse hiker resources, and set up an alert notification system.</Details>
                </ContentBox>
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

export default connect(mapStateToProps, {})(Home);