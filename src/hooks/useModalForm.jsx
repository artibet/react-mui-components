import { router } from '@inertiajs/react';
import { useState, useCallback } from 'react';

export const useModalForm = (initialData = null) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [processing, setProcessing] = useState(false);

  // ---------------------------------------------------------------------------------------
  // Create callback
  // ---------------------------------------------------------------------------------------
  const create = useCallback(() => {
    setData(null);
    setIsOpen(true);
  }, []);

  // ---------------------------------------------------------------------------------------
  // Edit callback
  // ---------------------------------------------------------------------------------------
  const edit = useCallback((item) => {
    setData(item);
    setIsOpen(true);
  }, []);

  // ---------------------------------------------------------------------------------------
  // Submit wrapper
  // ---------------------------------------------------------------------------------------
  const submit = (method, url, formData, options = { preserveScroll: true }) => {
    setProcessing(true);

    router[method](url, formData, {
      ...options,
      onFinish: () => setProcessing(false),
      onSuccess: () => close(),
    })
  }

  // ---------------------------------------------------------------------------------------
  // Close callback
  // ---------------------------------------------------------------------------------------
  const close = useCallback(() => {
    if (processing) return;   // Prevent closing while saving
    setIsOpen(false);
    setData(null);
  }, [processing]);

  // ---------------------------------------------------------------------------------------
  // hook data
  // ---------------------------------------------------------------------------------------
  return {
    isOpen,
    data,
    processing,
    create,
    edit,
    close,
    submit,
    // Helper to determine if we are editing
    isEdit: !!data,
  };
};