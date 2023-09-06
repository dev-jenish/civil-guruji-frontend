import axios from 'axios';
import React, { useEffect } from 'react';
import { api } from 'utils/urls';
import router from 'next/router';

function ZoomComponent({ meetingNumber, username, password, selectedTopic }) {

  let client = null

  useEffect(() => {
    const loadZoomSDK = async () => {
      const ZoomMtg = await (await import('@zoomus/websdk/embedded')).default;


      // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
      // ZoomMtg.preLoadWasm();
      // ZoomMtg.prepareJssdk();

      try {


        client = await ZoomMtg.createClient()

        let meetingSdkElement = document.getElementById('meetingSDKElement');
        let meetingSDKChatElement = document.getElementById('meetingSDKChatElement')

        // Initialize Zoom SDK with your app credentials
        client.init({
          zoomAppRoot: meetingSdkElement,
          language: 'en-US',
          customize: {
            video: {
              isResizable: true,
              viewSizes: {
                default: {
                  width: 600,
                  height: 500
                },
                // ribbon: {
                //   width: 300,
                //   height: 700
                // },
              },
              popper: {
                disableDraggable: true
              }
            },
            chat: {
              popper: {
                disableDraggable: false,
                anchorElement: meetingSDKChatElement,
                placement: 'top-start',
                anchorReference: meetingSDKChatElement,
                anchorPosition: meetingSDKChatElement
             }
            }
          }
        });


        const payload = {
          meetingNumber,
          username,
          password,
          role: 0
        }

        console.log(username)

        let response = await api('/zoom', 'post', payload)
        response = response.data

        client.join({
          meetingNumber: payload.meetingNumber,
          signature: response.signature,
          sdkKey: response.sdkKey,
          userName: payload.username,
          password: payload.password,
          tk: ''
        })

      } catch (error) {
        console.log(error)
      }

    };

    if (typeof window !== 'undefined') {
      loadZoomSDK();
    }
  }, []);

  useEffect(() => {

    console.log(selectedTopic)

    if(selectedTopic){
      console.log('Selected topic')
    }

    if(client){
      console.log('selected client')
    }

    if(selectedTopic && client){
      console.log("this ran")
      client.endMeeting()
    }
  }, [selectedTopic])

  return <div class="row">
    <div class="column">
      <h3>Videos Here</h3>
      <div id="meetingSDKElement"></div>
    </div>
    {/* <div class="column">
      <h3>My Content Here</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div> */}
    <div class="column">
      <div id="meetingSDKChatElement"  ></div>
    </div>
  </div>

  return <div id='zoomEmbededApp' >
    {/* <h2>Zoom Integration in Next.js (Embedded)</h2>
    <div id="zoomEmbededApp" draggable={false} style={{ height: "100%", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ></div> */}
  </div>;
}

export default ZoomComponent;
