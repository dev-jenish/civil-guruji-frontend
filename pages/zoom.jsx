import axios from 'axios';
import React, { useEffect } from 'react';
import { api } from 'utils/urls';
import router from 'next/router';

function ZoomComponent() {
  useEffect(() => {
    const loadZoomSDK = async () => {
      const ZoomMtg  = await (await import('@zoomus/websdk/embedded')).default;


      // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
      // ZoomMtg.preLoadWasm();
      // ZoomMtg.prepareJssdk();

      try{

        
        let client = await ZoomMtg.createClient()
        
        let meetingSdkElement = document.getElementById('zoomEmbededApp');
        
        // Initialize Zoom SDK with your app credentials
        client.init({
        zoomAppRoot: meetingSdkElement,
        language: 'en-US',
        customize: {
          meeting: {
            popper: {
              disableDraggable: true
            }
          },
          
          video: {
            popper: {
              disableDraggable: true
            },
            isResizable: false,
            viewSizes: {
              default: {
                height: "100%",
                width: "100%"
              },
              ribbon: {
                height: "100%",
                width: "100%"
              }
            }
          }
        }
      });
      
      
      const payload = router.query
      let response = await api('/zoom', 'post', payload)
      response = response.data
      
      client.join({
        meetingNumber: payload.meetingNumber,
        signature: response.signature,
        sdkKey: response.sdkKey,
        userName: payload.userName,
        password: payload.password,
        tk: ''
      })
      
    }catch(error){
      console.log(error)
    }
      
    };
    
    if (typeof window !== 'undefined') {
      loadZoomSDK();
    }
  }, []);

  return <div>
    <h2>Zoom Integration in Next.js (Embedded)</h2>
    <div id="zoomEmbededApp" draggable={false} style={{ height: "100%", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ></div>
  </div>;
}

export default ZoomComponent;
