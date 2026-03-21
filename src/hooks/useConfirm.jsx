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
  // Special execute method - put request
  // ---------------------------------------------------------------------------------------
  const putRequest = (url, data, options = { preserveScroll: true }) => {
    setProcessing(true)

    router.put(url, data, {
      ...options,
      onSuccess: () => close(),
      onFinish: () => setProcessing(false)
    })
  }

  // ---------------------------------------------------------------------------------------
  // Special execute method - post request
  // ---------------------------------------------------------------------------------------
  const postRequest = (url, data, options = { preserveScroll: true }) => {
    setProcessing(true)

    router.post(url, data, {
      ...options,
      onSuccess: () => close(),
      onFinish: () => setProcessing(false)
    })
  }

  // ---------------------------------------------------------------------------------------
  // Special execute method - delete request
  // ---------------------------------------------------------------------------------------
  const deleteRequest = (method, url, options = { preserveScroll: true }) => {
    setProcessing(true);

    router.delete(url, {
      ...options,
      onSuccess: () => close(),
      onFinish: () => setProcessing(false)
    })
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
    execute,
    putRequest,
    postRequest,
    deleteRequest
  };
};