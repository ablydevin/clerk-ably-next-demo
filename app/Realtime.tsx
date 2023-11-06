'use client'

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import Status from './Status';

export default function Realtime() {

  const client = new Ably.Realtime.Promise({ authUrl: '/api' })

  return (
    <AblyProvider client={ client }>
      
      <Status /> 
     
    </AblyProvider>
  )
}