import React from 'react';
import { ContentBox , Heading, Card} from '../StyledResources';
import Typography from '@material-ui/core/Typography'


export default function BrowseTrails ()  {
    return(
        <ContentBox>
            <Typography variant="overline" style={{textDecoration: 'underline'}}>Browse Trails</Typography>
            <Heading>Find your next adventure</Heading>
            <Card>
               
            </Card>
        </ContentBox>
    )
}