import React from 'react';
import WorkoutIndex from '../workouts/WorkoutIndex';


const Splash = (props) => {
    return(
        <div>Welcome User
        <WorkoutIndex token={props.token} />
        </div>
    )
}

export default Splash;