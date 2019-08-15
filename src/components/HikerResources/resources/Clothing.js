import React from 'react';
import {ContentBox, Heading, P} from './../StyledResources';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';


export default function Clothing () {
    return (
        <ContentBox>
            <Typography variant="overline" style={{textDecoration: 'underline'}}>Clothing</Typography>
            <Heading>What should I wear on my backpacking trip?</Heading>
            <P>Whether you're going on a one-nighter, a weekend trip, or for two months on the PCT, you'll use the same fundamental pieces of clothing. Layers are key, which can be tweaked based on specific weather conditions that you're likely to run into on your trip.</P>
            <P>With layers, you can remove one when you get too hot, and add one when you start to feel chilled. And remember: it's easier to stay warm than to get warm.</P>

            <P>For more information, watch this great video from REI:</P>
            <ReactPlayer url="https://www.youtube.com/watch?time_continue=6&v=D6zEhwhIGik" width={'60%'} height={'90%'} style={{margin: 'auto'}}/>

        </ContentBox>
    )
}