import "../styles/Home.css";
import { useSelector, userSelector, useStore } from "react-redux";
const Home = () => {
    const { user } = useSelector( (state = {name:"Akriti"}) => ({ ...state }));
    return (
        <>
        <div className=" background container-fluid h1 p-5 text-center">
        
        </div>
        
        </>
    );
};
export default Home;