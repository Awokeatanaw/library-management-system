function Buttn(props) {
    return ( 
        <button className="bg-tealTransparent py-2 px-4 rounded text-white md:ml-8 duration-500 hover:bg-cyan-500 hover:text-white">
{props.children}
        </button>
     );
}

export default Buttn;