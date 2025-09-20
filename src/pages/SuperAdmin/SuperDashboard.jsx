import { Link } from "react-router-dom";

function SuperDashboard() {
    return ( 
        <>
        <h1>SuperAdmin</h1>
        
        <Link to="/evolve">evolve</Link>
        <br />
        <Link to="/anais">anais</Link>
        <br />

        <Link to="/populo">populo</Link>

        </>
     );
}

export default SuperDashboard;