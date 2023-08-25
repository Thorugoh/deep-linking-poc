import {useState, useEffect} from 'react';
import {Linking} from 'react-native';

export const useInitialURL = () => {
  const [initialURL, setInitialURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const fetchInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          setInitialURL(url);
        }
      } catch (error) {
        console.error('Error fetching initial URL:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    fetchInitialURL();
  }, []);

  return [initialURL, isProcessing, setInitialURL];
};
