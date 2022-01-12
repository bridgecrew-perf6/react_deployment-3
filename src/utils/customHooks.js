// Core Imports
import  { useEffect } from 'react';

// TODO: Explanation
const useScript = url => {

  useEffect(() => {

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    
    return () => {
        document.body.removeChild(script);
    }

  }, [url]);
};

export default useScript;
