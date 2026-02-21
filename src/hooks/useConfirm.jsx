import { useState, useCallback } from 'react';
import { router } from '@inertiajs/react';

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [processing, setProcessing] = useState(false);

  // ---------------------------------------------------------------------------------------
  // Open callback function
  // ---------------------------------------------------------------------------------------
  const open = useCallback((item = null) => {
    setData(item);
    setIsOpen(true);
  }, []);

  // ---------------------------------------------------------------------------------------
  // Close callback function
  // ---------------------------------------------------------------------------------------
  const close = useCallback(() => {
    if (processing) return; // Prevent closing while deleting
    setIsOpen(false);
    setData(null);
  }, [processing]);

  /**
   * @param {string} method - 'delete', 'post', 'patch'
   * @param {string} url - The Inertia route
   */
  const execute = (method, url, options = { preserveScroll: true }) => {
    setProcessing(true);

    router[method](url, {
      ...options,
      onSuccess: () => close(),
      onFinish: () => setProcessing(false),
      // preserveScroll: true, // Common for table deletions
    });
  };

  // ---------------------------------------------------------------------------------------
  // Return hook data
  // ---------------------------------------------------------------------------------------
  return {
    isOpen,
    data,
    processing,
    open,
    close,
    execute
  };
};