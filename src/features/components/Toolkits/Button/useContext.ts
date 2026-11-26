import { useEffect, useRef, useState } from 'react';

const useButton = () => {
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLoadingClick = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    timerRef.current = setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    loading,
    handleLoadingClick
  };
};

export default useButton;
