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
  const close = useCallback((e) => {
    if (processing) return; // Prevent closing while deleting
    e.currentTarget?.blur()
    setIsOpen(false);
    setData(null);
  }, [processing]);

  /**
   * @param {string} method - 'delete', 'post', 'patch'
   * @param {string} url - The Inertia route
   */
  const execute = (method, url, options = {}) => {
    setProcessing(true);

    const {
      onFinish = () => { },
      onSuccess = () => { },
      preserveScroll = true,
      ...otherOptions
    } = options

    router[method](url, {
      ...otherOptions,
      preserveScroll,
      onSuccess: (page) => {
        close();
        onSuccess(page);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish();
      },
    });
  };

  // ---------------------------------------------------------------------------------------
  // Special execute method - put request
  // ---------------------------------------------------------------------------------------
  const putRequest = (url, data, options = {}) => {
    setProcessing(true)

    const {
      onFinish = () => { },
      onSuccess = () => { },
      preserveScroll = true,
      ...otherOptions
    } = options

    router.put(url, data, {
      ...otherOptions,
      preserveScroll,
      onSuccess: (page) => {
        close();
        onSuccess(page);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish();
      },
    })
  }

  // ---------------------------------------------------------------------------------------
  // Special execute method - post request
  // ---------------------------------------------------------------------------------------
  const postRequest = (url, data, options = {}) => {
    setProcessing(true)

    const {
      onFinish = () => { },
      onSuccess = () => { },
      preserveScroll = true,
      ...otherOptions
    } = options

    router.post(url, data, {
      ...otherOptions,
      preserveScroll,
      onSuccess: (page) => {
        close();
        onSuccess(page);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish();
      },
    })
  }

  // ---------------------------------------------------------------------------------------
  // Special execute method - delete request
  // ---------------------------------------------------------------------------------------
  const deleteRequest = (url, options = {}) => {
    setProcessing(true);

    const {
      onFinish = () => { },
      onSuccess = () => { },
      preserveScroll = true,
      ...otherOptions
    } = options

    router.delete(url, {
      ...otherOptions,
      preserveScroll,
      onSuccess: (page) => {
        close();
        onSuccess(page);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish();
      },
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