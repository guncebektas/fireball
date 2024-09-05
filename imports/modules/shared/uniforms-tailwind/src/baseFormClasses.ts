export const baseFormClasses: string[] = [
  'flex',
  'max-w-md',
  'flex-col',
  'gap-4'
];

export const baseTextClasses: string[] = [
  'text-gray-900',
  'dark:text-white',
]

export const baseFieldClasses: string[] = [
  'border-gray-300',
  'bg-gray-50',
  'focus:border-cyan-500',
  'focus:ring-cyan-500',
  'dark:border-gray-600',
  'dark:bg-gray-700',
  'dark:focus:border-cyan-500',
  'dark:focus:ring-cyan-500',
  'rounded-md'
];

export const baseInputClasses: string[] = [
  ...baseTextClasses,
  ...baseFieldClasses,
  'block',
  'w-full',
  'dark:placeholder-gray-400',
]

export const baseButtonClasses: string[] = [
  'relative',
  'text-center',
  'focus:z-10',
  'enabled:hover:bg-cyan-800',
  'dark:bg-cyan-600',
  'dark:enabled:hover:bg-cyan-700',
  'dark:focus:ring-cyan-800',
  'w-full',
  'flex',
  'justify-center',
  'border',
  'border-transparent',
  'rounded-md',
  'shadow-sm',
  'text-sm',
  'font-medium',
  'text-white',
  'bg-blue-600',
  'hover:bg-blue-700',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'focus:ring-indigo-500',
  'py-3',
  'px-6'
]
