import {useState, useEffect} from 'react';
import {Linking} from 'react-native';

export const useLinkingURL = () => {
  const [linkingUrl, setLinkingUrl] = useState('');

  useEffect(() => {
    const onLinkingEvent = async event => {
      console.log({event});
      if (event.url) {
        console.log('setting');
        setLinkingUrl(event.url);
      }
    };

    Linking.addEventListener('url', onLinkingEvent);
    return () => Linking.removeEventListener('url', onLinkingEvent);
  }, []);

  return linkingUrl;
};
