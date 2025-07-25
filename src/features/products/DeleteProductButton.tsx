"use client";

import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/navigation';
import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiTrash2 } from 'react-icons/fi';

export const DeleteProductButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastClickTime = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setOpen(false);
      router.push('/');
    } catch {
      setError('Erro ao excluir produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    
    // Prevenir cliques muito rápidos ou duplos
    if (now - lastClickTime.current < 300) {
      return;
    }
    
    lastClickTime.current = now;
    e.preventDefault();
    e.stopPropagation();
    
    // Verificar se é um clique válido
    if (
      e.currentTarget === buttonRef.current && 
      !open && 
      !loading &&
      e.button === 0 // Clique esquerdo apenas
    ) {
      setOpen(true);
    }
  }, [open, loading]);

  const handleClose = useCallback(() => {
    if (!loading) {
      setOpen(false);
      setError(null);
    }
  }, [loading]);

  // Prevenir eventos de mouse não intencionais
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const renderModal = () => {
    if (!open) return null;

    const modalContent = (
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
              <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
              Confirmar Exclusão
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
              type="button"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              type="button"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    );

    // Durante testes, renderizar diretamente; em produção, usar portal
    if (process.env.NODE_ENV === 'test') {
      return modalContent;
    }

    if (!mounted) return null;
    return createPortal(modalContent, document.body);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="flex items-center justify-center p-2 rounded text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800"
        onClick={handleOpenModal}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        aria-label="Excluir produto"
        title="Excluir produto"
        type="button"
      >
        <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px] pointer-events-none" />
      </button>
      {renderModal()}
    </>
  );
};
