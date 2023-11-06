import React, { useEffect, useState } from 'react';
import * as Ably from 'ably'
import { useAbly, useConnectionStateListener } from "ably/react";

export default function Status() {

    const [state, setState] = useState<string>('')
    const client = useAbly();
    useConnectionStateListener((stateChange) => {
      setState(stateChange.current)
    });
    
    return (
      <>
        <div>Connection Status: {state}</div>
        <div>ClientId: {client.auth.clientId}</div>
      </>
    )
  }