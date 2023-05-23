import React, { useEffect, useRef } from 'react';

const ReviewsModal = ({visible, children}) => {
  const ref = useRef();

  useEffect(() => {
    if (!visible) return;
    const modal = ref.current;
    modal.showModal();
    return () => {
      modal.close();
    };
  }, [visible]);
  return (
    <dialog ref={ref}>{ children }</dialog>
  );
};

export default ReviewsModal;