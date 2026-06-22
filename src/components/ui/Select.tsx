"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from '@/lib/icons';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  buttonClassName?: string;
}

export default function Select({ value, onChange, options, className = '', buttonClassName }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 200);
          }
          setOpen((v) => !v);
        }}
        className={buttonClassName ?? "flex items-center gap-2 pl-3 pr-2.5 py-1.5 bg-white border border-border rounded-lg text-sm text-gray hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors cursor-pointer select-none whitespace-nowrap"}
      >
        <span>{selected.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-3.5 h-3.5 text-muted" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute right-0 z-30 min-w-[10rem] bg-white border border-border rounded-lg shadow-lg shadow-black/8 overflow-hidden py-1 ${
              dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            }`}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-3 mx-1 px-3 py-2 text-sm text-left rounded-md transition-colors duration-100 ${
                  opt.value === value
                    ? 'bg-primary/8 text-primary font-medium'
                    : 'text-gray hover:bg-gray-100 hover:text-secondary'
                }`}
                style={{ width: 'calc(100% - 0.5rem)' }}
              >
                {opt.label}
                {opt.value === value && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
