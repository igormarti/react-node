import React from 'react';
import ReactLoading from "react-loading";

const Loading = ({type="spokes",color="#000",height=64,width=64}) => (
    <ReactLoading type={type} color={color} height={height} width={width} />
)

export default Loading;