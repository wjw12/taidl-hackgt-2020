import React, { useState, useEffect } from 'react'
import Blockies from 'react-blockies';
import { Typography, Skeleton, Tooltip, Spin, Modal, Button } from 'antd';


const { Text } = Typography;

export default function Address(props) {

  if(!props.value){
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    )
  }

  let displayAddress = props.value.substr(0,6)

  if(props.size === "short"){
    displayAddress += "..."+props.value.substr(-4)
  }else if(props.size === "long"){
    displayAddress = props.value
  }

  let text
  if(props.onChange){
    text = (
      <Text editable={{onChange:props.onChange}} copyable={{text:props.value}}>
        <a style={{color:"#222222"}}>{displayAddress}</a>
      </Text>
    )
  }else{
    text = (
      <Text copyable={{text:props.value}}>
        <a style={{color:"#222222"}}>{displayAddress}</a>
      </Text>
    )
  }

  return (
    <span>
      <span style={{verticalAlign:"middle"}}>
        <Blockies seed={props.value.toLowerCase()} size={8} scale={4}/>
      </span>
      <span style={{verticalAlign:"middle",paddingLeft:5,fontSize:28}}>
        {text}
      </span>
    </span>
  );
}
