import { Link } from "react-router-dom";

export default function Navigation (){
    return(
        <nav>
            <ul style={{display: "flex", listStyle:"none", gap: '20px'}}>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}